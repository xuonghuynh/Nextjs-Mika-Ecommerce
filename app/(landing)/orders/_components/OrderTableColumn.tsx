"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Account, Product } from "@prisma/client";
import RowAction from "@/app/(dashboard)/dashboard/(routes)/collections/_components/RowAction";
import { formatDate, formatPrice, formatServerDate } from "@/ultils/formats";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

type CollumnsProps = {
    id: string;
    paymentStatus: string;
    products: any;
    createdAt: string;
    status: string;
    totalAmount: number;
};

export const OrderColumns: ColumnDef<CollumnsProps>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <Link href={`/orders/${row.original.id}`} className="text-sm font-medium uppercase hover:text-main">
                    #{row.original.id}
                </Link>
            );
        },
    },
    {
        accessorKey: "products",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Products
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="flex gap-4">
                    <div className="relative h-[95px] w-[80px] border p-[2px]">
                        <div className="flex h-full w-full items-center justify-center bg-[#F9F5F2]">
                            <Image
                                src={
                                    row.original.products[0].product.images[0]
                                        .imageUrl
                                }
                                alt={row.original.products[0].product.name}
                                width={80}
                                height={80}
                            />
                        </div>
                        <span
                            className="absolute right-[-4px] top-[-4px] flex h-4 w-4 items-center justify-center rounded-full bg-main text-xs text-white"
                        >
                            {row.original.products.length}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Order Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = formatServerDate(row.original.createdAt)
            return (
                <Link href={`/orders/${row.original.id}`} className="text-sm font-medium uppercase hover:text-main">
                    {date}
                </Link>
            );
        },
    },
    {
        accessorKey: "paymentStatus",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Payment Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize">{row.original.paymentStatus}</div>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize">{row.original.status}</div>
            );
        },
    },
    {
        accessorKey: "totalAmount",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-transparent"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Total
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize">{formatPrice(row.original.totalAmount)}</div>
            );
        },
    },
];
