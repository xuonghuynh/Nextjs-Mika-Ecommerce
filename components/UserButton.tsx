import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserButton = () => {
    return (
        <Link href="/login" className="hover:bg-transparent hover:text-amber-900 p-0">
            <User className="h-[22px] w-[22px]" />
        </Link>
    );
};

export default UserButton;
