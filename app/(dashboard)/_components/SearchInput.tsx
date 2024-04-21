'use client';
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import qs from "query-string";

const SearchInput = () => {
    const [value, setValue] = React.useState("");
    const debouncedValue = useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId");
    
    useEffect(() => {
        const url = qs.stringifyUrl(
            {
                url: pathname,
                query: {
                    title: debouncedValue,
                    categoryId: currentCategoryId,
                },
            },
            { skipNull: true, skipEmptyString: true }
        );
        router.push(url);
    }, [debouncedValue, currentCategoryId, pathname, router]);

    return (
        <div className="relative">
            <Search className="absolute h-4 w-4 left-3 top-3 text-slate-600" />
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                type="search"
                placeholder="Search..."
            />
        </div>
    );
};

export default SearchInput;
