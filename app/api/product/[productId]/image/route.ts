import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
        const user = await getServerCurrentUser();
        
        if(!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const { url, productId } = await req.json();

        const product = await db.productImage.create({
            data: {
                productId,
                imageUrl: url,
            }
        });

        return NextResponse.json(product, { status: 200 });

    } catch (error) {
        console.log("IMAGE_UPLOAD", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE (req: Request) {
    try {
        const user = await getServerCurrentUser();
        
        if(!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const { imageId } = await req.json();

        const product = await db.productImage.delete({
            where: {
                id: imageId
            }
        });

        return NextResponse.json(product, { status: 200 });

    } catch (error) {
        console.log("IMAGE_UPLOAD", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}