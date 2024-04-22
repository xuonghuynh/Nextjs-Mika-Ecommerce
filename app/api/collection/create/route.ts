import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import slugify from 'react-slugify';

export async function POST(req: Request) {
    try {

        const user = await getServerCurrentUser();
        const { name, description, image } = await req.json();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const collection = await db.collection.create({
            data: {
                name,
                description,
                image,
                userId: user.id,
                slug: slugify(name),
            }
        });

        return NextResponse.json(collection, { status: 200 });

    } catch (error) {
        console.log("COLLECTION_CREATE", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
