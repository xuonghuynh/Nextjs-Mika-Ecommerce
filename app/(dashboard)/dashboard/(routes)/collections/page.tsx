import { CollectionTable } from "@/app/(dashboard)/dashboard/(routes)/collections/_components/CollectionTable";
import { columns } from "@/app/(dashboard)/dashboard/(routes)/collections/_components/Colunms";
import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const CollectionPage = async() => {
    const user = await getServerCurrentUser();
    const collection = await db.collection.findMany({
        where: {
            userId: user?.id,
        },
        include: {
            products: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return (
        <div className="p-6">
            <CollectionTable data={collection} columns={columns} />
        </div>
    );
};

export default CollectionPage;
