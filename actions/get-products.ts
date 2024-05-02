import { db } from "@/lib/db";

export const getProducts = async () => {
    try {
        const allProduct = await db.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                images: true,
                collections: true,
            },
        });
        return allProduct;
    } catch (error) {
        console.error(error);
        return [];
    }
}