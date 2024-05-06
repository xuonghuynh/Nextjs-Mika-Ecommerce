import React from "react";
import { Collection, Product, ProductImage } from "@prisma/client";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

type ProductCollectionProps = {
    collection: Collection & {
        products: (Product & { images: ProductImage[] })[];
    };
};

const AllCollectionProduct = ({ collection }: ProductCollectionProps) => {
    const products = collection.products;
    if (products.length <= 0)
        return (
            <div className="mt-10 text-center text-sm italic">
                This collection has no products
            </div>
        );
    return (
        <div className="mt-6 grid grid-cols-3 gap-4">
            {products.map((product) => (
                <Link
                    href={`/product/${product.id}`}
                    key={product.id}
                    className="group"
                >
                    <ProductCard product={product} />
                </Link>
            ))}
        </div>
    );
};

export default AllCollectionProduct;
