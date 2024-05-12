"use client";
import React from "react";
import NumberInput from "@/components/NumberInput";
import ProductPrice from "@/components/ProductPrice";
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/useCart";
import { formatPrice } from "@/ultils/formats";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCartTable = () => {
    const { cartItems, removeCartItem, updateQuantity } = useCart();
    return (
        <table className="w-full table-fixed">
            <thead>
                <tr className="border-b">
                    <th className="p-4 pl-0 text-left">Product</th>
                    <th className="p-4 text-left">Quantity</th>
                    <th className="p-4 pr-0 text-right">Total</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.length === 0 && (
                    <tr>
                        <td colSpan={3} className="py-8 text-center italic">
                            No items in cart
                        </td>
                    </tr>
                )}
                {cartItems.map((product) => (
                    <tr key={product.id} className="border-b">
                        <td className="py-8 text-left">
                            <div className="flex items-center gap-4 py-4">
                                <div className="flex gap-4">
                                    <div className="h-[95px] w-[80px] border p-[2px]">
                                        <div className="flex h-full w-full items-center justify-center bg-[#F9F5F2]">
                                            <Image
                                                src={product.images[0].imageUrl}
                                                alt={product.name}
                                                width={80}
                                                height={80}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <Link href={`/product/${product.id}`}>
                                        <div className="text-sm font-normal text-slate-800 hover:text-main">
                                            {product.name}
                                        </div>
                                    </Link>
                                    <ProductPrice
                                        position={"start"}
                                        price={product.price}
                                        salePrice={product.compareAtPrice}
                                    />
                                    {product.selectedColor && (
                                        <div className="flex items-center gap-2">
                                            <div className="font-hind text-base font-bold">
                                                Color:
                                            </div>
                                            <div
                                                className="group relative h-4 w-4 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        product.selectedColor,
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </td>
                        <td className="py-8">
                            <div className="flex items-center gap-x-2">
                                <NumberInput
                                    value={product.quantity!}
                                    onChange={(value) =>
                                        updateQuantity(product, value)
                                    }
                                />
                                <Button
                                    variant={"ghost"}
                                    onClick={() => removeCartItem(product)}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                        </td>
                        <td className="py-8 text-right">
                            {product.compareAtPrice !== null &&
                            product.compareAtPrice > 0 ? (
                                <div>
                                    {formatPrice(
                                        product.compareAtPrice *
                                            product.quantity,
                                    )}
                                </div>
                            ) : (
                                <div>
                                    {formatPrice(
                                        product.price * product.quantity,
                                    )}
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductCartTable;
