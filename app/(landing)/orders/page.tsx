'use client';
import React from "react";

import toast from "react-hot-toast";
import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { useRouter } from "next/navigation";

const OrdersPage =  () => {
    return (
        <div className="container py-20 md:min-h-[calc(100vh-655px)]">
            Orders
        </div>
    );
};

export default OrdersPage;
