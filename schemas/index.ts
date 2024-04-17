import * as z from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email("This is not a valid email"),
    password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(2).max(50).email({ message: "Invalid email" }),
    password: z.string().min(1, { message: "Password is required" }),
});
