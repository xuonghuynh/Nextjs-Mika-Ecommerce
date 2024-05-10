"use client";
import React, { useEffect } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/stores/useCart";
import ProductCartList from "@/components/ProductCartList";
import ProductCartFooter from "@/components/ProductCartFooter";

const ShoppingCartButton = () => {
    const [isMounted, setIsMounted] = React.useState(false);
    const [isOpenSheet, setIsOpenSheet] = React.useState(false);
    const { cartItems } = useCart();
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;

    const closeCart = () => {
        setIsOpenSheet(false);
    };

    return (
        <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
            <SheetTrigger className="relative hover:bg-transparent hover:text-amber-900">
                <ShoppingCart className="h-[22px] w-[22px]" />
                <span className="absolute left-3 top-[-4px] flex h-4 w-4 items-center justify-center rounded-full bg-main text-xs text-white">
                    {cartItems.length}
                </span>
            </SheetTrigger>
            <SheetContent side={"right"} className="py-8 max-w-[90%] w-[450px] md:max-w-4xl">
                <div className="mx-auto h-full max-w-[1140px]">
                    <SheetHeader className="h-full">
                        <div className="font-hind text-[18px] font-semibold text-[#333] border-b pb-4">
                            My shopping cart
                        </div>
                        <div className="h-full overflow-auto">
                            <ProductCartList closeCart={closeCart} />
                        </div>
                        <div>
                            <ProductCartFooter />
                        </div>
                    </SheetHeader>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ShoppingCartButton;
