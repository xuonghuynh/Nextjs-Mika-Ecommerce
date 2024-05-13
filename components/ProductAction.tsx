"use client";
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Eye, Heart, HeartCrack, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product, ProductImage } from "@prisma/client";
import { useCart } from "@/stores/useCart";
import { useWishlist } from "@/stores/useWishList";
import { FaHeart } from "react-icons/fa";

type ProductActionProps = {
    className?: string;
    product: Product & { images: ProductImage[] };
};

const ProductAction = ({ className, product }: ProductActionProps) => {
    const router = useRouter();
    const { addToCart } = useCart();
    const { wishlistItems, addToWishList } = useWishlist();
    const isProductInWishlist = wishlistItems.some(
        (item) => item.id === product.id,
    );

    const handleAddToCart = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        product: Product & { images: ProductImage[]; quantity?: number },
    ) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        const data = {
            ...product,
            selectedColor: product.colors && product.colors[0],
            quantity: 1,
        };
        addToCart(data);
    };

    const handleAddToWishList = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        product: Product & { images: ProductImage[] },
    ) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        addToWishList(product);
    };

    return (
        <div
            className={`flex items-center justify-center gap-x-2 ${className}`}
        >
            <TooltipProvider delayDuration={300}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="h-8 w-8 rounded-full p-0 md:h-10 md:w-10"
                            variant={"primaryOrange"}
                            onClick={(e) => handleAddToCart(e, product)}
                        >
                            <ShoppingBag className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add to cart</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={300}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="h-8 w-8 rounded-full p-0 md:h-10 md:w-10"
                            variant={"primaryOrange"}
                            onClick={() =>
                                router.push(`/product/${product.id}`)
                            }
                        >
                            <Eye className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>View details</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={300}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="h-8 w-8 rounded-full p-0 md:h-10 md:w-10"
                            variant={"primaryOrange"}
                            onClick={(e) => handleAddToWishList(e, product)}
                        >
                            {isProductInWishlist ? (
                                <FaHeart
                                    className="text-primaryOrange h-3 w-3 md:h-4 md:w-4"
                                    key={product.id}
                                />
                            ) : (
                                <Heart
                                    key={product.id}
                                    className="h-3 w-3 md:h-4 md:w-4"
                                />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add to wishlist</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default ProductAction;
