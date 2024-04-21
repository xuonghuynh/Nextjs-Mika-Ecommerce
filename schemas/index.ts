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

export const ForgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email("This is not a valid email")
});

export const NewPasswordSchema = z.object({
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
});

export const NewCollectionSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    image: z.string().min(1, { message: "Image is required" }),
});