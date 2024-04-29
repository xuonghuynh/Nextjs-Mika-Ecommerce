import React from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

type AlertDialogProps = {
    id: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const AlertRemoveProduct = ({
    id,
    open,
    onOpenChange,
}: AlertDialogProps) => {

    const router = useRouter();

    const removeProduct = async (id: string) => {
        try {
            const result = await axios.delete(`/api/product/${id}`);
            if (result.status === 200) {
                router.refresh();
                onOpenChange(false);
                toast.success("Product deleted successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your product and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        className="mt-2"
                        onClick={() => {
                            removeProduct(id)
                        }}
                        variant={"destructive"}
                    >
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertRemoveProduct;
