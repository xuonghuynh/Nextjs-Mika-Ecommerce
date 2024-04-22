import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import AlertRemoveCollection from "@/app/(dashboard)/dashboard/(routes)/collections/_components/AlertRemoveCollection";

type RowActionProps = {
    id: string;
};

const RowAction = ({ id }: RowActionProps) => {
    const [open, setOpen] = React.useState(false);
    const onShowDeleteDialog = () => {
        setOpen(true);
    };
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="h-4 w-8 p-0">
                        <span className="sr-only">Open</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onShowDeleteDialog()}>
                        <div className="flex items-center w-full hover:cursor-pointer">
                            <Trash className="mr-2 h-4 w-4" />
                            <div className="w-full">Delete</div>
                        </div>
                    </DropdownMenuItem>
                    <Link  href={`/dashboard/collections/${id}`}>
                        <DropdownMenuItem className="hover:cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertRemoveCollection open={open} id={id} onOpenChange={setOpen} />
        </div>
    );
};

export default RowAction;
