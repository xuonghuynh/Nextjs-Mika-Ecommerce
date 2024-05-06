import MobileMenuRoutes from "@/app/(landing)/_components/MobileMenuRoutes";
import Logo from "@/components/Logo";
import React from "react";

const MobileMenu = () => {
    return (
        <div className="p-4">
            <Logo />
            <MobileMenuRoutes />
        </div>
    );
};

export default MobileMenu;
