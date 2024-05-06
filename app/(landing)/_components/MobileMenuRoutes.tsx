import { getCollections } from "@/actions/get-collections";
import Link from "next/link";
import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

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
                link: `/collection/${collection.id}`,
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
                            <AccordionTrigger>{item.name}</AccordionTrigger>
                        ) : (
                            <AccordionTrigger hideArrow={true}>
                                <Link href={item.link}>{item.name}</Link>
                            </AccordionTrigger>
                        )}
                        {item.subMenu.length > 0 &&
                            item.subMenu.map((subItem) => (
                                <AccordionContent key={subItem.name}>
                                    <Link href={subItem.link}>
                                        {subItem.name}
                                    </Link>
                                </AccordionContent>
                            ))
                        }
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default MobileMenuRoutes;
