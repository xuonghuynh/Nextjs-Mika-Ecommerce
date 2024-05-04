import React from "react";
import { RadioGroup, Radio, useRadio, RadioProps } from "@nextui-org/radio";
import { cn } from "@/lib/utils";

const CustomRadio = (props: RadioProps) => {
    const { children, ...otherProps } = props;
    return (
        // <Radio
        //     {...otherProps}
        //     classNames={{
        //         control: "hidden",
        //         wrapper: "hidden",
        //         label: cn("inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
        //         "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
        //         "data-[selected=true]:border-primary"),
        //     }}
        // >
        //     {children}
        // </Radio>
        <Radio
            {...otherProps}
            classNames={{
                control: "hidden",
                wrapper: "hidden",
                labelWrapper: "ml-0",
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse max-w-[300px] cursor-pointer rounded-full gap-4 p-1 border-2 border-transparent",
                    "data-[selected=true]:border-primary",
                ),
            }}
        >
            {children}
        </Radio>
    );
};

export default CustomRadio;
