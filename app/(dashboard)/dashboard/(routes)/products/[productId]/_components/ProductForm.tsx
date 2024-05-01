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
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Collection, ProductImage } from "@prisma/client";
import Editor from "@/components/editor/Editor";
import { FileUpload } from "@/app/(dashboard)/_components/FileUpload";
import Image from "next/image";
import MultiText from "@/app/(dashboard)/_components/MultiText";
import "@/components/editor/prosemirror.css";
import {Select, SelectItem} from "@nextui-org/select";
import { UpdateProductSchema } from "@/schemas";

interface ProductNameFormProps {
    productId: string;
    initialCollections: Collection[];
    initialData: {
        name: string;
        description: string | null;
        tags: string[];
    } & {
        images: ProductImage[];
        collections: Collection[];
    };
}

const ProductForm = ({ initialData, initialCollections, productId }: ProductNameFormProps) => {
    const [isEditingImage, setIsEditingImage] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof UpdateProductSchema>>({
        resolver: zodResolver(UpdateProductSchema),
        defaultValues: {
            name: initialData.name,
            description: initialData.description || '""',
            tags: initialData.tags || [],
            images: initialData.images || [],
            collections: initialData.collections.map((collection) => collection.id) || [],
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof UpdateProductSchema>) => {
        try {
            await axios.patch(`/api/product/${productId}`, values);
            toast.success("Update successfully");
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const onUploadProductImage = async (field: any, url: string) => {
        try {
            const image = await axios.post(`/api/product/${productId}/image`, {
                url,
                productId,
            });
            const imageData = {
                id: image.data.id,
                imageUrl: image.data.imageUrl,
                productId: image.data.productId,
                createdAt: new Date(image.data.createdAt),
                updatedAt: new Date(image.data.updatedAt),
            };
            field.onChange([...form.getValues().images, imageData]);
            toast.success("Image upload successfully");
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Image upload failed! Something went wrong!");
        }
    };

    const onDeleteProductImage = async (field: any, imageId: string) => {
        try {
            await axios.delete(`/api/product/${productId}/image`, {
                data: {
                    imageId,
                },
            });
            field.onChange(
                form.getValues().images.filter((image) => image.id !== imageId),
            );
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
                                        <Editor
                                            initialValue={JSON.parse(
                                                field.value,
                                            )}
                                            onChange={(value) => {
                                                const descriptionOnString =
                                                    JSON.stringify(value);
                                                field.onChange(
                                                    descriptionOnString,
                                                );
                                            }}
                                        />
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
                                        <div>Images</div>
                                        {initialData.images.length > 0 && (
                                            <Button
                                                variant={"ghost"}
                                                type="button"
                                                onClick={() =>
                                                    setIsEditingImage(
                                                        !isEditingImage,
                                                    )
                                                }
                                            >
                                                {isEditingImage && <>Cancel</>}
                                                {!isEditingImage && (
                                                    <>
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </FormLabel>
                                    <FormControl>
                                        <div>
                                            {((initialData.images.length > 0 &&
                                                isEditingImage) ||
                                                initialData.images.length ===
                                                    0) && (
                                                <FileUpload
                                                    endpoint="collectionImage"
                                                    onChange={(url) => {
                                                        onUploadProductImage(
                                                            field,
                                                            url!,
                                                        );
                                                    }}
                                                />
                                            )}
                                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                                {initialData.images.map(
                                                    (image) => (
                                                        <div
                                                            key={image.id}
                                                            className="group relative"
                                                        >
                                                            <Image
                                                                className="aspect-video group-hover:bg-black/50"
                                                                src={
                                                                    image.imageUrl
                                                                }
                                                                width={250}
                                                                height={250}
                                                                alt="image"
                                                            />
                                                            <div className="absolute left-0 top-0 hidden h-full w-full bg-black/50 transition-all duration-300 group-hover:block">
                                                                <Button
                                                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform hover:bg-transparent"
                                                                    variant={
                                                                        "ghost"
                                                                    }
                                                                    type="button"
                                                                    onClick={() =>
                                                                        onDeleteProductImage(
                                                                            field,
                                                                            image.id,
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash className="h-6 w-6 text-red-500" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <Button
                                type="submit"
                                // disabled={isSubmitting || !isValid}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-6">
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
                        <FormField
                            control={form.control}
                            name="collections"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center justify-between">
                                        <div>Collections</div>
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            aria-label="Collections"
                                            placeholder="Select an collection"
                                            selectionMode="multiple"
                                            selectedKeys={field.value}
                                            variant="underlined"
                                            className="w-full"
                                            onChange={(value) => {
                                                const arrayIds = value.target.value.split(',');
                                                const cleanedArray = arrayIds.filter((id) => id !== '');
                                                console.log(cleanedArray);
                                                field.onChange(cleanedArray);
                                            }}
                                        >
                                            {initialCollections.map((collection) => (
                                                <SelectItem
                                                    key={collection.id}
                                                    value={collection.id}
                                                >
                                                    {collection.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
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
