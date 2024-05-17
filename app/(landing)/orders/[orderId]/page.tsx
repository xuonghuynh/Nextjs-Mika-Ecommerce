import { getOrderById } from "@/actions/get-order-by-id";
import CustomerDetails from "@/app/(landing)/orders/[orderId]/_components/CustomerDetails";
import OrderProducts from "@/app/(landing)/orders/[orderId]/_components/OrderProducts";
import CustomizedSteppers from "@/components/Stepper";
import Title from "@/components/Title";
import VerticalStepper from "@/components/VerticalStepper";
import { formatPrice } from "@/ultils/formats";
import { Order, Product } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const LandingOrderDetails = async ({
    params,
}: {
    params: { orderId: string };
}) => {
    const order = await getOrderById(params.orderId);
    if (!order) return null;
    console.log(order);
    return (
        <div className="container py-20 md:min-h-[calc(100vh-655px)]">
            <Link href="/orders" className="mb-5 flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to order
            </Link>
            <Title classname="mb-0" name="Order Details" />
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="col-span-2">
                    <div className="mb-6 font-semibold">
                        Order ID:{" "}
                        <span className="uppercase text-main">#{order.id}</span>
                    </div>
                    <div>
                        <OrderProducts order={order} />
                    </div>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3">
                        <div className="col-span-2">
                            {order.orderInstruction && (
                                <div className=" flex items-center gap-2 font-semibold">
                                    Order Note:{" "}
                                    <div className="text-sm font-normal text-gray-600">
                                        {order.orderInstruction}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 px-4">
                            <div className="flex items-center justify-between">
                                <div className="text-gray-500">Subtotal: </div>
                                <div className="text-gray-500">
                                    {formatPrice(order.totalAmount)}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-gray-500">Shipping: </div>
                                <div className="text-gray-500">FREE</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-gray-500">Tax: </div>
                                <div className="text-gray-500">$0.00</div>
                            </div>
                            <div className="flex items-center justify-between border-t pt-2">
                                <div>Total: </div>
                                <div>{formatPrice(order.totalAmount)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" p-8">
                    <div className="bg-[#f8f8f8] p-8">
                        <VerticalStepper orderStatus={order.status} />
                    </div>
                    <div className="mt-6">
                        <CustomerDetails order={order} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingOrderDetails;
