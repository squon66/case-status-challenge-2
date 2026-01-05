import { Client } from "@/lib/definitions";
import React from "react";

function ClientData({ children }: { children: React.ReactNode }) {
  return <div className="bg-white px-4 py-3 text-sm hover:bg-gray-50">{children}</div>;
}

export function ClientRow({ client }: { client: Client }) {
  return (
    <React.Fragment key={client.id}>
      <ClientData>{client.id}</ClientData>
      <ClientData>{`${client.first_name} ${client.last_name}`}</ClientData>
      <ClientData>{client.email}</ClientData>
      <ClientData>{client.cell_phone}</ClientData>
      <ClientData>{client.integration_id}</ClientData>
    </React.Fragment>
  );
}   