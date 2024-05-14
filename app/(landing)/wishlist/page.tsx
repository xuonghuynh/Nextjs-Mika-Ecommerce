"use client";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { useWishlist } from "@/stores/useWishList";
import Link from "next/link";
import React from "react";

const WishlistPage = () => {
    const { wishlistItems } = useWishlist();
    return (
        <div className="container py-20 md:min-h-[calc(100vh-655px)]">
            <div className="flex items-center justify-center"><Title name="Your Wishlist" /></div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {wishlistItems.map((product) => (
                    <Link
                        href={`/product/${product.id}`}
                        key={product.id}
                        className="group"
                    >
                        <ProductCard product={product} key={product.id} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;
