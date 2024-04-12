import SearchButton from "@/components/SearchButton";
import ShoppingCartButton from "@/components/ShoppingCart";
import UserButton from "@/components/UserButton";
import WishlistButton from "@/components/WishlistButton";
import React from "react";

const UserInfo = () => {
    return (
        <div className="flex justify-center items-center gap-5">
            <SearchButton />
            <UserButton />
            <WishlistButton />
            <ShoppingCartButton />
        </div>
    );
};

export default UserInfo;
