"use client";
import SearchInput from "@/app/(dashboard)/_components/SearchInput";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
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
                <Button onClick={() => signOut()} size="sm" variant="ghost">
                    <LogOut className="mr-2 h-4 w-4" />
                    Exit
                </Button>
            </div>
        </>
    );
};

export default NavbarRoutes;
