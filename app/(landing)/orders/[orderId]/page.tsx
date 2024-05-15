import { getOrderById } from "@/actions/get-order-by-id";
import CustomizedSteppers from "@/components/Stepper";
import React from "react";

const LandingOrderDetails = async({ params }: { params: { orderId: string } }) => {
    const order = await getOrderById(params.orderId);
    console.log(order)
    return (
        <div className="container py-20 md:min-h-[calc(100vh-655px)]">
            <div></div>
            <CustomizedSteppers />
        </div>
    );
};

export default LandingOrderDetails;
