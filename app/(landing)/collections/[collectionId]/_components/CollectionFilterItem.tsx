"use client";
import React from "react";
import { Collection, Product, ProductImage } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { getCollections } from "@/actions/get-collections";
import toast from "react-hot-toast";

type CollectionFilterItemProps = {
    collectionId?: string;
};

type ProductProps = {
    products: Product[];
};
type CollectionsProps = Collection & ProductProps;

const CollectionFilterItem = ({ collectionId }: CollectionFilterItemProps) => {
    const router = useRouter();

    const {
        data: collections,
        error,
        isFetching,
    } = useQuery<any>({
        queryKey: ["collections"],
        queryFn: () => getCollections(),
        staleTime: Infinity,
    });

    if (!collections)
        return (
            <SkeletonWrapper isLoading={isFetching}>
                <div className="h-[50px]"></div>
            </SkeletonWrapper>
        );

    if (error) {
        return toast.error("Something went wrong");
    }
    const onHandleChange = (value: string) => {
        router.push(`/collections/${value}`);
        router.refresh();
    };
    return (
        <div className="flex items-center justify-between">
            <RadioGroup
                defaultValue={collectionId}
                className="flex flex-col gap-y-4 w-full pr-4"
                onValueChange={(value) => onHandleChange(value)}
            >
                {collections.map((collection: CollectionsProps) => (
                    <div
                        key={collection.id}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value={collection.id}
                                id={collection.id}
                                asCheckBox
                            />
                            <Label
                                className="w-full cursor-pointer font-normal"
                                htmlFor={collection.id}
                            >
                                {collection.name}
                            </Label>
                        </div>
                        <div className="font-normal text-sm">({collection.products.length})</div>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default CollectionFilterItem;
