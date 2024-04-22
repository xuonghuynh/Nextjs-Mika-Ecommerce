"use client";
import { ClipboardList, LogOut } from "lucide-react";
import { getServerCurrentUser } from "@/lib/auth";
import { User, UserCheck } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import UserDropdownMenu from "@/components/UserDropdownMenu";

const UserButton = () => {
    const currentUser = useCurrentUser();
    return (
        <div className="flex items-center">
            {!currentUser ? (
            <Link
                href="/login"
                className="p-0 hover:bg-transparent hover:text-amber-900"
            >
                {currentUser ? (
                    <UserCheck className="h-[22px] w-[22px]" />
                ) : (
                    <User className="h-[22px] w-[22px]" />
                )}
            </Link>
            ): (
            <UserDropdownMenu />)} 
        </div>
    );
};

export default UserButton;
