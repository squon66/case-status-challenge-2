
"use client"

import { ClientList } from "@/features/clients/components/ClientList";
import { Client } from "@/lib/definitions";
import { useClients } from "@/features/clients/hooks/useClients";
import { ClientListError, ClientListLoading } from "@/features/clients/components/ClientListLoading";
import { ClientsResponse } from "@/features/clients/hooks/useCreateClient";

export default function ClientListContainer({initialClients}: {initialClients: ClientsResponse}) {
    const { data, isLoading, error, isRefetching } = useClients({initialClients});

    const clients: Client[] = data?.clients || [];

    if (isLoading) return <ClientListLoading />;

    if (error) return <ClientListError error={error} />;
    
    if (!clients.length) return <ClientListError error={new Error("No clients data available")} />;
    
    return (
        <ClientList
            clients={clients}
            isRefetching={isRefetching}
        />
    );
}