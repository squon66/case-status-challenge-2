
"use client";

import React from "react";
import { Client } from "@/lib/definitions";

function ClientGridHeader({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-gray-50 px-4 py-3 text-left font-semibold text-sm">{children}</div>
  );
}

export function ClientList({ clients, isRefetching }: { clients: Client[], isRefetching: boolean }) {
  return (
    <div className="flex flex-col w-full relative">
      {isRefetching && (
        <div className="absolute top-2 right-2 text-sm text-blue-500 z-10">
          Refreshing...
        </div>
      )}
      {clients.length > 0 ? (
        <div className="w-full">
          <div className="grid gap-px bg-gray-300 border border-gray-300" style={{gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr'}}>
            <ColumnNames />
            <ClientRows clients={clients} />
          </div>
        </div>
      ) : (
        <div className="w-full text-center p-8 text-gray-500 border border-gray-200 rounded">
          No clients found. Make sure the backend is running on http://localhost:5001
        </div>
      )}
    </div>
  );
}

function ClientDataCell({ children }: { children: React.ReactNode }) {
  return <div className="bg-white px-4 py-3 text-sm hover:bg-gray-50">{children}</div>;
}

function ClientRow({ client }: { client: Client }) {
  return (
    <React.Fragment key={client.id}>
      <ClientDataCell>{client.id}</ClientDataCell>
      <ClientDataCell>{`${client.first_name} ${client.last_name}`}</ClientDataCell>
      <ClientDataCell>{client.email}</ClientDataCell>
      <ClientDataCell>{client.cell_phone}</ClientDataCell>
      <ClientDataCell>{client.integration_id}</ClientDataCell>
    </React.Fragment>
  );
} 

function ColumnNames() {
  const columnNames = ['ID', 'Name', 'Email', 'Cell Phone', 'Integration ID'];
  return (
    <>
      {columnNames.map((name) => (
        <ClientGridHeader key={name}>{name}</ClientGridHeader>
      ))}
    </>
  );
}

function ClientRows({ clients }: { clients: Client[] }) {
  return (
    <>
      {clients.map((client) => (
        <ClientRow key={client.id} client={client} />
      ))}
    </>
  );
}