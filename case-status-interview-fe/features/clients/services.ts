import { ClientsResponse } from "@/features/clients/components/ClientForm";
import { ClientFormValues } from "@/features/clients/schema";
import { transformClientsData } from "@/features/clients/util";
import { API_BASE_URL } from "@/lib/consts";
import { Client } from "@/lib/definitions";

const fakeClient: Client = {
  id: 1,
  firm_id: 1,
  first_name: "John",
  last_name: "Doe",
  birth_date: new Date().toISOString(),
  email: "johndoe@example.com",
  cell_phone: "5555555555",
  integration_id: "integration-234",
  ssn: "123-45-6789",
};

/**
 * Fetch all clients from the API
 */
export async function fetchClients(): Promise<ClientsResponse> {
  const res = await fetch(`${API_BASE_URL}/clients`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch clients");
  return res.json();
}

/**
 * Update a client in the API
 */
export async function patchClient(data: ClientFormValues): Promise<Client> {
  // Transform data to match API expectations
  const payload = transformClientsData(data);

  const res = await fetch(`${API_BASE_URL}/clients`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to update client");
  }

  
  const response = await res.json();

  if (response.status === "error") {
    throw new Error(response.errors || "Failed to update client");
  }

  return response.result; // API returns { status, result, client }
}
