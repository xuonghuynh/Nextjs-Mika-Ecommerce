import { db } from "@/lib/db";

export const getRelatedProducts = async () => {
    try {
        const allProduct = await db.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 4,
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