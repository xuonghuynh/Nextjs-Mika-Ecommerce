import React from "react";
import {
    Order,
    OrderProduct,
    Product,
    ProductImage,
    ShippingAddress,
} from "@prisma/client";
import Title from "@/components/Title";
import useTruncatedContent from "@/hooks/useTruncatedContent";

type ProductDetailProps = OrderProduct & {
    product: Product & { images: ProductImage[] };
};

type ProductsProps = {
    products: (OrderProduct & {
        product: Product & { images: ProductImage[] };
    })[];
};

type ShippingAddressProps = {
    shippingAddress: ShippingAddress[];
};

type OrderProductsProps = {
    order: Order & ProductsProps & ShippingAddressProps;
};

const CustomerDetails = ({ order }: OrderProductsProps) => {
    const truncatedEmail = useTruncatedContent(order.customerEmail!, 15);
    return (
        <div className="rounded-md border p-4">
            <div className="font-semibold">Customer Details</div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col gap-4 text-sm">
                    <div>Name</div>
                    <div>Email</div>
                    <div>
                        {order.shippingAddress[0].addressLine2 === null
                            ? "Address"
                            : "Address Line 1"}{" "}
                    </div>
                    {order.shippingAddress[0].addressLine2 !== null && (
                        <div>Address Line 2</div>
                    )}
                    <div>City</div>
                    <div>State</div>
                    <div>Country</div>
                </div>
                <div className="flex flex-col gap-4 text-gray-600 text-sm">
                    <div>{order.customerName}</div>
                    <div className="overflow-x-auto">{truncatedEmail}</div>
                    <div>{order.shippingAddress[0].addressLine1}</div>
                    {order.shippingAddress[0].addressLine2 !== null && (
                        <div>{order.shippingAddress[0].addressLine2}</div>
                    )}
                    <div>{order.shippingAddress[0].city}</div>
                    <div>{order.shippingAddress[0].state}</div>
                    <div>{order.shippingAddress[0].country}</div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;
