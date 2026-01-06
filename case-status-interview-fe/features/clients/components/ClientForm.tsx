"use client";

import { clientFormSchema, ClientFormValues } from "@/features/clients/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/forms/TextField";
import DateField from "@/components/forms/DateField";
import { ClientListError } from "@/features/clients/components/ClientListLoading";
import { useCreateClient } from "@/features/clients/hooks/useCreateClient";

export default function ClientForm() {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
  });

  const mutation = useCreateClient();

  const onSubmit = (data: ClientFormValues) => {
    mutation.mutate(data);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
        {mutation.isError && (<ClientListError error={mutation.error as Error} />)}
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
            placeholder="5555555555"
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