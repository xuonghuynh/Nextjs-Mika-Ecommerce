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
import { Pencil, Plus } from "lucide-react";
import Title from "@/components/Title";
import WhiteBoxWrapper from "@/components/WhiteBox";
import Link from "next/link";

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
        <div className="p-8">
            <Title name="Create new collection" />
            <WhiteBoxWrapper>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="flex flex-col gap-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder=""
                                                    {...field}
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
                                <div>
                                    <Link href="/dashboard/collections">
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
                                    >
                                        <Plus className="mr-2 h-3 w-3" />
                                        Create
                                    </Button>
                                </div>
                            </div>
                            <div>
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
                                                    {!isEditing && image && (
                                                        <>Cancel</>
                                                    )}
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
                                                        <div className="relative mt-2 flex items-center justify-center">
                                                            <Image
                                                                className="rounded-md object-cover"
                                                                src={image}
                                                                alt="Course image"
                                                                width={250}
                                                                height={250}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </form>
                </Form>
            </WhiteBoxWrapper>
        </div>
    );
};

export default NewCollection;
