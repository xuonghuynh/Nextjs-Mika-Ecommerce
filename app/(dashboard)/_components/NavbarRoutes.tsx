"use client";
import SearchInput from "@/app/(dashboard)/_components/SearchInput";
import UserButton from "@/app/(dashboard)/_components/UserButton";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const NavbarRoutes = () => {
    const pathname = usePathname();
    const isSearchPage = pathname === "/search";
    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="ml-auto flex gap-x-2">
                <div className="mr-10">
                    <UserButton />
                </div>
            </div>
        </>
    );
};

export default NavbarRoutes;
