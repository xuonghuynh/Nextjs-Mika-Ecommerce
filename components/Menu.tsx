"use client";
import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { menu } from "@/data/menu";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type MenuProps = {
    name: string;
    subMenu: any[];
    link: string;
    icon: LucideIcon;
};

const Menu = () => {
    const onNavChange = () =>{
        setTimeout(() => {
            // Select elements with the state "open"
            const triggers = document.querySelectorAll(
              '.submenu-trigger[data-state="open"]'
            );
            const dropdowns = document.querySelectorAll(
              '.nav-viewport[data-state="open"]'
            );
        
            // Check if both triggers and dropdowns are present
            if (!triggers.length || !dropdowns.length) return;
        
            // Simplify the calculation by extracting it into a variable
            const { offsetLeft, offsetWidth } = triggers[0] as HTMLElement;
            const menuWidth = dropdowns[0].children[0].clientWidth;
            const menuLeftPosition = offsetLeft + offsetWidth / 2 - menuWidth / 2;
        
            // Apply the calculated position
            document.documentElement.style.setProperty(
              "--menu-left-position",
              `${menuLeftPosition}px`
            );
          });
      }
    return (
        <div>
            <NavigationMenu onValueChange={onNavChange} className="border-l-0">
                <NavigationMenuList>
                    {menu.map((item: MenuProps) => (
                        <NavigationMenuItem key={item.name}>
                            {item.subMenu && item.subMenu.length > 0 ? (
                                <NavigationMenuTrigger className="submenu-trigger">
                                    <div className="text-base font-semibold hover:text-amber-900">
                                        {item.name}
                                    </div>
                                </NavigationMenuTrigger>
                            ) : (
                                <Link href={item.link} legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <div className="text-base font-semibold hover:text-amber-900">
                                            {item.name}
                                        </div>
                                    </NavigationMenuLink>
                                </Link>
                            )}
                            {item.subMenu && item.subMenu.length > 0 && (
                                <NavigationMenuContent>
                                    <ul className="px-4 py-4">
                                        {item.subMenu.map(
                                            (subItem: MenuProps, index) => (
                                                <Link
                                                    key={index}
                                                    href={subItem.link}
                                                    legacyBehavior
                                                    passHref
                                                >
                                                    <NavigationMenuLink
                                                        className={navigationMenuTriggerStyle()}
                                                    >
                                                        <span className="hover:text-amber-900">{subItem.name}</span>
                                                    </NavigationMenuLink>
                                                </Link>
                                            ),
                                        )}
                                    </ul>
                                </NavigationMenuContent>
                            )}
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default Menu;
