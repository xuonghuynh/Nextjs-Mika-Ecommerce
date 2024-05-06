import { getCollections } from "@/actions/get-collections";
import MobileSidebar from "@/app/(landing)/_components/MobileSidebar";
import Logo from "@/components/Logo";
import Menu from "@/app/(landing)/_components/Menu";
import ShoppingCartButton from "@/components/ShoppingCart";
import UserInfo from "@/components/UserInfo";
import React from "react";

const Navbar = async () => {
    const collections = await getCollections();
    return (
        <div className="h-[84px] border-b border-slate-200">
            <div className="= container hidden h-full items-center justify-between px-8 md:flex">
                <Logo />
                <Menu collections={collections} />
                <UserInfo />
            </div>
            <div className="= container flex h-full items-center justify-between px-4 md:hidden">
                <MobileSidebar />
                <Logo />
                <ShoppingCartButton />
            </div>
        </div>
    );
};

export default Navbar;
