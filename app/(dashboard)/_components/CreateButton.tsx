import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

type CreateButtonProps = {
    label: string;
    href: string;
};

const CreateButton = ({ label, href }: CreateButtonProps) => {
    return (
        <Link href={href}>
            <Button className="ml-auto bg-main hover:bg-black transition-all duration-300">
                <PlusCircle className="mr-2 h-4 w-4" />
                {label}
            </Button>
        </Link>
    );
};

export default CreateButton;
