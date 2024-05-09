import { calculateDiscountPercentage } from "@/ultils/formats";
import React from "react";

type ProductDiscountPercentProps = {
    price: number;
    salePrice: number | null;
    className?: string | null;
};

const ProductDiscountPercent = ({
    price,
    salePrice,
    className
}: ProductDiscountPercentProps) => {
    if (!salePrice || salePrice <= 0) return null;
    return <div className={`bg-black text-[13px] w-[50px] h-7 text-white flex items-center justify-center font-semibold ${className}`}>-{calculateDiscountPercentage(price, salePrice).toFixed(0)}%</div>;
};

export default ProductDiscountPercent;
