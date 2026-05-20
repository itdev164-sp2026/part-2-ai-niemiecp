import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  status: z.enum(["active", "completed", "archived"]),
});

export type Project = z.infer<typeof projectSchema>;

export const authSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain a number" }),
});

export type AuthInput = z.infer<typeof authSchema>;
