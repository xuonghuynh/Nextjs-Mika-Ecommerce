import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const BannerContent = () => {
    return (
        <div className="container flex h-full flex-col items-start justify-center">
            <div className="max-w-[700px]">
                <div className="before:bg-main before:translate-[-50%] relative pl-[30px] text-lg md:text-2xl font-semibold before:absolute before:bottom-[50%] before:left-0 before:block before:h-[1px] before:w-[15px]">
                    Get up to 10% off
                </div>
                <div className="text-main mt-5 text-2xl md:text-[80px] font-semibold leading-none max-w-[200px] md:max-w-none">
                    Noise wireless headphones
                </div>
                <div className="mt-7 flex flex-col md:flex-row gap-3">
                    <Link
                        href="/shop"
                    >
                        <Button
                            className="rounded-full px-12 py-6"
                            variant={"primary"}
                        >
                            Shop Now
                        </Button>
                    </Link>
                    <Link href="/shop">
                        <Button
                            className="rounded-full px-8 py-6"
                            variant={"borderPrimary"}
                        >
                            Discover Now
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BannerContent;
