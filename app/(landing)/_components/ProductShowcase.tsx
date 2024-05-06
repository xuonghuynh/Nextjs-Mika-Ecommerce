"use client";
import { productShowcase } from "@/data/static-data/product-showcase";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type productProps = {
    subtitle: string;
    title: string;
    description: string;
    image: string;
    url: string;
};

const animateVariants = (index: number) => ({
    initial: {
        opacity: 0,
        y: 100,
    },
    initialForRight: {
        opacity: 0,
        x: -100,
    },
    initialForLeft: {
        opacity: 0,
        x: 100,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.07 * index,
        },
    },
    slideDiv: {
        opacity: 1,
        x: 0,
    },
});

const ProductShowcase = () => {
    return (
        <section className="container px-5 md:py-20">
            <div>
                {productShowcase.map((product: productProps, index) => (
                    <div
                        key={index}
                        className={cn(
                            "md:flex py-12",
                            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                        )}
                    >
                        <div className="w-full md:w-1/2 ">
                            <div
                                // variants={animateVariants(index)}
                                // initial="initial"
                                // whileHover={{ scale: 1.05 }}
                                // whileInView={"animate"}
                                // viewport={{ once: true }}
                            >
                                <Image
                                    className={cn(
                                        "object-cover",
                                        index % 2 === 0 ? "ml-auto" : "mr-auto",
                                    )}
                                    src={product.image}
                                    alt={product.title}
                                    width={500}
                                    height={500}
                                />
                            </div>
                        </div>
                        <div
                            className={cn(
                                "flex w-full md:w-1/2 items-center md:px-20",
                                index % 2 === 0
                                    ? "justify-start"
                                    : "md:justify-end",
                            )}
                            // variants={animateVariants(index)}
                            // initial={
                            //     index % 2 === 0
                            //         ? "initialForLeft"
                            //         : "initialForRight"
                            // }
                            // whileInView={"slideDiv"}
                            // viewport={{ once: true }}
                        >
                            <div className="flex max-w-[350px] flex-col gap-y-3">
                                <div className="font-medium text-main mt-5 md:mt-0">
                                    {product.subtitle}
                                </div>
                                <div className="font-hind text-[40px] font-bold leading-[48px]">
                                    {product.title}
                                </div>
                                <div className="text-sm text-[#999]">
                                    {product.description}
                                </div>
                                <Link href={product.url}>
                                    <Button
                                        className="rounded-full px-10 py-6"
                                        variant={
                                            index % 2 === 0
                                                ? "primaryOrange"
                                                : "primary"
                                        }
                                    >
                                        Shop Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductShowcase;
