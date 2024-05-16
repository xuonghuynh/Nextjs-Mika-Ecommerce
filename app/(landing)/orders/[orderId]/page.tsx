import { getOrderById } from "@/actions/get-order-by-id";
import CustomizedSteppers from "@/components/Stepper";
import Title from "@/components/Title";
import VerticalStepper from "@/components/VerticalStepper";
import { Order, Product } from "@prisma/client";
import React from "react";

const LandingOrderDetails = async ({
    params,
}: {
    params: { orderId: string };
}) => {
    const order = await getOrderById(params.orderId);
    if(!order) return null
    console.log(order);
    return (
        <div className="container py-20 md:min-h-[calc(100vh-655px)]">
            <Title name="Order Details" />

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="col-span-2">
                </div>
                <div className="p-8 bg-[#f8f8f8]">
                    <VerticalStepper orderStatus={order.status} />
                </div>
            </div>
        </div>
    );
};

export default LandingOrderDetails;
