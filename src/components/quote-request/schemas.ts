
import { z } from "zod";

// Schema for the quote request form - simplified for logged-in users
export const loggedInSchema = z.object({
  requirements: z.string().min(10, "Please provide detailed requirements (minimum 10 characters)"),
  budget: z.string().optional(),
  deadline: z.date().optional(),
});

// Schema for guests with additional contact fields
export const guestSchema = loggedInSchema.extend({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

// Types based on the schemas
export type LoggedInFormValues = z.infer<typeof loggedInSchema>;
export type GuestFormValues = z.infer<typeof guestSchema>;
export type FormValues = LoggedInFormValues | GuestFormValues;
