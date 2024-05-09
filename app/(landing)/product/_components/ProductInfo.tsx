import React from "react";
import ProductDiscountPercent from "@/components/ProductDiscountPercent";
import ProductPrice from "@/components/ProductPrice";
import { Product, ProductImage } from "@prisma/client";
import { generateHTML } from '@tiptap/html';
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Bold from '@tiptap/extension-bold'
import Text from '@tiptap/extension-text'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import parse from 'html-react-parser';

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
        BulletList
    ])
    return (
        <div className="flex flex-col gap-y-6">
            <div className="text-3xl font-bold">{product.name}</div>
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
                        <div className="text-sm">{product.stock} in stock</div>
                    ) : (
                        <div className="rounded-full bg-red-800 p-2 text-sm text-white">
                            Out of stock
                        </div>
                    )}
                </div>
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
            <div className="flex flex-col gap-2">
                <div className="font-hind text-base font-bold w-full">Descriptions:</div>
                <div className="description">{parse(description)}</div>
            </div>
        </div>
    );
};

export default ProductInfo;
