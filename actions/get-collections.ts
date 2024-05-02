import { db } from "@/lib/db";

export const getCollections = async () => {
    try {
        const collection = await db.collection.findMany({
            include: {
                products: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return collection;
    } catch (error) {
        console.error(error);
        return [];
    }
};
