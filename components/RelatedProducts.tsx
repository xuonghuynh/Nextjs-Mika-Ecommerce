import { getRelatedProducts } from "@/actions/get-related-products";
import ProductCard from "@/components/ProductCard";
import React from "react";

const RelatedProducts = async() => {
    const relatedProducts = await getRelatedProducts();
    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <div className="text-main uppercase text-base mb-4">You may also like</div>
                <div className="text-[40px] font-semibold font-hind text-[#333]">Related Product</div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-10">
                {relatedProducts.map((product) => (
                    <div key={product.id} className="group">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
