import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/useCart";
import { formatPrice } from "@/ultils/formats";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import toast from "react-hot-toast";

const ProductCartFooter = () => {
    const router = useRouter();
    const user = useCurrentUser();
    const [acceptTerms, setAcceptTerms] = React.useState(false);
    const { cartItems, orderInstruction, addOrderInstruction } = useCart();

    if (cartItems.length === 0) {
        return null;
    }

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
        <div className="mt-10">
            <div className="mb-5">
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
            </div>
            <div className="mb-5 flex items-center justify-between">
                <div className="text-base font-bold text-header">Subtotal</div>
                <div className="text-base font-bold text-header">
                    {formatPrice(totalPrice)} USD
                </div>
            </div>
            <div className="mb-5">
                <div className="flex space-x-2">
                    <Checkbox
                        id="terms"
                        className="mt-1"
                        checked={acceptTerms}
                        onCheckedChange={() => setAcceptTerms(!acceptTerms)}
                    />
                    <label
                        htmlFor="terms"
                        className="cursor-pointer text-sm font-normal text-start"
                    >
                        I have read and agree with the{" "}
                        <span className="cursor-pointer text-sm underline hover:text-main">
                            terms & condition
                        </span>
                        .
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <Button
                    variant={"primaryOrange"}
                    className="rounded-full px-20 py-6"
                    onClick={() => router.push("/cart")}
                >
                    View Cart
                </Button>
                <Button
                    disabled={!acceptTerms}
                    onClick={() => handleCheckout()}
                    className="rounded-full px-20 py-6"
                >
                    Check out
                </Button>
            </div>
        </div>
    );
};

export default ProductCartFooter;
