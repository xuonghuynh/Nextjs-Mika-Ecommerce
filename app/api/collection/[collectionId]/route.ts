import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import slugify from 'react-slugify';

export async function DELETE(req: Request, {params}: { params: { collectionId: string }}) {
    try {
        const user = await getServerCurrentUser();
        const id  = params.collectionId;

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const collection = await db.collection.delete({
            where: {
                id
            }
        });

        return NextResponse.json(collection, { status: 200 });

    } catch (error) {
        console.log("COLLECTION_DELETE", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
