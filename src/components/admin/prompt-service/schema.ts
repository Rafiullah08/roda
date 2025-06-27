
import { z } from "zod";

// Schema for prompt form validation
export const promptFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price cannot be negative"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["active", "inactive", "draft", "archived"]),
  featured: z.boolean().default(false),
  prompt_template: z.string().min(5, "Prompt template must be at least 5 characters"),
  model: z.string().default("gpt-4o-mini")
});

export type PromptFormValues = z.infer<typeof promptFormSchema>;
