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
        console.log(values)
        // const { name, description, image } = await req.json();

        const product = db.product.update({
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
                }
            }
        })

        // await db.$transaction([updateProduct, product]);

        return NextResponse.json(product, { status: 200 });

    } catch (error) {
        console.log("PRODUCT_UPDATE", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}