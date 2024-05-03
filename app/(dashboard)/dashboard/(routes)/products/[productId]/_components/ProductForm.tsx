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
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Collection, ProductImage } from "@prisma/client";
import Editor from "@/components/editor/Editor";
import { FileUpload } from "@/app/(dashboard)/_components/FileUpload";
import Image from "next/image";
import MultiText from "@/app/(dashboard)/_components/MultiText";
import "@/components/editor/prosemirror.css";
import { Select, SelectItem } from "@nextui-org/select";
import CurrencyInput from "react-currency-input-field";
import { UpdateProductSchema } from "@/schemas";
import WhiteBoxWrapper from "@/components/WhiteBox";
import RequiredMark from "@/components/RequiredMark";
import Link from "next/link";

interface ProductNameFormProps {
    productId: string;
    initialCollections: Collection[];
    initialData: {
        name: string;
        description: string | null;
        tags: string[];
        price: number | null;
        compareAtPrice: number | null;
    } & {
        images: ProductImage[];
        collections: Collection[];
    };
}

const ProductForm = ({
    initialData,
    initialCollections,
    productId,
}: ProductNameFormProps) => {
    const [isEditingImage, setIsEditingImage] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof UpdateProductSchema>>({
        resolver: zodResolver(UpdateProductSchema),
        defaultValues: {
            name: initialData.name,
            description: initialData.description || '""',
            tags: initialData.tags || [],
            price: initialData.price || 0,
            compareAtPrice: initialData.compareAtPrice || 0,
            images: initialData.images || [],
            collections:
                initialData.collections.map((collection) => collection.id) ||
                [],
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
                <div className="mt-6 grid grid-cols-1 gap-6 gap-y-8 xl:grid-cols-2">
                    <div className="flex flex-col gap-y-6">
                        <WhiteBoxWrapper>
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Name <RequiredMark />
                                            </FormLabel>
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
                                            <FormLabel>
                                                Description <RequiredMark />
                                            </FormLabel>
                                            <FormControl>
                                                <Editor
                                                    initialValue={JSON.parse(
                                                        field.value,
                                                    )}
                                                    onChange={(value) => {
                                                        const descriptionOnString =
                                                            JSON.stringify(
                                                                value,
                                                            );
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
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price ($) <RequiredMark />
                                                </FormLabel>
                                                <FormControl>
                                                    <CurrencyInput
                                                        id="input-price"
                                                        className="w-full rounded-md border px-[12px] py-[8px] "
                                                        name="input-name"
                                                        placeholder="Price"
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        prefix="$"
                                                        decimalsLimit={2}
                                                        onValueChange={(
                                                            value
                                                        ) => {
                                                            if(value === undefined) {
                                                                console.log('object')
                                                                field.onChange(0);
                                                            } else {
                                                                field.onChange(
                                                                    value,
                                                                );
                                                            }
                                                            console.log(value)
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="compareAtPrice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Compare At Price ($)
                                                </FormLabel>
                                                <FormControl>
                                                    <CurrencyInput
                                                        id="input-price"
                                                        className="w-full rounded-md border px-[12px] py-[8px] "
                                                        name="input-name"
                                                        placeholder="Compare At Price"
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        prefix="$"
                                                        decimalsLimit={2}
                                                        onValueChange={(
                                                            value
                                                        ) => {
                                                            if(value === undefined) {
                                                                console.log('object')
                                                                field.onChange(0);
                                                            } else {
                                                                field.onChange(
                                                                    value,
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                                                        onRemove={(
                                                            tagToRemove,
                                                        ) =>
                                                            field.onChange(
                                                                field.value.filter(
                                                                    (tag) =>
                                                                        tag !==
                                                                        tagToRemove,
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
                                                        selectedKeys={
                                                            field.value
                                                        }
                                                        variant="bordered"
                                                        className="w-full"
                                                        classNames={{
                                                            trigger: [
                                                                "border shadow-none rounded-md",
                                                            ],
                                                            value: [
                                                                "text-foreground-none",
                                                            ],
                                                        }}
                                                        onChange={(value) => {
                                                            const arrayIds =
                                                                value.target.value.split(
                                                                    ",",
                                                                );
                                                            const cleanedArray =
                                                                arrayIds.filter(
                                                                    (id) =>
                                                                        id !==
                                                                        "",
                                                                );
                                                            console.log(
                                                                cleanedArray,
                                                            );
                                                            field.onChange(
                                                                cleanedArray,
                                                            );
                                                        }}
                                                    >
                                                        {initialCollections.map(
                                                            (collection) => (
                                                                <SelectItem
                                                                    key={
                                                                        collection.id
                                                                    }
                                                                    value={
                                                                        collection.id
                                                                    }
                                                                >
                                                                    {
                                                                        collection.name
                                                                    }
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </WhiteBoxWrapper>
                    </div>
                    <div className="flex flex-col gap-y-6">
                        <WhiteBoxWrapper>
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="images"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center justify-between">
                                                <div>
                                                    Images <RequiredMark />
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <div>
                                                    <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
                                                        {initialData.images.map(
                                                            (image) => (
                                                                <div
                                                                    key={
                                                                        image.id
                                                                    }
                                                                    className="group relative flex items-center justify-center rounded-lg border-1 p-4"
                                                                >
                                                                    <Image
                                                                        className="aspect-[1/1] "
                                                                        src={
                                                                            image.imageUrl
                                                                        }
                                                                        height={
                                                                            250
                                                                        }
                                                                        width={
                                                                            250
                                                                        }
                                                                        alt="image"
                                                                    />
                                                                    <div className="absolute right-[5%] top-[4%] hidden rounded-lg transition-all duration-300 group-hover:block">
                                                                        <Button
                                                                            className="h-0 p-0 hover:bg-transparent"
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
                                                                            <X className="h-4 w-4 text-red-500" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )}
                                                        <FileUpload
                                                            endpoint="collectionImage"
                                                            className="mt-0 h-full p-3 xl:min-h-[300px]"
                                                            onChange={(url) => {
                                                                onUploadProductImage(
                                                                    field,
                                                                    url!,
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <Link href="/dashboard/products">
                                        <Button
                                            className="mr-5"
                                            type="button"
                                            variant={"outline"}
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        variant={"primaryOrange"}
                                        // disabled={isSubmitting || !isValid}
                                    >
                                        Save Product
                                    </Button>
                                </div>
                            </div>
                        </WhiteBoxWrapper>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default ProductForm;
