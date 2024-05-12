import { metadata } from "@/app/(dashboard)/layout";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
    try {
        const { cartItems, orderInstruction, customer } = await request.json();

        if (!cartItems || !customer) {
            return new NextResponse("Not enough data to checkout", {
                status: 400,
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            shipping_address_collection: { allowed_countries: ["US", "CA"] },
            shipping_options: [
                { shipping_rate: "shr_1PFCAhDn04Eq9LN73Ioag60r" },
                { shipping_rate: "shr_1PFCBJDn04Eq9LN7QDegvvYo" },
            ],
            line_items: cartItems.map((item: any) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: item.images.map((image: any) => image.imageUrl),
                        metadata: {
                            productId: item.id,
                            ...(item.selectedColor && {
                                color: item.selectedColor,
                            })
                        }
                    },
                    unit_amount: (item.compareAtPrice > 0 ? item.compareAtPrice : item.price) * 100,
                },
                quantity: item.quantity,
            })),
            client_reference_id: customer.id,
            success_url: `${process.env.PUBLIC_URL}/`,
            cancel_url: `${process.env.PUBLIC_URL}/cart`,
            metadata: {
                customer_id: customer.id,
                instruction: orderInstruction
            },
        });

        return NextResponse.json(session, { status: 200 });
    } catch (error) {
        console.log("[PRODUCT_CHECKOUT] Error: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
