import { getServerCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const user = await getServerCurrentUser();
        const { name } = await req.json();
        if(!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const product = await db.product.create({
            data: {
                name,
                userId: user.id
            }
        })

        return NextResponse.json(product, { status: 200 })
    } catch (error) {
        console.log("CREATE_PRODUCT_ERROR", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}