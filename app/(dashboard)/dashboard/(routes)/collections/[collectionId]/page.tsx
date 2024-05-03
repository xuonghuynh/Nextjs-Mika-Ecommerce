import { getCollectionById } from "@/actions/get-collection-by-id";
import EditCollectionForm from "@/app/(dashboard)/dashboard/(routes)/collections/[collectionId]/_component/EditCollectionForm";
import Title from "@/components/Title";
import WhiteBoxWrapper from "@/components/WhiteBox";
import { db } from "@/lib/db";
import React from "react";

const EditCollectionPage = async ({
    params,
}: {
    params: { collectionId: string };
}) => {
    const { collectionId } = params;
    const colletion = await getCollectionById(collectionId);

    if (!colletion)
        return (
            <div className="flex items-center justify-center py-20 italic">
                Collection not found
            </div>
        );

    return (
        <div className="p-8">
            <Title name="Edit Collection" />
            <WhiteBoxWrapper>
                <EditCollectionForm
                    initialData={colletion}
                    collectionId={collectionId}
                />
            </WhiteBoxWrapper>
        </div>
    );
};

export default EditCollectionPage;
