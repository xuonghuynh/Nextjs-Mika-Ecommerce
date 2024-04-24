import CreateButton from "@/app/(dashboard)/_components/CreateButton";
import React from "react";

const ProductPage = () => {
    return (
        <div className="p-6">
            <CreateButton
                href="/dashboard/products/new-product"
                label="New Product"
            />
        </div>
    );
};

export default ProductPage;
