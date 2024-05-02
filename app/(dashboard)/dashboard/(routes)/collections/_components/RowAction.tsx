import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@nextui-org/button";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, PencilLine, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import AlertRemoveCollection from "@/app/(dashboard)/dashboard/(routes)/collections/_components/AlertRemoveCollection";
import { useRouter } from "next/navigation";

type RowActionProps = {
    id: string;
};

const RowAction = ({ id }: RowActionProps) => {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const onShowDeleteDialog = () => {
        setOpen(true);
    };

    const onViewProduct = (id: string) => {
        router.push(`/dashboard/collections/${id}`);
    }

    return (
        <div className="flex flex-nowrap items-center justify-end gap-x-2">
            <Button isIconOnly variant="light">
                <Eye className="h-5 w-5 text-[#2377FC]" />
            </Button>
            <Button onClick={() => onViewProduct(id)} isIconOnly variant="light">
                <PencilLine className="h-5 w-5 text-[#22C55E]" />
            </Button>
            <Button isIconOnly variant="light" onClick={() => onShowDeleteDialog()}>
                <Trash2 className="h-5 w-5 text-[#FF5200]" />
            </Button>
            <AlertRemoveCollection open={open} id={id} onOpenChange={setOpen} />
        </div>
    );
};

export default RowAction;
