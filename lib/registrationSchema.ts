import { object, string, z } from "zod";

export const registrationSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  name: string().min(1, "Name is required"),
});

// Infer the type from the schema
export type RegistrationFormData = z.infer<typeof registrationSchema>;
