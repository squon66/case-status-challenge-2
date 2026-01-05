import ClientForm from "@/features/clients/components/ClientForm";
import ClientListContainer from "@/features/clients/components/ClientListContainer";
import { ClientsPageHeader } from "@/features/clients/components/ClientListLoading";
import { ClientsResponse } from "@/features/clients/hooks/useCreateClient";
import { API_BASE_URL } from "@/lib/consts";

async function getClientsFromServer(): Promise<ClientsResponse> {
  const res = await fetch(`${API_BASE_URL}/clients`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch clients");
  }

  return res.json();
}

export default async function ClientsPage() {
  let clientData: ClientsResponse;

  try {
    // Fetch clients data on the server side initially
    clientData = await getClientsFromServer();
  } catch (error) {
    console.error('Failed to fetch initial client data:', error);
    // Provide fallback empty data - TanStack Query will handle retries
    clientData = { clients: [] };
  }

  return (
    <div className="flex flex-col w-full space-y-8">
      {/* Client List Section */}
      <div className="flex flex-col">
        <ClientsPageHeader>Client List</ClientsPageHeader>
        <ClientListContainer initialClients={clientData} />
      </div>
      {/* Client Form Section */}
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Create New Client
        </h2>
        <div>
          <ClientForm />
        </div>
    </div>
  );
}


