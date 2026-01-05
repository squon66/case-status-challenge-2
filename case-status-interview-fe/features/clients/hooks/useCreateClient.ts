import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientFormValues } from "@/features/clients/schema";
import { Client } from "@/lib/definitions";
import { patchClient } from "@/features/clients/services";

export type ClientsResponse = {
  clients: Client[];
};

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchClient,
    onMutate: async (newClient: ClientFormValues) => {
      await queryClient.cancelQueries({ queryKey: ["clients"] });

      const previousClients = queryClient.getQueryData<ClientsResponse>(["clients"]);
      const tempClient: Client = {
        id: -Date.now(), // Temporary ID
        firm_id: 1,
        first_name: newClient.first_name,
        last_name: newClient.last_name,
        email: newClient.email,
        cell_phone: newClient.cell_phone,
        integration_id: newClient.integration_id,
        birth_date: newClient.birth_date ?? "",
        ssn: "",
      };

      // Optimistically update the clients list
      queryClient.setQueryData<ClientsResponse>(["clients"], (old = { clients: [] }) => ({
        clients: [...old.clients, tempClient],
      }));

      return { previousClients };
    },
    onError: (_err, _newClient, context) => {
      if (context?.previousClients) {
        queryClient.setQueryData(["clients"], context.previousClients);
      }
    },
    // onSuccess logic was intended to prevent reload flashes.  But it was dependent on response returning
    // client data which it is not. 

    // onSuccess: (response: { client: Client }, _variables, context) => {
    //   // Update cache with the real client data from server
    //   queryClient.setQueryData<ClientsResponse>(["clients"], (old = { clients: [] }) => {
    //     // Replace the temporary client with the real one from server
    //     const updatedClients = old.clients.map(client => 
    //       client.id === context?.tempClient.id ? response.client : client
    //     );
    //     return { clients: updatedClients };
    //   });
    // },

    // If onSuccess was implemented I would remove this to prevent the full list refresh.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}