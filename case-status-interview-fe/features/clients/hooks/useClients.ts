import { useQuery } from '@tanstack/react-query';
import { ClientsResponse } from '@/features/clients/hooks/useCreateClient';
import { fetchClients } from '@/features/clients/services';

/**
 * Hook to fetch clients with caching and automatic polling
 */
export function useClients({initialClients}: {initialClients: ClientsResponse}) {
  return useQuery<ClientsResponse>({
    queryKey: ['clients'],
    queryFn: fetchClients,
    initialData: initialClients,
    // poll every 60 seconds
    refetchInterval: 60 * 1000,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
}