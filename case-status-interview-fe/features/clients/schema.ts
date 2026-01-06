import { z } from "zod";

export const clientFormSchema= z.object({
  first_name: z.string().min(1, "First name is required").max(128, "First name must be at most 128 characters"),
  last_name: z.string().min(1, "Last name is required").max(128, "Last name must be at most 128 characters"),
  email: z.string().email("Invalid email address"),
  cell_phone: z.string().regex(/^\d+$/, "Must contain only digits").min(10, "Cell phone must be at least 10 characters").max(32, "Cell phone must be at most 32 characters"),
  integration_id: z.string().min(1, "Integration ID is required"),
  birth_date: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;