import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";

type ProductActionProps = {
    className?: string;
    productId: string;
}

const ProductAction = ({ className, productId }: ProductActionProps) => {
    const router = useRouter();
    return (
        <div className={`flex items-center gap-x-2 justify-center ${className}`}>
            <TooltipProvider delayDuration={300}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className="rounded-full h-8 w-8 md:h-10 md:w-10 p-0" variant={"primaryOrange"}>
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
                        <Button className="rounded-full h-8 w-8 md:h-10 md:w-10 p-0" variant={"primaryOrange"} onClick={() => router.push(`/product/${productId}`)}>
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
                        <Button className="rounded-full h-8 w-8 md:h-10 md:w-10 p-0" variant={"primaryOrange"}>
                            <Heart className="h-3 w-3 md:h-4 md:w-4" />
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
