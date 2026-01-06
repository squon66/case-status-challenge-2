import { ClientFormValues } from "@/features/clients/schema";

export type ClientRequestData = {
  firm_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_numbers: string[];
  integration_id: string;
  birth_date?: string;
  integration_type: string;
};

export const transformClientsData = (data: ClientFormValues): ClientRequestData => {
	const clientData:ClientRequestData = {
    firm_id: 1,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone_numbers: [data.cell_phone],
    integration_id: data.integration_id,
    integration_type: "CSV_IMPORT",
    ...(data.birth_date && { birth_date: data.birth_date }),
  };

  return clientData;
};