import React from "react";
import { RadioGroup, Radio } from "@nextui-org/radio";
import CustomRadio from "@/app/(dashboard)/dashboard/(routes)/products/[productId]/_components/CustomRadio";

const colors = ["#000000", "#83878A", "#F0EADE", "#D2E4F2", "#EEF5EE", "#0ea5e9", "#a855f7", "#f43f5e", "#16a34a", "#facc15"];

const ColorRadioPicker = () => {
    return (
        <RadioGroup label="Select product color" orientation="horizontal">
            <div className="flex flex-wrap gap-3">
                {colors.map((color, index) => (
                    <CustomRadio key={index} value={color}>
                        <div style={{ backgroundColor: color }} className="w-8 h-8 rounded-full"></div>
                    </CustomRadio>
                ))}
            </div>
        </RadioGroup>
    );
};

export default ColorRadioPicker;
