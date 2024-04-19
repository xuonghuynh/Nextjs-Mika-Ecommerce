import { Button } from "@/components/ui/button";
import { getServerCurrentUser } from "@/lib/auth";
import { User, UserCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserButton = async() => {
    const currentUser = await getServerCurrentUser();
    return (
        <Link href="/login" className="hover:bg-transparent hover:text-amber-900 p-0">
            {currentUser ? <UserCheck className="h-[22px] w-[22px]" /> : <User className="h-[22px] w-[22px]" />}
            
        </Link>
    );
};

export default UserButton;
