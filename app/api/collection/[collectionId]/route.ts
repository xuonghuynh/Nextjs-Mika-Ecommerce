import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import slugify from 'react-slugify';

export async function GET(req: Request, { params }: { params: { collectionId: string } }) {
    try {
        const id  = params.collectionId;

        const collection = await db.collection.findUnique({
            where: {
                id
            },
            include: {
                products: {
                    where: {
                        isPublished: true
                    },
                    include: {
                        images: true
                    }
                }
            }
        });

        return NextResponse.json(collection, { status: 200 });

    } catch (error) {
        console.log("COLLECTION_GET", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
export async function PATCH(req: Request, { params }: { params: { collectionId: string } }) {
    try {
        const user = await getServerCurrentUser();
        const id  = params.collectionId;

        if (!user || user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { name, description, image } = await req.json();

        const collection = await db.collection.update({
            where: {
                id
            },
            data: {
                name,
                description,
                image,
                slug: slugify(name),
            }
        });

        return NextResponse.json(collection, { status: 200 });

    } catch (error) {
        console.log("COLLECTION_UPDATE", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: Request, {params}: { params: { collectionId: string }}) {
    try {
        const user = await getServerCurrentUser();
        const id  = params.collectionId;

        if (!user || user.role !== "ADMIN") {
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
