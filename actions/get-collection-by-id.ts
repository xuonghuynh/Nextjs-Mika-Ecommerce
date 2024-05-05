import { db } from "@/lib/db";

export const getCollectionById = async (id: string) => {
    try {
        const collection = await db.collection.findUnique({
            where: {
                id
            },
            include: {
                products: true
            }
        });
        return collection;
    } catch (error) {
        console.error(error);
        return null;
    }
};
