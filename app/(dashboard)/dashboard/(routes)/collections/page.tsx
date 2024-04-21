import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const CollectionPage = () => {
    return (
        <div className="p-6">
            <Link href="/dashboard/collections/new-collection">
                <Button className="ml-auto bg-main">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Collection
                </Button>
            </Link>
        </div>
    );
};

export default CollectionPage;
