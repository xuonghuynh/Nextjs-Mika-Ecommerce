import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/app/(dashboard)/_components/SideBar";

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="p-4 transition hover:opacity-75 md:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent side={"left"} className="bg-white p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
