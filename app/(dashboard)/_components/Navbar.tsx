import MobileSidebar from "@/app/(dashboard)/_components/MobileNavbar";
import NavbarRoutes from "@/app/(dashboard)/_components/NavbarRoutes";
import React from "react";

const Navbar = () => {
    return (
        <div className="flex h-full items-center border-b bg-white p-4 shadow-sm">
            <MobileSidebar />
            <NavbarRoutes />
        </div>
    );
};

export default Navbar;
