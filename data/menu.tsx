import { Home, ShoppingBag, User } from "lucide-react";

export const menu = [
    {
        name: "Home",
        link: "/",
        icon: Home,
        subMenu: []
    },
    {
        name: "Shop",
        link: "/shop",
        icon: ShoppingBag,
        subMenu: [
            {
                name: "All Products",
                link: "/all-products",
            },
            {
                name: "New Arrivals",
                link: "/shop",
            },
            {
                name: "Best Sellers",
                link: "/shop",
            }
        ]
    },
    {
        name: "About",
        link: "/about",
        icon: User,
        subMenu: []
    },
]