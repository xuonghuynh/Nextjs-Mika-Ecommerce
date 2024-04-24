"use client";
import React from "react";
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { NewProductSchema } from "@/schemas";
import toast from "react-hot-toast";

const NewProductPage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof NewProductSchema>>({
        resolver: zodResolver(NewProductSchema),
        defaultValues: {
            name: "",
        },
    });
    const { isSubmitting, isValid } = form.formState;

    /**
     * Handles the form submission.
     *
     * @param {z.infer<typeof NewProductSchema>} values The form data
     */
    const onSubmit = async (values: z.infer<typeof NewProductSchema>) => {
        try {
            // Send a POST request to the server to create the course
            const response = await axios.post("/api/product", values);

            // Log the server response
            console.log(response);

            // Redirect the user to the new course's page
            router.push(`/dashboard/products/${response.data.id}`);
            toast.success("Create product successfully!");
        } catch (error) {
            // Log the error
            console.log(error);
            toast.error("Create product failed!");
        }
    };

    return (
        <div className="h-full">
            <div className="mx-auto flex h-full max-w-5xl p-6 md:items-center md:justify-center">
                <div>
                    <h1 className="text-2xl">Product Name</h1>
                    <p className="text-sm text-purple-600">
                        What would you like to name your product? Don&apos;t
                        worry, you can change it later.
                    </p>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="mt-8 space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g Skull Candy Headphones"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-x-2">
                                <Link href={"/dashboard/products"}>
                                    <Button variant="ghost">Cancel</Button>
                                </Link>
                                <Button
                                    disabled={!isValid || isSubmitting}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default NewProductPage;
