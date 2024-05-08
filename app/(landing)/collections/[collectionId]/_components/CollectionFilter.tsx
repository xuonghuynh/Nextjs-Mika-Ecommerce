import SmallTitle from "@/components/SmallTitle";
import React from "react";
import CollectionFilterItem from "@/app/(landing)/collections/[collectionId]/_components/CollectionFilterItem";

const CollectionFilter = ({
    collectionId,
}: {
    collectionId?: string;
}) => {
    
    return (
        <div>
            <SmallTitle title="Categories" />
            <div className="mt-4">
                <CollectionFilterItem
                    collectionId={collectionId}
                />
            </div>
        </div>
    );
};

export default CollectionFilter;
