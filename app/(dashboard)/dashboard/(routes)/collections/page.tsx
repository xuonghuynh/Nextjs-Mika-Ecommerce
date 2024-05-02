import { getCollections } from "@/actions/get-collections";
import { CollectionTable } from "@/app/(dashboard)/dashboard/(routes)/collections/_components/CollectionTable";
import { columns } from "@/app/(dashboard)/dashboard/(routes)/collections/_components/Colunms";
import Title from "@/components/Title";
import WhiteBoxWrapper from "@/components/WhiteBox";
import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const CollectionPage = async () => {
    const collection = await getCollections();
    return (
        <div className="p-8">
            <Title name="Collections" />
            <WhiteBoxWrapper>
                <CollectionTable data={collection} columns={columns} />
            </WhiteBoxWrapper>
        </div>
    );
};

export default CollectionPage;
