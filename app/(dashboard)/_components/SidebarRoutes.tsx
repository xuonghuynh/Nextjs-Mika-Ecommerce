"use client";
import SidebarRouteItem from "@/app/(dashboard)/_components/SidebarRouteItem";
import { Boxes, Layout, Tag, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const routesMenu = [
    {
        lable: "Dashboard",
        href: "/dashboard",
        icon: Layout,
    },
    {
        lable: "Collection",
        href: "/dashboard/collections",
        icon: Boxes,
    },
    {
        lable: "Products",
        href: "/dashboard/products",
        icon: Tag,
    },
    {
        lable: "Customers",
        href: "/dashboard/customers",
        icon: Users,
    },
];

const SidebarRoutes = () => {
    return (
        <div className="flex w-full flex-col">
            {routesMenu.map((route) => {
                return (
                    <SidebarRouteItem
                        key={route.href}
                        lable={route.lable}
                        icon={route.icon}
                        href={route.href}
                    />
                );
            })}
        </div>
    );
};

export default SidebarRoutes;
