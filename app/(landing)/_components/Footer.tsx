import CopyRight from "@/components/CopyRight";
import FooterNavbar from "@/components/FooterNavbar";
import NewsLetterForm from "@/components/NewsLetterForm";
import SocialLink from "@/components/SocialLink";
import Divider from "@/components/ui/divider";
import React from "react";

const Footer = () => {
    return (
        <div className="py-24 bg-[url(/footer-image.webp)] bg-cover bg-center">
            <div className="container flex flex-col gap-y-5">
                <div className="text-white text-[40px] font-semibold text-center font-hind">Sign up to our newsletter list</div>
                <NewsLetterForm />
                <FooterNavbar />
                <Divider />
                <SocialLink />
                <CopyRight />
            </div>
        </div>
    );
};

export default Footer;
