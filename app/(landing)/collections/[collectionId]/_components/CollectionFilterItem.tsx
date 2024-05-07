'use client'
import React from "react";
import { Collection } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";

type CollectionFilterItemProps = {
    collections: Collection[];
    collectionId?: string;
}

const CollectionFilterItem = ({collections, collectionId}: CollectionFilterItemProps) => {
    const router = useRouter();
    const onHandleChange = (value: string) => {
        router.push(`/collections/${value}`)
    }
    return (
        <div className="flex items-center justify-between">
                <RadioGroup defaultValue={collectionId} onValueChange={(value) => onHandleChange(value)}>
                    {collections.map((collection) => (
                        <div
                            key={collection.id}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem
                                value={collection.id}
                                id={collection.id}
                            />
                            <Label
                                className="cursor-pointer"
                                htmlFor={collection.id}
                            >
                                {collection.name}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
    );
};

export default CollectionFilterItem;
