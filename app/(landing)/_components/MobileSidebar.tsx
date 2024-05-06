''
import React from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MobileMenu from "@/app/(landing)/_components/MobileMenu";

const MobileSidebar = () => {
    // const [open, setOpen] = React.useState(false);
    
    return (
        <Sheet>
            <SheetTrigger className="p-0 transition hover:opacity-75 md:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent side={"left"} className="bg-white p-0">
                <MobileMenu />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
