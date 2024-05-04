"use client";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface ProductActionProps {
    disabled: boolean;
    productId: string;
    isPublished: boolean;
}

const ProductActions = ({
    productId,
    isPublished,
    disabled,
}: ProductActionProps) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    // const confetti = useConfettiStore()

    const onDelete = async () => {
        setIsLoading(true);
        try {
            await axios.delete(`/api/product/${productId}`);
            toast.success("Product deleted!");
            router.refresh();
            router.push(`/dashboard/products`);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }

    const onPublish = async () => {
        setIsLoading(true);
        try {
            if(isPublished) {
                await axios.patch(`/api/product/${productId}/unpublish`);
                toast.success("Product unpublished!");
            } else {
                await axios.patch(`/api/product/${productId}/publish`);
                toast.success("Product published!");
            }

            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onPublish}
                disabled={disabled || isLoading}
                variant={"outline"}
                size={"sm"}
            >
                {isPublished ? "Draft" : "Active"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size={"sm"} disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    );
};

export default ProductActions;
