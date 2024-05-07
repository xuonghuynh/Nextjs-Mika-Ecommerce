import { getCollections } from "@/actions/get-collections";
import Link from "next/link";
import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { SheetClose } from "@/components/ui/sheet";

const MobileMenuRoutes = async () => {
    const collections = await getCollections();
    const menuItems = [
        {
            name: "Home",
            link: "/",
            subMenu: [],
        },
        {
            name: "Shop",
            link: "/shop",
            subMenu: collections.map((collection) => ({
                name: collection.name,
                link: `/collections/${collection.id}`,
            })),
        },
        {
            name: "About",
            link: "/about",
            subMenu: [],
        },
    ];
    return (
        <div className="mt-10">
            <Accordion type="single" collapsible className="w-full">
                {menuItems.map((item, index) => (
                    <AccordionItem key={index} value={item.name}>
                        {item.subMenu.length > 0 ? (
                            <AccordionTrigger className="w-full">
                                {item.name}
                            </AccordionTrigger>
                        ) : (
                            <AccordionTrigger className="" hideArrow={true}>
                                <SheetClose asChild>
                                    <Link
                                        className="flex w-full items-center justify-start"
                                        href={item.link}
                                    >
                                        {item.name}
                                    </Link>
                                </SheetClose>
                            </AccordionTrigger>
                        )}
                        {item.subMenu.length > 0 &&
                            item.subMenu.map((subItem) => (
                                <AccordionContent key={subItem.name}>
                                    <SheetClose asChild>
                                        <Link href={subItem.link}>
                                            {subItem.name}
                                        </Link>
                                    </SheetClose>
                                </AccordionContent>
                            ))}
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default MobileMenuRoutes;
