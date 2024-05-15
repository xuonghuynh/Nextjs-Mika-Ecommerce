import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import slugify from 'react-slugify';

export async function GET() {
    try {

        const user = await getServerCurrentUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const orders = await db.order.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                products: {
                    include: {
                        product: {
                            include: {
                                images: true
                            }
                        }
                    }
                }
            }
        })

        return NextResponse.json(orders, { status: 200 });

    } catch (error) {
        console.log("COLLECTION_CREATE", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
