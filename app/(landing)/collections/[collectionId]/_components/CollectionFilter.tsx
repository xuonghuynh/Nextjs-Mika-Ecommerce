import { getCollections } from "@/actions/get-collections";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SmallTitle from "@/components/SmallTitle";
import React from "react";
import CollectionFilterItem from "@/app/(landing)/collections/[collectionId]/_components/CollectionFilterItem";

const CollectionFilter = async ({
    collectionId,
}: {
    collectionId?: string;
}) => {
    const collections = await getCollections();
    return (
        <div>
            <SmallTitle title="Categories" />
            <div className="mt-4">
                <CollectionFilterItem
                    collections={collections}
                    collectionId={collectionId}
                />
            </div>
        </div>
    );
};

export default CollectionFilter;
