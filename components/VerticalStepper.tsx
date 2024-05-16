"use client";
import { Check, CheckCircle } from "lucide-react";
import React from "react";
import { Steps } from "rsuite";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FcShipped, FcApproval, FcTodoList } from "react-icons/fc";
import "rsuite/dist/rsuite-no-reset.min.css";
import StepContent from "@/components/StepContent";
import Image from "next/image";
const styles = {
    width: "100%",
    display: "inline-table",
    verticalAlign: "top",
};

type StepperProps = {
    orderStatus: string;
};

const steps = [
    {
        title: "Order Placed",
        time: "11:00",
        icon: (
            <Image
                src="/icons/preparation.png"
                width={32}
                height={32}
                alt="check"
            />
        ),
    },
    {
        title: "Payment Confirmed",
        time: "11:00",
        icon: (
            <Image
                src="/icons/credit-card.png"
                width={32}
                height={32}
                alt="check"
            />
        ),
    },
    {
        title: "Order Processed",
        time: "11:00",
        icon: (
            <Image
                src="/icons/order-processed.png"
                width={32}
                height={32}
                alt="check"
            />
        ),
    },
    {
        title: "In Transit",
        time: "11:00",
        icon: (
            <Image
                src="/icons/delivery-truck.png"
                width={32}
                height={32}
                alt="check"
            />
        ),
    },
    {
        title: "Delivered",
        time: "11:00",
        icon: (
            <Image
                src="/icons/deliver.png"
                width={32}
                height={32}
                alt="check"
            />
        ),
    },
];

const VerticalStepper = ({ orderStatus }: StepperProps) => {
    const calculateCurrentStep = (status: string) => {
        console.log(status);
        switch (status) {
            case "pending":
                return 0;
            case "payment_confirmed":
                return 1;
            case "processing":
                return 2;
            case "shipping":
                return 3;
            case "delivered":
                return 4;
            default:
                return 0; // Or handle the default case differently
        }
    };
    return (
        <div>
            <Steps
                current={calculateCurrentStep(orderStatus)}
                vertical
                style={styles}
            >
                {steps.map((step, index) => (
                    <Steps.Item
                        title={
                            <StepContent
                                title={step.title}
                                time={step.time}
                                icon={step.icon}
                            />
                        }
                        icon={<Check className="h-3 w-3" />}
                        key={index}
                    />
                ))}
            </Steps>
        </div>
    );
};

export default VerticalStepper;
