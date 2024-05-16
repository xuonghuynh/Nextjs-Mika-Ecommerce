import { formatDate, formatDateDDMM } from "@/ultils/formats";
import React from "react";
import { IconType } from "react-icons";

interface StepContentProps {
    title: string;
    time: string;
    icon: React.ReactNode;
}

const StepContent = ({ title, time, icon: Icon }: StepContentProps) => {
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                {Icon}
                <div>
                    <div className="text-sm">{title}</div>
                </div>
            </div>
            <div className="text-sm">{formatDateDDMM(new Date())} {time}</div>
        </div>
    );
};

export default StepContent;
