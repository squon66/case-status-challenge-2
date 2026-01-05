"use client";

import { clientFormSchema, ClientFormValues } from "@/features/clients/schema";
import { useForm } from "react-hook-form";
import { Client } from "@/lib/definitions";
import { patchClient } from "@/features/clients/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/forms/TextField";
import DateField from "@/components/forms/DateField";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type ClientsResponse = {
  clients: Client[];
};

export default function ClientForm() {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: patchClient,
    onMutate: async (newClient: ClientFormValues) => {
      await queryClient.cancelQueries({ queryKey: ["clients"] });

      const previousClients = queryClient.getQueryData<ClientsResponse>(["clients"]);
      const tempClient: Client = {
        id: Date.now(), // Temporary ID
        firm_id: 1,
        first_name: newClient.first_name,
        last_name: newClient.last_name,
        email: newClient.email,
        cell_phone: newClient.cell_phone,
        integration_id: newClient.integration_id,
        birth_date: newClient.birth_date ?? "",
        ssn: "",
      };

      // Optimistically update the clients list
      queryClient.setQueryData<ClientsResponse>(["clients"], (old = { clients: [] }) => ({
        clients: [...old.clients, tempClient],
      }));

      return { previousClients };
    },
    onError: (_err, _newClient, context) => {
      if (context?.previousClients) {
        queryClient.setQueryData(["clients"], context.previousClients);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const onSubmit = (data: ClientFormValues) => {
    mutation.mutate(data);
    form.reset();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
    >
        <TextField
            label="First Name"
            registration={form.register("first_name")}
            error={form.formState.errors.first_name}
            required
        />
        <TextField
            label="Last Name"
            registration={form.register("last_name")}
            error={form.formState.errors.last_name}
            required
        />
        <TextField
            label="Email"
            type="email"
            registration={form.register("email")} 
            error={form.formState.errors.email}
            placeholder="eg. joe@domain.com"
            required
        />
        <TextField
            label="Cell Phone"
            registration={form.register("cell_phone")}
            error={form.formState.errors.cell_phone}
            required
        />
        <TextField
            label="Integration ID"
            registration={form.register("integration_id")}
            error={form.formState.errors.integration_id}
            required
        />
        <DateField
            label="Birth Date"
            registration={form.register("birth_date")}
            error={form.formState.errors.birth_date}
        />
        {mutation.isError && (
          <p className="text-red-600 text-sm">
            {(mutation.error as Error).message}
          </p>
        )}

        {mutation.isSuccess && (
        <p className="text-green-600 text-sm">
          Client created successfully!
        </p>
      )}

      <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2
                     text-white font-medium hover:bg-blue-700 transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}