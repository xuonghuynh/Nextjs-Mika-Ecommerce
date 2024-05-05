import React from "react";
import { Collection, Product, ProductImage } from "@prisma/client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import Link from "next/link";

type ProductCollectionProps = {
    collection: Collection & {
        products: (Product & { images: ProductImage[] })[];
    };
};

const AllCollectionProduct = ({ collection }: ProductCollectionProps) => {
    const products = collection.products;
    if (products.length <= 0)
        return (
            <div className="mt-10 text-center text-sm italic">
                This collection has no products
            </div>
        );
    return (
        <div className="mt-6 grid grid-cols-3 gap-4">
            {products.map((product) => (
                <Link
                    href={`/product/${product.id}`}
                    key={product.id}
                    className="group"
                >
                    <Card
                        key={product.id}
                        className=" rounded-none border-none shadow-none"
                    >
                        <CardHeader className="relative h-[300px] bg-[#F9F5F2]">
                            <Image
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover:opacity-0"
                                alt="nextui logo"
                                height={500}
                                src={product.images[0].imageUrl}
                                width={500}
                            />
                            <Image
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100"
                                alt="nextui logo"
                                height={300}
                                src={product.images[1].imageUrl}
                                width={500}
                            />
                        </CardHeader>
                        <CardBody>
                            <div className="font-hind text-center font-normal transition-all group-hover:text-main">
                                {product.name}
                            </div>
                        </CardBody>
                        <CardFooter></CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export default AllCollectionProduct;
