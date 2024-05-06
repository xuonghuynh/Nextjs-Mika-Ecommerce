import React from "react";
import { footerNavMenu } from "@/data/static-data/footer-nav";
import Link from "next/link";

const FooterNavbar = () => {
    return (
        <div className="mx-auto mb-6 mt-6 gap-x-10 gap-y-5 flex flex-row flex-wrap justify-center md:flex md:flex-row md:flex-nowrap">
            {footerNavMenu.map((menu, index) => (
                <Link key={index} href={menu.link}>
                    <div className="relative text-sm md:text-base text-white before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:origin-right before:scale-x-0 before:bg-white before:transition-transform before:duration-300 hover:before:origin-left hover:before:scale-x-100">
                        {menu.name}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default FooterNavbar;
