import Link from "next/link";
import React from "react";

interface TableTitleProps {
    name: string;
    href?: string;
}

const TableTitle = ({ name, href }: TableTitleProps) => {
    return (
        <div>
            {href ? (
                <Link href={href}>
                    <h1 className="text-sm font-semibold text-slate-600 hover:text-[#2275fc] transition-all">
                        {name}
                    </h1>
                </Link>
            ) : (
                <h1 className="text-sm font-semibold text-slate-600">{name}</h1>
            )}
        </div>
    );
};

export default TableTitle;
