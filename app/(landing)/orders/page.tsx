import React from 'react'

import toast from "react-hot-toast";
import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { useRouter } from "next/navigation";

const OrdersPage = async() => {
    const user = await getServerCurrentUser();
    const router = useRouter();
    if (!user) {
        toast.error("Please login to view your orders");
        return router.push("/login");
    }
    const orders = await db.order.findMany({
        where: {
            userId: user.id
        },
        include: {
            products: true
        }
    })
  return (
    <div>
      OrderPage
    </div>
  )
}

export default OrdersPage
