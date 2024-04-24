"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Collection, ProductImage } from "@prisma/client";
import { Editor } from "@/components/ui/editor";


const formSchema = z.object({
    name: z.string().min(1, {
        message: "name is required",
    }),
    description: z.string()
});

interface ProductNameFormProps {
    productId: string;
    initialData: {
        name: string;
        description: string | null;
        
    } & {
        images: ProductImage[];
        collections: Collection[];
    }
}

const ProductForm = ({ initialData, productId }: ProductNameFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData.name,
            description: initialData.description || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/product/${productId}`, values);
            toast.success("Update successfully");
            setIsEditing(false);
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="mt-6 grid grid-cols-1 gap-6 gap-y-8 md:grid-cols-3">
                    <div className="col-span-2 flex flex-col gap-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g Advanced React course"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
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
                                        <Editor {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                        >
                            Save
                        </Button>
                        </div>
                    </div>
                    <div>ABV</div>
                </div>
            </form>
        </Form>
    );
};

export default ProductForm;
