import { getProductById } from "@/actions/get-product-by-id";
import ProductImagesReviews from "@/app/(landing)/product/_components/ProductImagesReviews";
import React from "react";
import ProductInfo from "@/app/(landing)/product/_components/ProductInfo";

const ProductDetails = async ({
    params,
}: {
    params: { productId: string };
}) => {
    const { productId } = params;
    const product = await getProductById(productId);
    return (
        <div className="container py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProductImagesReviews product={product} />
                <ProductInfo product={product} />
            </div>
        </div>
    );
};

export default ProductDetails;
