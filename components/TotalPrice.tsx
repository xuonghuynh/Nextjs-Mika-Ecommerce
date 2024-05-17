import { formatPrice } from "@/ultils/formats";
import React from "react";

type TotalPriceProps = {
    compareAtPrice?: number | null;
    price: number;
    quantity: number;
};

const TotalPrice = ({ compareAtPrice, price, quantity }: TotalPriceProps) => {
    return (
        <span>
            {compareAtPrice && compareAtPrice !== null && compareAtPrice > 0 ? (
                <div>
                    {formatPrice(compareAtPrice * quantity)}
                </div>
            ) : (
                <div>{formatPrice(price * quantity)}</div>
            )}
        </span>
    );
};

export default TotalPrice;
