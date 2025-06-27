
import { z } from "zod";

export const customQuoteSchema = z.object({
  description: z.string().min(10, "Please provide a detailed description (minimum 10 characters)"),
  estimatedBudget: z.string().min(1, "Please enter your estimated budget"),
  deliveryDate: z.date({
    required_error: "Please select a delivery date",
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type CustomQuoteFormValues = z.infer<typeof customQuoteSchema>;
