"use client";

import { clientFormSchema, ClientFormValues } from "@/features/clients/schema";
import { useForm } from "react-hook-form";
import { Client } from "@/lib/definitions";
import { patchClient } from "@/features/clients/services";
import { zodResolver } from "@hookform/resolvers/zod";

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

   const baseClass = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const {first_name, last_name, email, cell_phone, integration_id, birth_date} = form.formState.errors;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
    >
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            First Name<span> *</span>
          </label>
          <input {...form.register("first_name")} className={baseClass} />
          {first_name && <p className="text-red-500 text-sm">{first_name.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Last Name<span> *</span>
          </label>
          <input {...form.register("last_name")} className={baseClass} />
          {last_name && <p className="text-red-500 text-sm">{last_name.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Email<span> *</span>
          </label>
          <input {...form.register("email")} className={baseClass} type="email" placeholder="eg. joe@domain.com" />;
          {email && <p className="text-red-500 text-sm">{email.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Cell Phone<span> *</span>
          </label>
          <input {...form.register("cell_phone")} className={baseClass} />
          {cell_phone && <p className="text-red-500 text-sm">{cell_phone.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Integration ID<span> *</span>
          </label>
          <input {...form.register("integration_id")} className={baseClass} />
          {integration_id && <p className="text-red-500 text-sm">{integration_id.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Birth Date
          </label>
          <input {...form.register("birth_date")} className={baseClass} type="date" />
          {birth_date && <p className="text-red-500 text-sm">{birth_date.message}</p>}
        </div>



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