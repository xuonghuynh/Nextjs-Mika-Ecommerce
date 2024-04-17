import React from "react";
import Image from "next/image";
import { brands } from "@/data/static-data/brands";

const InfinityBrandName = () => {
    return (
        <div className="container mb-14">
            <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <ul className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8">
                    {brands.map((brand, index) => (
                        <li key={index}>
                            <Image
                                src={brand.image}
                                width={198}
                                height={66}
                                alt="logo"
                            />
                        </li>
                    ))}
                </ul>
                <ul
                    className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8"
                    aria-hidden="true"
                >
                    {brands.map((brand, index) => (
                        <li key={index}>
                            <Image
                                src={brand.image}
                                width={198}
                                height={66}
                                alt="logo"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InfinityBrandName;
