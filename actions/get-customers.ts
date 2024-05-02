import { db } from "@/lib/db";

export const getCustomers = async () => {
    try {
        const allCustomer = await db.user.findMany({
            include: {
                accounts: true,
            },
        });
        return allCustomer;
    } catch (error) {
        console.error(error);
        return [];
    }
}