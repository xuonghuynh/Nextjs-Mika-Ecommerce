"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";


import { Account } from "@prisma/client";
import RowAction from "@/app/(dashboard)/dashboard/(routes)/collections/_components/RowAction";
import { formatDate } from "@/ultils/format-date";

type CollumnsProps = {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    password: string | null;
    role: "CUSTOMER" | "ADMIN";
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    accounts: Account[];
} 

export const CustomerColumns: ColumnDef<CollumnsProps>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div className="lowercase first-letter:capitalize">{row.original.role}</div>;
        }
    },
    {
        accessorKey: "emailVerified",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Verified
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const verifiedDate = row.original.emailVerified
            if(!verifiedDate) return <div>Not verified</div>
            const date = formatDate(verifiedDate)
            return <div>{date}</div>
        }
    },
    {
        accessorKey: "accounts",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Provider
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const provider = row.original.accounts[0]?.provider
            if(!provider) return <div>Email & Password</div>
            return <div className="capitalize">{provider}</div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;
            return <RowAction id={id} />
        },
    },
];
