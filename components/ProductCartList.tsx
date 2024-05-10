import React from "react";
import EmptyCart from "@/components/EmptyCart";
import { useCart } from "@/stores/useCart";
import { formatPrice } from "@/ultils/formats";
import Image from "next/image";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
import ProductPrice from "@/components/ProductPrice";
import NumberInput from "@/components/NumberInput";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type Props = {
    closeCart: () => void;
};

const ProductCartList = ({ closeCart }: Props) => {
    const { cartItems, removeCartItem } = useCart();
    console.log(cartItems);
    if (cartItems.length === 0)
        return <EmptyCart closeCart={() => closeCart()} />;
    return (
        <div>
            {cartItems.map((product) => (
                <div key={product.id}>
                    <div className="flex items-center justify-between gap-4 py-4">
                        <div className="flex gap-4">
                            <div className="flex h-[95px] w-[80px] items-center justify-center bg-[#F9F5F2]  ">
                                <Image
                                    src={product.images[0].imageUrl}
                                    alt={product.name}
                                    width={80}
                                    height={80}
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Link
                                    href={`/product/${product.id}`}
                                    onClick={() => closeCart()}
                                >
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

                                <div className="flex items-center gap-x-2">
                                    <NumberInput
                                        value={product.quantity!}
                                        onChange={() => {}}
                                    />
                                    <Button
                                        variant={"ghost"}
                                        onClick={() => removeCartItem(product)}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* <div>
                            <div className="text-lg font-semibold">
                                {item.quantity}
                            </div>
                        </div> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCartList;
