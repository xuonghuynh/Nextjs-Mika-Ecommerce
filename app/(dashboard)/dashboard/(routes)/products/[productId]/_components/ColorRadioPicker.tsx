import React from "react";
import { RadioGroup, Radio } from "@nextui-org/radio";
import CustomRadio from "@/app/(dashboard)/dashboard/(routes)/products/[productId]/_components/CustomRadio";
import { cn } from "@/lib/utils";



type ColorRadioPickerProps = {
    colors: string[];
    isTitle?: boolean;
    size?: string;
    onChange: (value: string) => void;
};



const ColorRadioPicker = ({colors, onChange, isTitle, size}: ColorRadioPickerProps) => {
    const handleValue = (value: string) => {
        onChange(value);
    }
    return (
        <RadioGroup label={isTitle ? "Select product color" : ""} orientation="horizontal" onChange={(value) => handleValue(value.target.value)}>
            <div className="flex flex-wrap gap-3">
                {colors.map((color, index) => (
                    <CustomRadio key={index} value={color}>
                        <div style={{ backgroundColor: color }} className={cn("w-8 h-8 rounded-full", size)}></div>
                    </CustomRadio>
                ))}
            </div>
        </RadioGroup>
    );
};

export default ColorRadioPicker;
