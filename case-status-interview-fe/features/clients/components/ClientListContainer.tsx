
"use client"

import { ClientsResponse } from "@/features/clients/components/ClientForm";
import { ClientList } from "@/features/clients/components/ClientList";
import { Client } from "@/lib/definitions";
import { useClients } from "@/features/clients/hooks/useClients";
import { ClientListError, ClientListLoading } from "@/features/clients/components/ClientListLoading";

export default function ClientListContainer({initialClients}: {initialClients: ClientsResponse}) {
    console.log('Fetching clients in ClientContainer');
    const { data, isLoading, error, isRefetching } = useClients({initialClients});
    console.log('two')

    const clients: Client[] = data?.clients || [];

    if (isLoading) return <ClientListLoading />;
    
    if (!clients.length) return <ClientListError error={new Error("No clients data available")} />;

    if (error) return <ClientListError error={error} />;
    
    return (
        <ClientList
            clients={clients}
            isRefetching={isRefetching}
        />
    );
}