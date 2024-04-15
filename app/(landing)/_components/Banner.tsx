import BannerContent from "@/components/BannerContent";
import Image from "next/image";
import React from "react";

const Banner = () => {
    return (
        <section className="h-[900px] bg-[url('/banner.webp')] bg-cover bg-no-repeat bg-center">
            <BannerContent />
        </section>
    );
};

export default Banner;
