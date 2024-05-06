import { Collection, Product } from "@prisma/client";
import Image from "next/image";
import React from "react";

type CollectionHeaderProps = {
    collection: Collection & {
        products: Product[];
    };
}

const CollectionHeader = ({collection}: CollectionHeaderProps) => {
    const productCount = collection.products.length;
    return (
        <div className="w-full">
            <div className="text-base font-semibold">
                {collection.name} ({productCount})
            </div>
            <div className=" relative mt-4 h-[200px] w-full">
                <Image src={collection.image} alt={collection.name} fill />
            </div>
        </div>
    );
};

export default CollectionHeader;
