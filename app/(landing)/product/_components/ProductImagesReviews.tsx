"use client";
import { cn } from "@/lib/utils";
import { Product, ProductImage } from "@prisma/client";
import Image from "next/image";
import React from "react";

type ProductImagesProps = {
    product: (Product & { images: ProductImage[] }) | null;
};

const ProductImagesReviews = ({ product }: ProductImagesProps) => {
    const [mainImage, setMainImage] = React.useState(
        product?.images[0].imageUrl || "",
    );
    if (!product) return null;
    return (
        <div className="pr-20">
            <div className="flex h-[600px] items-center justify-center border border-slate-800/10 bg-[#F9F5F2] rounded-md">
                <Image
                    src={mainImage}
                    alt={product?.name}
                    width={400}
                    height={400}
                />
            </div>
            <div className="mt-2 grid grid-cols-4 gap-2">
                {product.images.map((image) => (
                    <div
                        key={image.id}
                        onClick={() => setMainImage(image.imageUrl)}
                        className={cn(
                            "cursor-pointer border border-slate-800/10 bg-[#F9F5F2] rounded-md",
                            image.imageUrl === mainImage
                                && "border-main"
                        )}
                    >
                        <Image
                            src={image.imageUrl}
                            alt={product?.name}
                            width={300}
                            height={300}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImagesReviews;
