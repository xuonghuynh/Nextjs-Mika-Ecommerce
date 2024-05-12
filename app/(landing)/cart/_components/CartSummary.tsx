"use client";
import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/stores/useCart";
import { formatPrice } from "@/ultils/formats";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const CartSummary = () => {
    const router = useRouter();
    const user = useCurrentUser();
    const { cartItems, orderInstruction, addOrderInstruction } = useCart();
    const [acceptTerms, setAcceptTerms] = React.useState(false);
    
    let totalPrice = 0;
    cartItems.forEach((product) => {
        if (product.compareAtPrice !== 0 && product.compareAtPrice !== null) {
            totalPrice += product.compareAtPrice * product.quantity;
        } else {
            totalPrice += product.price * product.quantity;
        }
    });

    const handleCheckout = async() => {
        try {
            if(!user) {
                toast.error('Please login first')
                return router.push('/login')
            }
            if(cartItems.length === 0) {
                toast.error('Cart is empty')
                return
            }
            const response = await axios.post("/api/checkout", {
                cartItems,
                orderInstruction,
                customer: user,
            })
            router.push(response.data.url)
            console.log(response)
        } catch (error) {
            console.log("CheckOut Error: ",error)
        }
    };

    return (
        <div className="relative">
            <div className="sticky right-0 top-0 bg-[#f8f8f8] p-8">
                <div className="font-hind text-base font-semibold">
                    Order summary
                </div>
                <div className="flex flex-col gap-5">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-sm font-normal text-header hover:no-underline">
                                Order special instructions
                            </AccordionTrigger>
                            <AccordionContent>
                                <Textarea
                                    className="w-full text-sm font-normal"
                                    rows={5}
                                    placeholder="Enter your order special instructions"
                                    value={orderInstruction}
                                    onChange={(e) =>
                                        addOrderInstruction(e.target.value)
                                    }
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="flex items-center justify-between">
                        <div className="text-base font-bold text-header">
                            Subtotal
                        </div>
                        <div className="text-base font-bold text-main">
                            {formatPrice(totalPrice)} USD
                        </div>
                    </div>
                    <div className="text-sm text-[#808080]">
                        Taxes and shipping calculated at checkout
                    </div>
                    <div className="mb-5">
                        <div className="flex items-start space-x-2">
                            <Checkbox
                                id="terms"
                                className="mt-1"
                                checked={acceptTerms}
                                onCheckedChange={() =>
                                    setAcceptTerms(!acceptTerms)
                                }
                            />
                            <label
                                htmlFor="terms"
                                className="cursor-pointer text-sm font-normal"
                            >
                                I have read and agree with the{" "}
                                <span className="cursor-pointer text-sm underline hover:text-main">
                                    terms & condition
                                </span>
                                .
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Button
                            disabled={!acceptTerms}
                            variant={"primaryOrange"}
                            onClick={() => handleCheckout()}
                            className="rounded-full px-20 py-6"
                        >
                            Check out
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
