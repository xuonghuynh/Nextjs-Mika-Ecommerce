"use client";
import React from "react";
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
import { NewCollectionSchema } from "@/schemas";
import { z } from "zod";
import { FileUpload } from "@/app/(dashboard)/_components/FileUpload";
import { Textarea } from "@/components/ui/textarea";

const NewCollection = () => {
    const form = useForm<z.infer<typeof NewCollectionSchema>>({
        resolver: zodResolver(NewCollectionSchema),
        defaultValues: {
            name: "",
            description: "",
            image: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof NewCollectionSchema>) => {
        console.log(values);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Create new collection
                    </h1>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Collection Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="" {...field} rows={5} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            endpoint="collectionImage"
                                            onChange={(url) => {
                                                field.onChange(url);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default NewCollection;
