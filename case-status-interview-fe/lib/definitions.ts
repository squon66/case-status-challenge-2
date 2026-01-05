export type Client = {
  id: number;
  firm_id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  email: string;
  cell_phone: string;
  integration_id: string;
  ssn: string;
};

export type ClientFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  cell_phone: string;
  integration_id: string;
  birth_date?: string;
};
