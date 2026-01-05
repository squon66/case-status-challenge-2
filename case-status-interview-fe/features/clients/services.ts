import { ClientsResponse } from "@/features/clients/components/ClientForm";
import { ClientFormValues } from "@/features/clients/schema";
import { transformClientsData } from "@/features/clients/util";
import { API_BASE_URL } from "@/lib/consts";
import { Client } from "@/lib/definitions";

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
  // Client form data and expected API payload differ to transform the data
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

  return response.client;
}
