"use client";

import { useForm } from "react-hook-form";
import { Client, ClientFormValues } from "@/lib/definitions";
import { patchClient } from "@/features/clients/services";

export type ClientsResponse = {
  clients: Client[];
};

export default function ClientForm() {

  const form = useForm<ClientFormValues>();

  const onSubmit = (data: ClientFormValues) => {
    patchClient(data)
      .then((updatedClient) => {
        console.log("Client updated successfully:", updatedClient);
      })
      .catch((error) => {
        debugger;
        console.error("Error updating client:", error);
      });
  };

   const baseClass = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
    >
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            First Name<span> *</span>
          </label>
          <input {...form.register("first_name")} className={baseClass} />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Last Name<span> *</span>
          </label>
          <input {...form.register("last_name")} className={baseClass} />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Email<span> *</span>
          </label>
          <input {...form.register("email")} className={baseClass} type="email" placeholder="eg. joe@domain.com" />;
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Cell Phone<span> *</span>
          </label>
          <input {...form.register("cell_phone")} className={baseClass} />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Integration ID<span> *</span>
          </label>
          <input {...form.register("integration_id")} className={baseClass} />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Birth Date
          </label>
          <input {...form.register("birth_date")} className={baseClass} type="date" />
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