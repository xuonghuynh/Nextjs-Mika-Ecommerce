import ProductCard from "@/components/ProductCard";
import { Product, ProductImage } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface ImagesProps {
    images: ProductImage[];
}

type ProductProps = {
    products: (Product & { images: ProductImage[] })[];
};

type ProductWrapperProps = Product & { images: ProductImage[] }[];

const ProductsWrapper = ({ products }: ProductProps) => {
    
    if (!products) return null;

    if (products.length <= 0) return null;

    return (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
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

export default ProductsWrapper;
