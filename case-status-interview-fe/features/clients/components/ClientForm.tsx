"use client";

import { clientFormSchema, ClientFormValues } from "@/features/clients/schema";
import { useForm } from "react-hook-form";
import { Client } from "@/lib/definitions";
import { patchClient } from "@/features/clients/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/forms/TextField";
import DateField from "@/components/forms/DateField";

export type ClientsResponse = {
  clients: Client[];
};

export default function ClientForm() {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
  });


  const onSubmit = (data: ClientFormValues) => {
    patchClient(data)
      .then((updatedClient) => {
        console.log("Client updated successfully:", updatedClient);
      })
      .catch((error) => {
        console.error("Error updating client:", error);
      });
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
      <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2
                     text-white font-medium hover:bg-blue-700 transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create
      </button>
    </form>
  );
}