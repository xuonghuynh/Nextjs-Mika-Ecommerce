import { db } from "@/lib/db";

export const getProductsBySearch = async ({name}: {name: string}) => {
    try {
        const products = await db.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                isPublished: true,
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            },
            include: {
                images: true,
                collections: true,
            },
        });
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
}