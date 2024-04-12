import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const WishlistButton = () => {
    return (
        <Link href="/wishlist" className="relative hover:bg-transparent hover:text-amber-900">
            <Heart className="h-[22px] w-[22px]" />
            <span className="absolute top-[-4px] left-3 flex items-center justify-center h-4 w-4 text-xs rounded-full bg-amber-800 text-white">0</span>
        </Link>
    );
};

export default WishlistButton;
