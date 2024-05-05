import { getCollections } from "@/actions/get-collections";
import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import UserInfo from "@/components/UserInfo";
import React from "react";

const Navbar = async() => {
    const collections = await getCollections();
    return (
        <div className="border-b border-slate-200 h-[84px]">
            <div className="container flex items-center justify-between h-full px-8">
                <Logo />
                <Menu collections={collections} />
                <UserInfo />
            </div>
        </div>
    );
};

export default Navbar;
