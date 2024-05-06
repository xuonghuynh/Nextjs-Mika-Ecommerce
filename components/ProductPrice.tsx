import { formatPrice } from "@/ultils/formats";
import React from "react";

type ProductPriceProps = {
    price: number;
    salePrice?: number | null;
    className?: string | null;
};

const ProductPrice = ({ price, salePrice, className }: ProductPriceProps) => {
    return (
        <div className={`${className}`}>
            {salePrice && salePrice > 0 ? (
                <div className="flex items-center justify-center gap-x-2 ">
                    <div className="text-base font-semibold">
                        {formatPrice(salePrice)}
                    </div>
                    <div className="text-sm text-[#999] line-through">
                        {formatPrice(price)}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center gap-x-2 ">
                    <div className="text-base font-semibold">
                        {formatPrice(price)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPrice;
