"use client";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { OrderTable } from "@/app/(landing)/orders/_components/OrderTable";
import { OrderColumns } from "@/app/(landing)/orders/_components/OrderTableColumn";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Title from "@/components/Title";

const OrdersPage = () => {
    const user = useCurrentUser();
    const router = useRouter();

    const { data, status, isError, error } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await axios.get("/api/orders");
            return res.data;
        },
    });

    if (!user) {
        toast.error("Please login first");
        return router.push("/login");
    }

    if(isError) {
        toast.error("Something went wrong");
    }

    return (
        <div className="container py-20 md:min-h-[calc(100vh-655px)]">
            <Title name="Orders" />
            {status === "success" && (
                <OrderTable data={data} columns={OrderColumns} />
            )}
        </div>
    );
};

export default OrdersPage;
