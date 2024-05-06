import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const WishlistButton = ({ isMobileNavbar }: { isMobileNavbar?: boolean }) => {
    return (
        <Link
            href="/wishlist"
            className="relative hover:bg-transparent hover:text-amber-900"
        >
            {isMobileNavbar ? (
                <div className="flex flex-col items-center gap-1">
                    <Heart className="h-[18px] w-[18px]" />
                    <span className="text-xs font-medium uppercase">
                        Wishlist
                    </span>
                </div>
            ) : (
                <Heart className="h-[22px] w-[22px]" />
            )}

            <span className={cn("absolute left-3 top-[-4px] flex h-4 w-4 items-center justify-center rounded-full bg-main text-xs text-white", isMobileNavbar && "left-[29px]")}>
                0
            </span>
        </Link>
    );
};

export default WishlistButton;
