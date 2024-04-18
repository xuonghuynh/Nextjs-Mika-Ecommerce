import * as z from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email("This is not a valid email"),
    password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(2).max(50).email({ message: "Invalid email" }),
    password: z.string().min(1, { message: "Password is required" }),
});
