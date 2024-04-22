"use client";
import React from "react";
import { LayoutDashboard, UserCheck } from "lucide-react";
import { ClipboardList, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";

const UserDropdownMenu = () => {
    const user = useCurrentUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserCheck className="h-[22px] w-[22px] hover:text-main" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user?.role === "ADMIN" && (
                    <Link href="/dashboard">
                        <DropdownMenuItem>
                            <div className="flex cursor-pointer items-center">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </div>
                        </DropdownMenuItem>
                    </Link>
                )}

                <DropdownMenuItem>
                    <div
                        className="flex cursor-pointer items-center"
                        onClick={() => {}}
                    >
                        <ClipboardList className="mr-2 h-4 w-4" />
                        Profile
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div
                        className="flex cursor-pointer items-center"
                        onClick={() => signOut()}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdownMenu;
