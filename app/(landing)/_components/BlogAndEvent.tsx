import React from "react";
import { blogs } from "@/data/static-data/blogs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type BlogProps = {
    title: string;
    description: string;
    image: string;
    date: string;
    url: string;
    author: string;
};

const BlogAndEvent = () => {
    return (
        <div className="container max-w-[1200px] py-20">
            <h1 className="font-hind text-center text-[40px] font-bold text-[#333]">
                Blog & events
            </h1>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-20">
                {blogs.map((blog: BlogProps, index) => (
                    <Link href={blog.url} key={index}>
                        <div key={index}>
                            <div className="relative">
                                <div className="absolute left-0 top-0">
                                    <div className="flex h-[33px] w-[145px] items-center justify-center rounded-md bg-main px-7 text-[13px] text-white">
                                        {blog.date}
                                    </div>
                                    <div className="mt-2 flex h-[33px] w-[145px] items-center justify-center rounded-md bg-[#ebebeb] px-7 text-[13px] text-zinc-900">
                                        {blog.author}
                                    </div>
                                </div>
                                <Image
                                    className="ml-auto aspect-video rounded-lg"
                                    src={blog.image}
                                    alt={blog.title}
                                    width={500}
                                    height={500}
                                />
                                <div className="font-hind cursor:pointer mt-5 text-xl font-semibold text-header hover:text-main">
                                    {blog.title}
                                </div>
                                <div className="mt-3 text-sm text-description md:pr-6">
                                    {blog.description}
                                </div>
                                <Button
                                    className="mt-3 rounded-full px-10 py-5"
                                    variant={"borderPrimary"}
                                >
                                    Read More
                                </Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogAndEvent;
