import { getCollectionById } from "@/actions/get-collection-by-id";
import { getCollections } from "@/actions/get-collections";
import AllCollectionProduct from "@/app/(landing)/collections/[collectionId]/_components/AllCollectionProduct";
import CollectionHeader from "@/app/(landing)/collections/[collectionId]/_components/CollectionHeader";
import CollectionSidebar from "@/app/(landing)/collections/[collectionId]/_components/CollectionSidebar";
import React from "react";

const CollectionIdPage = async ({
    params,
}: {
    params: { collectionId: string };
}) => {
    const collectionId = params.collectionId;
    const collection = await getCollectionById(collectionId);
    if (!collection) return <div>Collection not found</div>;
    return (
        <div className="container mt-10">
            <div className="flex h-full gap-4">
                <CollectionSidebar collectionId={collectionId} />
                <div className="w-full">
                    <CollectionHeader collection={collection} />
                    <AllCollectionProduct collection={collection} />
                </div>
            </div>
        </div>
    );
};

export default CollectionIdPage;
