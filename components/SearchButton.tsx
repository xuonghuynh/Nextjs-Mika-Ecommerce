"use client";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const SearchButton = ({isMobileNavbar}: {isMobileNavbar?: boolean}) => {
    const [isMounted, setIsMounted] = React.useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;
    return (
        <Sheet>
            <SheetTrigger className="p-0 hover:bg-transparent hover:text-amber-900">
                {isMobileNavbar ? (
                    <div className="flex flex-col items-center gap-1">
                        <Search className="h-[18px] w-[18px]" />
                        <span className="text-xs uppercase font-medium">
                            Search
                        </span>
                    </div>
                ) : <Search className="h-[22px] w-[22px]" />}
            </SheetTrigger>
            <SheetContent side={"top"} className="py-20">
                <div className="mx-auto max-w-[1140px]">
                    <SheetHeader>
                        <SheetTitle className="mb-5 text-center text-[28px]">
                            What are you looking for?
                        </SheetTitle>
                        <SheetDescription>
                            <div className="w-full md:flex md:items-center md:justify-center">
                                <div className="relative">
                                    <Input
                                        // value={value}
                                        // onChange={(e) => setValue(e.target.value)}
                                        className="w-full rounded-none pl-9 focus-visible:ring-transparent md:w-[700px]"
                                        type="search"
                                        placeholder="Find our product..."
                                    />
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
                                </div>
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default SearchButton;
