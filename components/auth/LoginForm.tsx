import React, { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CardWarapper from "@/components/auth/CardWrapper";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";

const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof LoginSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setSuccess("");
        setError("");

        startTransition(() => { 
            login(values).then((res) => {
                if (res.error) {
                    setError(res.error);
                }
                if (res.success) {
                    setSuccess(res.success);
                }
            });
        });
    }
    return (
        <CardWarapper
            headerLabel={"Login"}
            backButtonLabel={"Don't have an account? Sign Up"}
            backButtonLink="/register"
            showSocialLogin
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="shadcn"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <div className="flex w-full justify-center">
                        <Button
                            variant={"primaryOrange"}
                            className="rounded-full px-10 py-6"
                            type="submit"
                        >
                            Sign In
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWarapper>
    );
};

export default LoginForm;
