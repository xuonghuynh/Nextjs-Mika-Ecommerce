import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverArrow } from "@radix-ui/react-popover";
import { Plus } from "lucide-react";
import { useState } from "react";
import ColorRadioPicker from "@/app/(dashboard)/dashboard/(routes)/products/[productId]/_components/ColorRadioPicker";

type PickerProps = {
    onChange: (value: string) => void;
};

const ColorPickerPopover = ({onChange}: PickerProps) => {
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("#000000");
    const colors = ["#000000", "#83878A", "#F0EADE", "#D2E4F2", "#EEF5EE", "#0ea5e9", "#a855f7", "#f43f5e", "#16a34a", "#facc15"];
    const handleOnChange = (color: any) => {
        setColor(color);
    };

    const handleSaveColor = () => {
        onChange(color);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="h-9 w-9 p-0 rounded-full m-0">
                    <Plus className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" side="top" sideOffset={5}>
                <ColorRadioPicker colors={colors} onChange={handleOnChange} />
                <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => handleSaveColor()}
                >
                    Accept
                </Button>
                <PopoverArrow className="fill-white" />
            </PopoverContent>
        </Popover>
    );
};

export default ColorPickerPopover;
