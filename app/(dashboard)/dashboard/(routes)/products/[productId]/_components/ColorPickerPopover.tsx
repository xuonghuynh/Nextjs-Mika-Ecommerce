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

const ColorPickerPopover = () => {
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("#000000");
    const handleOnChange = (color: any) => {
        console.log(color.hex);
        setColor(color.hex);
    };

    const handleSaveColor = () => {
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" side="top" sideOffset={5}>
                <ColorRadioPicker />
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
