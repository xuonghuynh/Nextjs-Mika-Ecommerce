import React from "react";
import { socialLinks } from "@/data/static-data/social-link";
import Link from "next/link";

const SocialLink = () => {
    return (
        <div className="mx-auto mt-6 flex gap-x-4">
            {socialLinks.map((link, index) => (
                <Link
                    className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white"
                    href={link.link}
                    key={index}
                >
                    <link.icon
                        className="text-zinc-900 hover:text-amber-900"
                        size={20}
                    />
                </Link>
            ))}
        </div>
    );
};

export default SocialLink;
