"use client";
import React from "react";
import { Collection, Product, ProductImage } from "@prisma/client";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";

type ProductCollectionProps = {
    collection: Collection & {
        products: (Product & { images: ProductImage[] })[];
    };
    products: (Product & { images: ProductImage[] })[];
};

const AllCollectionProduct = () => {

    const { data: collection } = useQuery<ProductCollectionProps>({
        queryKey: ["collection"],
        staleTime: Infinity,
    });

    if (!collection) return null;

    const products = collection.products;

    if (products.length <= 0)
        return (
            <div className="mb-20 mt-20 text-center text-sm italic">
                This collection has no products
            </div>
        );

    return (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
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
