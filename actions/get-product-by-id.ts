import { db } from "@/lib/db";

export const getProductById = async (id: string) => {
    try {
        const product = await db.product.findUnique({
            where: {
                id
            },
            include: {
                images: true,
                collections: true,
            },
        });
        return product;
    } catch (error) {
        console.error(error);
        return null;
    }
};
