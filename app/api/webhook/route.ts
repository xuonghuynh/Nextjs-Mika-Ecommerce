import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    return new NextResponse("ok");
}

export async function POST(request: Request) {
    const body = await request.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        console.log(error)
        return new NextResponse(`Webhook error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if(!session || !session.customer_details || !session.shipping_details || !session.shipping_details.address) {
        return new NextResponse("Missing session", { status: 400 })
    }

    if(event.type === "checkout.session.completed") {   
        const customerInfo = {
            id: session.client_reference_id,
            name: session.customer_details.name,
            email: session.customer_details.email
        }

        const shippingAddress = {
            addressLine1: session.shipping_details.address.line1,
            addressLine2: session.shipping_details.address.line2 || null,
            city: session.shipping_details.address.city,
            state: session.shipping_details.address.state,
            country: session.shipping_details.address.country,
            postalCode: session.shipping_details.address.postal_code
        }

        const retrieveSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ["line_items.data.price.product"]
        })

        const lineItems = await retrieveSession?.line_items?.data

        const orderItems = lineItems?.map((item: any) => {
            return {
                productId: item.price.product.metadata?.productId || null,
                color: item.price.product.metadata?.color || null,
                quantity: item.quantity,
            };
        });

        if(!shippingAddress || !orderItems) {
            return new NextResponse("Missing shipping address or order items", { status: 400 })
        }

        console.log(session)

        await db.order.create({
            data: {
                customerId: customerInfo.id,
                customerName: customerInfo.name,
                customerEmail: customerInfo.email,
                userId: customerInfo.id!,
                products: {
                    create: orderItems
                },
                shippingAddress: {
                    create: shippingAddress
                },
                paymentStatus: session.payment_status || null,
                status: "processing",
                shippingCost: session.shipping_cost?.amount_subtotal || 0,
                totalAmount: session.amount_total ? session.amount_total / 100 : 0,
                orderInstruction: session.metadata?.instruction || null
            }
        })
    } else {
        return new NextResponse(`Unhandled event type: ${event.type}`, { status: 200 })
    }
    return new NextResponse(null, { status: 200 })
}