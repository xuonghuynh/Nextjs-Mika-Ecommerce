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
import { Pencil, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Collection, ProductImage } from "@prisma/client";
import { Editor } from "@/components/ui/editor";
import { FileUpload } from "@/app/(dashboard)/_components/FileUpload";
import Image from "next/image";
import MultiText from "@/app/(dashboard)/_components/MultiText";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "name is required",
    }),
    description: z.string(),
    images: z.array(z.string()).optional(),
    tags: z.array(z.string()),
    collections: z.array(z.string()).optional(),
});

interface ProductNameFormProps {
    productId: string;
    initialData: {
        name: string;
        description: string | null;
        tags: string[];
    } & {
        images: ProductImage[];
        collections: Collection[];
    };
}

const ProductForm = ({ initialData, productId }: ProductNameFormProps) => {
    const [isEditingImage, setIsEditingImage] = useState(false);
    const router = useRouter();

    console.log(initialData);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData.name,
            description: initialData.description || "",
            tags: initialData.tags || [],
            // images: initialData.images || [],
            // collections: initialData.collections[0] || [],
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            await axios.patch(`/api/product/${productId}`, values);
            toast.success("Update successfully");
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const onUploadProductImage = async (url: string) => {
        try {
            await axios.post(`/api/product/${productId}/image`, {
                url,
                productId,
            });
            toast.success("Image upload successfully");
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Image upload failed! Something went wrong!");
        }
    };

    const onDeleteProductImage = async (imageId: string) => {
        try {
            await axios.delete(`/api/product/${productId}/image`, {
                data: {
                    imageId,
                },
            });
            toast.success("Image deleted successfully");
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
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center justify-between">
                                        <div>Image</div>
                                    </FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            endpoint="collectionImage"
                                            onChange={(url) => {
                                                onUploadProductImage(url!);
                                                field.onChange(url);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-wrap items-center gap-2">
                            {initialData.images.map((image) => (
                                <div key={image.id} className="group relative">
                                    <Image
                                        className="aspect-video group-hover:bg-black/50"
                                        src={image.imageUrl}
                                        width={250}
                                        height={250}
                                        alt="image"
                                    />
                                    <div className="absolute left-0 top-0 hidden h-full w-full bg-black/50 transition-all duration-300 group-hover:block">
                                        <Button
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform hover:bg-transparent"
                                            variant={"ghost"}
                                            type="button"
                                            onClick={() => onDeleteProductImage(image.id)}
                                        >
                                            <Trash className="h-6 w-6 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !isValid}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center justify-between">
                                        <div>Tags</div>
                                    </FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Type your tag then press enter"
                                            value={field.value}
                                            onChange={(tag) =>
                                                field.onChange([
                                                    ...field.value,
                                                    tag,
                                                ])
                                            }
                                            onRemove={(tagToRemove) =>
                                                field.onChange(
                                                    field.value.filter(
                                                        (tag) =>
                                                            tag !== tagToRemove,
                                                    ),
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default ProductForm;
