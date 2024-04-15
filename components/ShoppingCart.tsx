"use client";
import React, { useEffect } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";
import EmptyCart from "@/components/EmptyCart";

const ShoppingCartButton = () => {
    const [isMounted, setIsMounted] = React.useState(false);
    const [isOpenSheet, setIsOpenSheet] = React.useState(false);
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
                    0
                </span>
            </SheetTrigger>
            <SheetContent side={"right"} className="py-10">
                <div className="mx-auto h-full max-w-[1140px]">
                    <SheetHeader className="h-full">
                        <SheetTitle className="border-b-[1px] pb-4">
                            <div className="font-hind text-[18px] font-semibold text-[#333]">
                                My shopping cart
                            </div>
                        </SheetTitle>
                        <SheetDescription className="h-full">
                            <EmptyCart closeCart={closeCart} />
                        </SheetDescription>
                    </SheetHeader>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ShoppingCartButton;
