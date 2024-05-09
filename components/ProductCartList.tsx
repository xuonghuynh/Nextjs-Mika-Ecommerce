import EmptyCart from "@/components/EmptyCart";
import { useCart } from "@/stores/useCart";
import { formatPrice } from "@/ultils/formats";
import Image from "next/image";
import React from "react";

type Props = {
    closeCart: () => void;
};

const ProductCartList = ({ closeCart }: Props) => {
    const { cartItems } = useCart();
    if(cartItems.length === 0) return <EmptyCart closeCart={() => closeCart()} />
    return (
        <div>
            {cartItems.map((item) => (
                <div key={item.id}>
                    <div className="flex items-center justify-between gap-4 py-4">
                        <div className="flex items-center gap-4">
                            <Image
                                src={item.images[0].imageUrl}
                                alt={item.name}
                                width={80}
                                height={80}
                            />
                            <div>
                                <div className="text-lg font-semibold">
                                    {item.name}
                                </div>
                                <div className="text-main">
                                    {formatPrice(item.price)}
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
