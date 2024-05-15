'use server'
import { db } from "@/lib/db";

export const getOrderById = async (id: string) => {
    try {
        const order = await db.order.findUnique({
            where: {
                id
            },
            include: {
                products: true,
            }
        });
        return order;
    } catch (error) {
        console.error(error);
        return [];
    }
};
