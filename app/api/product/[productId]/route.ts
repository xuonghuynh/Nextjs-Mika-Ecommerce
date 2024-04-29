import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { productId: string } }) {
    try {
        const user = await getServerCurrentUser();
        const id  = params.productId;
        const values = await req.json();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const {collectionsss} = values
        console.log("========COLLECTION=========", values.collections)

        let collections = null

        if(values.collections.length > 0) {
            collections = {
                set: [],
                connect: values.collections.map((collection: string) => ({ id: collection }))
            }
        } else {
            collections = {
                set: [],
            }
        }

        // const connectCollection = values.colllections !== undefined ? {connect: values.collections.map((collection: string) => ({ id: collection }))} : {}

        const product = await db.product.update({
            where: {
                id
            },
            data: {
                ...values,
                images: {
                    updateMany: {
                        where: {
                            productId: id
                        },
                        data: {
                            id: values.images.id,
                            imageUrl: values.images.imageUrl,
                            updatedAt: new Date(),
                            createdAt: values.images.createdAt
                        }
                    }
                },
                collections
            }
        })

        return NextResponse.json(product, { status: 200 });

    } catch (error) {
        console.log("PRODUCT_UPDATE", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { productId: string } }) {
    try {
        const user = await getServerCurrentUser();
        const id  = params.productId;

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedProduct = await db.product.delete({
            where: {
                id
            }
        })

        return NextResponse.json(deletedProduct, { status: 200 });
    } catch (error) {
        console.log("PRODUCT_DELETE", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}