import Logo from "@/app/(dashboard)/_components/Logo";
import SidebarRoutes from "@/app/(dashboard)/_components/SidebarRoutes";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
    return (
        <div className="flex h-full flex-col overflow-y-auto border-r shadow-sm">
            <div className="p-6">
                <Link href="/">
                    <Logo />
                </Link>
            </div>
            <div className="mt-[8px] w-full">
                <SidebarRoutes />
            </div>
        </div>
    );
};

export default Sidebar;
