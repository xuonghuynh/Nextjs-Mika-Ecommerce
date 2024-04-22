import EditCollectionForm from "@/app/(dashboard)/dashboard/(routes)/collections/[collectionId]/_component/EditCollectionForm";
import { db } from "@/lib/db";
import React from "react";


const EditCollectionPage = async ({
    params,
}: {
    params: { collectionId: string };
}) => {
    const { collectionId } = params;
    const colletion = await db.collection.findUnique({
        where: {
            id: collectionId,
        },
    });
    
    if(!colletion) return <div className="flex items-center justify-center italic py-20">Collection not found</div>;

    return (
        <EditCollectionForm initialData={colletion} collectionId={collectionId} />
    );
};

export default EditCollectionPage;
