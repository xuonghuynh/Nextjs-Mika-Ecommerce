import React from "react";
import { blogs } from "@/data/blogs";
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
        <div className="container py-20 max-w-[1200px]">
            <h1 className="text-center text-[40px] font-bold font-hind text-[#333]">Blog & events</h1>
            <div className="grid grid-cols-2 mt-10 gap-x-6 gap-y-20">
                {blogs.map((blog: BlogProps, index) => (
                    <Link href={blog.url} key={index}>
                        <div key={index}>
                            <div className="relative">
                                <div className="absolute top-0 left-0">
                                    <div className="bg-main text-white px-7 h-[33px] flex items-center justify-center rounded-md w-[145px] text-[13px]">{blog.date}</div>
                                    <div className="bg-[#ebebeb] text-zinc-900 px-7 h-[33px] flex items-center justify-center rounded-md w-[145px] text-[13px] mt-2">{blog.author}</div>
                                </div>
                                <Image className="aspect-video ml-auto rounded-lg" src={blog.image} alt={blog.title} width={500} height={500} />
                                <div className="mt-5 text-xl font-hind font-semibold text-header hover:text-main cursor:pointer">{blog.title}</div>
                                <div className="text-description text-sm mt-3 md:pr-6">{blog.description}</div>
                                <Button className="mt-3 rounded-full px-10 py-5" variant={"borderPrimary"}>Read More</Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogAndEvent;
