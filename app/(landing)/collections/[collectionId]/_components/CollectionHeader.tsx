'use client'
import { getCollectionById } from "@/actions/get-collection-by-id";
import { getCollections } from "@/actions/get-collections";
import { Collection, Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";

type CollectionHeaderProps = {
    collection: Collection & {
        products: Product[];
    };
}

type ProductCollectionProps = {
    collectionId: string;
}

const CollectionHeader = ({collectionId}: ProductCollectionProps) => {
    const { data: collection, error, isFetched } = useQuery({
        queryKey: ["collection"],
        queryFn: () => getCollectionById(collectionId)
    });

    if(!collection) return <div>Collection not found</div>

    const productCount = collection.products.length || 0

    return (
        <div className="w-full">
            <div className="text-base font-semibold text-[#333] font-hind">
                {collection?.name} ({productCount})
            </div>
            <div className=" relative mt-4 h-[100px] md:h-[250px] w-full">
                <Image src={collection.image} alt={collection.name} fill />
            </div>
        </div>
    );
};

export default CollectionHeader;
