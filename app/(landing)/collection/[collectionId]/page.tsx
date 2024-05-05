import { getCollectionById } from "@/actions/get-collection-by-id";
import AllCollectionProduct from "@/app/(landing)/collection/[collectionId]/_components/AllCollectionProduct";
import CollectionHeader from "@/app/(landing)/collection/[collectionId]/_components/CollectionHeader";
import CollectionSidebar from "@/app/(landing)/collection/[collectionId]/_components/CollectionSidebar";
import React from "react";

const CollectionIdPage = async ({
    params,
}: {
    params: { collectionId: string };
}) => {
    const collectionId = params.collectionId;
    const collection = await getCollectionById(collectionId);
    if (!collection) return <div>Collection not found</div>;
    console.log(collection);
    return (
        <div className="container mt-10 h-full md:h-[calc(100vh-650px)]">
            <div className="flex h-full gap-4">
                <CollectionSidebar />
                <div className="w-full">
                    <CollectionHeader collection={collection} />
                    <AllCollectionProduct collection={collection} />
                </div>
            </div>
        </div>
    );
};

export default CollectionIdPage;
