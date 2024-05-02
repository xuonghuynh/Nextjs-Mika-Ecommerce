import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
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

const AlertRemoveCollection = ({
    id,
    open,
    onOpenChange,
}: AlertDialogProps) => {

    const router = useRouter();

    const removeCollection = async (id: string) => {
        try {
            const result = await axios.delete(`/api/collection/${id}`);
            if (result.status === 200) {
                router.refresh();
                onOpenChange(false);
                toast.success("Collection deleted successfully");
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
                        delete your collection and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        className="mt-2"
                        onClick={() => {
                            removeCollection(id)
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

export default AlertRemoveCollection;
