"use client";
import React, { useState } from "react";
import { Product, ProductImage } from "@prisma/client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import ProductAction from "@/components/ProductAction";
import ProductPrice from "@/components/ProductPrice";
import ProductDiscountPercent from "@/components/ProductDiscountPercent";
import ProductRating from "@/components/ProductRating";

type ProductCardProps = {
    product: Product & { images: ProductImage[] };
};

const ProductCard = ({ product }: ProductCardProps) => {
    const [rating, setRating] = useState(0);
    return (
        <Card
            key={product.id}
            className=" rounded-none border-none shadow-none"
        >
            <CardHeader className="relative h-[200px] md:h-[300px] bg-[#F9F5F2]">
                <ProductDiscountPercent className={"absolute top-0 right-0"} price={product.price} salePrice={product.compareAtPrice} />
                <Image
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:opacity-0"
                    alt="nextui logo"
                    height={250}
                    width={250}
                    src={product.images[0].imageUrl}
                />
                <Image
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100"
                    alt="nextui logo"
                    height={250}
                    width={250}
                    src={product.images[1].imageUrl}
                />
                <ProductAction
                    className="absolute bottom-2 md:bottom-5 left-1/2 z-[100] -translate-x-1/2 translate-y-0 md:opacity-0 transition-all duration-500 ease-in-out md:group-hover:translate-y-[-10px] md:group-hover:opacity-100"
                    productId={product.id}
                />
            </CardHeader>
            <CardBody>
                <div className="flex flex-col gap-y-2">
                    <ProductRating
                        className="m-auto"
                        value={rating}
                        onChange={setRating}
                    />
                    <div className="font-hind text-center font-normal transition-all group-hover:text-main">
                        {product.name}
                    </div>
                    <ProductPrice
                        className={"mt-[-5px]"}
                        price={product.price}
                        salePrice={product.compareAtPrice}
                    />
                </div>
            </CardBody>
            <CardFooter></CardFooter>
        </Card>
    );
};

export default ProductCard;
