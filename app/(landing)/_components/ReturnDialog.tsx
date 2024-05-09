import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const ReturnDialog = () => {
    return (
        <Dialog>
            <DialogTrigger className="hover:text-main text-base font-bold">Delivery & return</DialogTrigger>
            <DialogContent className="!rounded-none">
                <DialogHeader>
                    <DialogTitle>Delivery</DialogTitle>
                    <DialogDescription>
                        <ul>
                            <li>All orders shipped with UPS Express. </li>
                            <li>
                                Always free shipping for orders over US $250.
                            </li>
                            <li>
                                All orders are shipped with a UPS tracking
                                number.
                            </li>
                        </ul>
                    </DialogDescription>
                    <DialogTitle className="!mt-10">Returns</DialogTitle>
                    <DialogDescription>
                        <ul>
                            <li>
                                Items returned within 14 days of their original
                                shipment date in same as new condition will be
                                eligible for a full refund or store credit.
                            </li>
                            <li>
                                Refunds will be charged back to the original
                                form of payment used for purchase.
                            </li>
                            <li>
                                Customer is responsible for shipping charges
                                when making returns and shipping/handling fees
                                of original purchase is non-refundable.
                            </li>
                            <li>All sale items are final purchases.</li>
                        </ul>
                    </DialogDescription>
                    <DialogTitle className="!mt-10">Help</DialogTitle>
                    <DialogDescription>
                        <ul>
                            <li>
                                Give us a shout if you have any other questions
                                and/or concerns.
                            </li>
                            <li>Email: demo@gmail.com</li>
                            <li>Phone:+1 (23) 456 789</li>
                        </ul>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ReturnDialog;
