import React from "react";
import { Collection, Product } from "@prisma/client";

type ProductCollectionProps = {
    collection: Collection & {
        products: Product[];
    };
};

const AllCollectionProduct = ({ collection }: ProductCollectionProps) => {
    const products = collection.products;
    if (products.length <= 0) return <div className="text-center italic mt-10 text-sm">This collection has no products</div>;
    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    {/* <ProductCard product={product} />
                     */}
                     {product.name}
                </div>
            ))}
        </div>
    )
};

export default AllCollectionProduct;
