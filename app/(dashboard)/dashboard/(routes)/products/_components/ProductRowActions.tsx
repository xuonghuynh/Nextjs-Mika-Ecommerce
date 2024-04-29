import React from "react";
import { Button } from "@nextui-org/button";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import AlertRemoveProduct from "@/app/(dashboard)/dashboard/(routes)/products/_components/AlertRemoveProduct";
import { useRouter } from "next/navigation";

type RowActionProps = {
    id: string;
};

const ProductRowActions = ({id}: RowActionProps) => {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const onShowDeleteDialog = () => {
        setOpen(true);
    };

    const onViewProduct = (id: string) => {
        router.push(`/dashboard/products/${id}`);
    }

    return (
        <div className="flex flex-nowrap items-center justify-end gap-x-2">
            <Button isIconOnly variant="light">
                <Eye className="h-5 w-5 text-[#2377FC]" />
            </Button>
            <Button onClick={() => console.log(onViewProduct(id))} isIconOnly variant="light">
                <PencilLine className="h-5 w-5 text-[#22C55E]" />
            </Button>
            <Button isIconOnly variant="light" onClick={() => onShowDeleteDialog()}>
                <Trash2 className="h-5 w-5 text-[#FF5200]" />
            </Button>
            <AlertRemoveProduct open={open} id={id} onOpenChange={setOpen} />
        </div>
    );
};

export default ProductRowActions;
