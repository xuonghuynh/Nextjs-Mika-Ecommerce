import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import React from "react";

type NumberInputProps = {
    value: number;
    onChange: (value: number) => void;
};

const NumberInput = ({ value, onChange }: NumberInputProps) => {
    const [quantity, setQuantity] = React.useState(value);

    const handleChange = (value: string) => {
        setQuantity(Number(value));
        onChange(Number(value));
    }

    const handleDecrease = () => {
        const newValue = quantity - 1;
        setQuantity(newValue);
        onChange(newValue);
    }

    const handleIncrease = () => {
        const newValue = quantity + 1;
        setQuantity(newValue);
        onChange(newValue);
    }

    return (
        <div className="relative flex max-w-[8rem] items-center">
            <Button
                type="button"
                onClick={handleDecrease}
                className="h-9 !rounded-l-lg !rounded-tr-none !rounded-br-none border !border-r-0 border-gray-300 bg-white p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
            >
                <Minus className="h-3 w-3 text-gray-900" />
            </Button>
            <Input
                type="text"
                id="quantity-input"
                onChange={(e) => handleChange(e.target.value)}
                value={quantity}
                className="block h-9 w-full !border-x-0 rounded-none border-gray-300 bg-white py-2.5 text-center text-sm text-gray-900 focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-0"
            />
            <Button
                type="button"
                onClick={handleIncrease}
                className="h-9 rounded-e-lg !rounded-tl-none !rounded-bl-none border !border-l-0 border-gray-300 bg-white p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
            >
                <Plus className="h-3 w-3 text-gray-900" />
            </Button>
        </div>
    );
};

export default NumberInput;
