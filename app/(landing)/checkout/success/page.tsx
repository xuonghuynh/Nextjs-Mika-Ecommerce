'use client';
import { Button } from "@/components/ui/button";
import { getServerCurrentUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { useCart } from "@/stores/useCart";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

const CheckoutSuccessPage = () => {
    const { clearCart } = useCart();
    useEffect(() => {
        clearCart();
    }, [clearCart])
    return (
        <div className="bg-slate-50 px-4">
            <div className="container flex items-center justify-center py-20 md:min-h-[calc(100vh-655px)]">
                <div className="flex md:w-[600px] flex-col items-center justify-center gap-6 rounded-lg border bg-white p-6 md:p-10">
                    <CheckCircle className="h-20 w-20 text-green-500" />
                    <div className="text-lg font-semibold">
                        Thank you for your order
                    </div>
                    <div className="text-center">
                        We&apos;ve accepted your order and we&apos;re getting it
                        ready. A confimation email has been sent to your email.
                    </div>
                    <div className="flex gap-4">
                        <Link href="/orders">
                            <Button className="rounded-full px-8 py-6">View Order</Button>
                        </Link>
                        <Link href="/">
                            <Button className="rounded-full px-8 py-6" variant={"primaryOrange"}>Continue Shopping</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccessPage;
