import { getCollectionById } from "@/actions/get-collection-by-id";
import { getCollections } from "@/actions/get-collections";
import AllCollectionProduct from "@/app/(landing)/collections/[collectionId]/_components/AllCollectionProduct";
import CollectionHeader from "@/app/(landing)/collections/[collectionId]/_components/CollectionHeader";
import CollectionSidebar from "@/app/(landing)/collections/[collectionId]/_components/CollectionSidebar";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import React from "react";

const CollectionIdPage = async ({
    params,
}: {
    params: { collectionId: string };
}) => {
    const collectionId = params.collectionId;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["collection"],
        queryFn: () => getCollectionById(collectionId)
    });

    await queryClient.prefetchQuery({
        queryKey: ["collections"],
        queryFn: () => getCollections(),
        staleTime: Infinity,
    });

    return (
        <div className="container mt-10 min-h-[48vh]">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <div className="flex h-full gap-4">
                <CollectionSidebar collectionId={collectionId} />
                <div className="w-full">
                    <CollectionHeader collectionId={collectionId}/>
                    <AllCollectionProduct />
                </div>
            </div>
            </HydrationBoundary>
        </div>
    );
};

export default CollectionIdPage;
