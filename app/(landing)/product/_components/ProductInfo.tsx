"use client";
import React from "react";
import ProductDiscountPercent from "@/components/ProductDiscountPercent";
import ProductPrice from "@/components/ProductPrice";
import { Product, ProductImage } from "@prisma/client";
import { generateHTML } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Text from "@tiptap/extension-text";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import NumberInput from "@/components/NumberInput";
import ProductRating from "@/components/ProductRating";
import ReturnDialog from "@/app/(landing)/_components/ReturnDialog";

type ProductInfoProps = {
    product: (Product & { images: ProductImage[] }) | null;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
    if (!product) return null;
    const description = generateHTML(JSON.parse(product.description!), [
        Document,
        Paragraph,
        Text,
        Bold,
        ListItem,
        BulletList,
    ]);
    return (
        <div className="flex flex-col gap-y-6">
            <div className="text-3xl font-bold">{product.name}</div>
            <div><ProductRating value={0} onChange={() => null} /></div>
            <div className="flex items-center gap-2">
                <ProductPrice
                    price={product.price}
                    salePrice={product.compareAtPrice}
                    position="start"
                />
                <ProductDiscountPercent
                    className="bg-main"
                    price={product.price}
                    salePrice={product.compareAtPrice}
                />
            </div>
            <div className="flex items-center gap-2">
                <div className="font-hind text-base font-bold">
                    Availability:
                </div>
                <div>
                    {product.stock > 0 ? (
                        <div className="flex items-center gap-1">
                            <span className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                            </span>
                            <div className="text-sm">
                                {product.stock} in stock
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-full bg-red-800 p-2 text-sm text-white">
                            Out of stock
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="font-hind w-full text-base font-bold">
                    Descriptions:
                </div>
                <div className="description">{parse(description)}</div>
            </div>
            {product.colors.length > 0 && (
                <div className="flex items-center gap-2">
                    <div className="font-hind text-base font-bold">Colors:</div>
                    {product.colors.map((color, index) => (
                        <div
                            key={index}
                            className="group relative h-6 w-6 rounded-full"
                            style={{
                                backgroundColor: color,
                            }}
                        ></div>
                    ))}
                </div>
            )}
            <div className="flex items-center gap-x-4">
                <div className="font-hind text-base font-bold">Quantity:</div>
                <NumberInput value={1} onChange={() => {}} />
            </div>
            <div>
                <ReturnDialog />
            </div>
            <div className="flex items-center gap-4">
                <Button
                    className="rounded-full px-20 py-7"
                    variant="primaryOrange"
                >
                    <ShoppingBag className="mr-2 h-4 w-4" /> Add to cart
                </Button>
                <Button className="rounded-full px-20 py-7">
                    <Heart className="mr-2 h-4 w-4" />
                    Add Wishlist
                </Button>
            </div>
            <div className="text-sm">
                🚚 Item will be delivered on or before May 19 2024
            </div>
        </div>
    );
};

export default ProductInfo;
