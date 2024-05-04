import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { productId: string } }) {
    try {
        const user  = await getServerCurrentUser();

        if(!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const product = await db.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                collections: true,
                images: true,
            }
        });

        if(!product) {
            return new NextResponse("Product not found", { status: 404 });
        }

        if(!product.name || !product.images || !product.stock || !product.price) {
            console.log('Missing Required Fields')
            return new NextResponse("Missing required fields", { status: 401 });
        }

        const publishedProduct = await db.product.update({
            where: {
                id: params.productId
            },
            data: {
                isPublished: true
            }
        });

        return NextResponse.json(publishedProduct, { status: 200 });

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}