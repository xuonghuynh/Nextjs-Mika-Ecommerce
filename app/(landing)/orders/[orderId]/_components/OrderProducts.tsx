"use client";
import ProductPrice from "@/components/ProductPrice";
import TotalPrice from "@/components/TotalPrice";
import { Order, OrderProduct, Product, ProductImage } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductDetailProps = OrderProduct & {
    product: Product & { images: ProductImage[] };
};

type ProductsProps = {
    products: (OrderProduct & {
        product: Product & { images: ProductImage[] };
    })[];
};

type OrderProductsProps = {
    order: Order & ProductsProps;
};

const OrderProducts = ({ order }: OrderProductsProps) => {
    console.log(order);
    return (
        <ul className="w-full rounded-md border">
            {order.products.map((item: ProductDetailProps) => (
                <li
                    key={item.product.id}
                    className=" w-full grid grid-cols-1 md:grid-cols-3 border-b p-4 gap-4 md:gap-0"
                >
                    <div>
                        <div className="flex items-center gap-4">
                            <div className="flex gap-4">
                                <div className="h-[95px] w-[80px] border p-[2px]">
                                    <div className="flex h-full w-full items-center justify-center bg-[#F9F5F2]">
                                        <Image
                                            src={
                                                item.product.images[0].imageUrl
                                            }
                                            alt={item.product.name}
                                            width={80}
                                            height={80}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Link href={`/product/${item.product.id}`}>
                                    <div className="text-sm font-normal text-slate-800 hover:text-main">
                                        {item.product.name}
                                    </div>
                                </Link>
                                <ProductPrice
                                    position={"start"}
                                    price={item.product.price}
                                    salePrice={item.product.compareAtPrice}
                                />
                                {item.color && (
                                    <div className="flex items-center gap-2">
                                        <div className="font-hind text-base font-bold">
                                            Color:
                                        </div>
                                        <div
                                            className="group relative h-4 w-4 rounded-full"
                                            style={{
                                                backgroundColor: item.color,
                                            }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="md:text-right">Qty: {item.quantity}</div>
                    </div>
                    <div className="md:text-right">
                        <TotalPrice
                            price={item.product.price}
                            compareAtPrice={item.product.compareAtPrice}
                            quantity={item.quantity!}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default OrderProducts;
