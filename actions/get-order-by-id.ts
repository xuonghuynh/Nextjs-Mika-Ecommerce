'use server'
import { db } from "@/lib/db";

export const getOrderById = async (id: string) => {
    try {
        const order = await db.order.findUnique({
            where: {
                id
            },
            include: {
                shippingAddress: true,
                products: {
                    include: {
                        product: {
                            include: {
                                images: true
                            }
                        }
                    }
                },
            }
        });
        return order;
    } catch (error) {
        console.error(error);
        return null;
    }
};
