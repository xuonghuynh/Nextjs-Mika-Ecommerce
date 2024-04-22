"use client";
import React, { useState } from "react";
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
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { Collection } from "@prisma/client";

type EditCollectionFormProps = {
    collectionId: string;
    initialData: {
        name: string;
        description: string;
        image: string;
    }
}

const EditCollectionForm = ({initialData, collectionId}: EditCollectionFormProps) => {
    const [image, setImage] = useState<string | undefined>(initialData.image);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof NewCollectionSchema>>({
        resolver: zodResolver(NewCollectionSchema),
        defaultValues: initialData,
    });

    const onSubmit = async (values: z.infer<typeof NewCollectionSchema>) => {
        try {
            const result = await axios.patch(`/api/collection/${collectionId}`, values);
            if (result.status === 200) {
                console.log(result.data);
                router.refresh();
                toast.success("Update collection successfully!");
            }
        } catch (error) {
            toast.error("Update collection failed!");
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Edit collection</h1>
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
                                    <FormLabel>Name</FormLabel>
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
                                        <Textarea
                                            placeholder=""
                                            {...field}
                                            rows={5}
                                        />
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
                                    <FormLabel className="flex items-center justify-between">
                                        <div>Image</div>
                                        <Button
                                            variant={"ghost"}
                                            type="button"
                                            onClick={() =>
                                                setIsEditing(!isEditing)
                                            }
                                        >
                                            {isEditing && image && <>Cancel</>}
                                            {!isEditing && image && (
                                                <>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </>
                                            )}
                                        </Button>
                                    </FormLabel>
                                    <FormControl>
                                        {isEditing ? (
                                            <FileUpload
                                                endpoint="collectionImage"
                                                onChange={(url) => {
                                                    setImage(url);
                                                    setIsEditing(false);
                                                    field.onChange(url);
                                                }}
                                            />
                                        ) : (
                                            image && (
                                                <div className="relative mt-2 aspect-video">
                                                    <Image
                                                        className="rounded-md object-cover"
                                                        src={image}
                                                        alt="Course image"
                                                        fill
                                                    />
                                                </div>
                                            )
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Update</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default EditCollectionForm;
