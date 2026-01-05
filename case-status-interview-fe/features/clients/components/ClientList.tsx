
"use client";

import { ClientRow } from "@/features/clients/components/Client";
import { Client } from "@/lib/definitions";

function ClientGridHeader({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-gray-50 px-4 py-3 text-left font-semibold text-sm">{children}</div>
  );
}

export function ClientList({ clients }: { clients: Client[] }) {
  return (
    <div className="flex flex-col w-full relative">
      
      {clients.length > 0 ? (
        <div className="w-full">
          {/* Combined Header and Data Rows */}
          <div className="grid gap-px bg-gray-300 border border-gray-300" style={{gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr'}}>
            {/* Header Row */}
            <ClientGridHeader>ID</ClientGridHeader>
            <ClientGridHeader>Name</ClientGridHeader>
            <ClientGridHeader>Email</ClientGridHeader>
            <ClientGridHeader>Cell Phone</ClientGridHeader>
            <ClientGridHeader>Integration ID</ClientGridHeader>
            
            {/* Data Rows */}
            {clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
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