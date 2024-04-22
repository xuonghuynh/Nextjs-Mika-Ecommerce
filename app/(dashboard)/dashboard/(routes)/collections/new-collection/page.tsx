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

const NewCollection = () => {
    const router = useRouter();
    const [image, setImage] = useState<string | undefined>("");
    const [isEditing, setIsEditing] = useState(false);
    const form = useForm<z.infer<typeof NewCollectionSchema>>({
        resolver: zodResolver(NewCollectionSchema),
        defaultValues: {
            name: "",
            description: "",
            image: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof NewCollectionSchema>) => {
        try {
            const result = await axios.post("/api/collection/create", values);
            if (result.status === 200) {
                console.log(result.data);
                router.push("/dashboard/collections");
                router.refresh();
                toast.success("Create collection successfully!");
            }
        } catch (error) {
            toast.error("Create collection failed!");
        }
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
                                            onClick={() =>
                                                setIsEditing(!isEditing)
                                            }
                                        >
                                            {!isEditing && image && <>Cancel</>}
                                            {isEditing && image && (
                                                <>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </>
                                            )}
                                        </Button>
                                    </FormLabel>
                                    <FormControl>
                                        {!isEditing ? (
                                            <FileUpload
                                                endpoint="collectionImage"
                                                onChange={(url) => {
                                                    setImage(url);
                                                    setIsEditing(true);
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
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default NewCollection;
