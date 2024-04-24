import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React, { useState } from "react";

type MultiTextProps = {
    placeholder?: string;
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
};

const MultiText = ({
    placeholder,
    value,
    onChange,
    onRemove,
}: MultiTextProps) => {
    const [inputValue, setInputValue] = useState("");

    const addTag = (item: string) => {
        onChange(item);
        setInputValue("");
    };

    return (
        <div>
            <Input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        addTag(e.currentTarget.value);
                    }
                }}
            />
            <div className="mt-4 flex flex-row flex-wrap items-center gap-2">
                {value?.map((item) => (
                    <div key={item}>
                        <Badge className="bg-main text-white hover:bg-main">
                            {item}
                            <Button
                                className="ml-1 rounded-full p-0 outline-none hover:bg-main"
                                size={"sm"}
                                asChild
                                onClick={() => onRemove(item)}
                            >
                                <X className="h-3 w-3 cursor-pointer !bg-main" />
                            </Button>
                        </Badge>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiText;
