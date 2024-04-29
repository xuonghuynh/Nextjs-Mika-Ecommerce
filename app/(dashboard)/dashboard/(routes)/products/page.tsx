import { getProducts } from "@/actions/get-products";
import CreateButton from "@/app/(dashboard)/_components/CreateButton";
import { ProductColumns } from "@/app/(dashboard)/dashboard/(routes)/products/_components/ProductColumns";
import { ProductTable } from "@/app/(dashboard)/dashboard/(routes)/products/_components/ProductTable";
import WhiteBoxWrapper from "@/components/WhiteBox";
import React from "react";

const ProductPage = async () => {
    const products = await getProducts();

    console.log(products);

    return (
        <WhiteBoxWrapper>
            <CreateButton
                href="/dashboard/products/new-product"
                label="New Product"
            />
            <ProductTable data={products} columns={ProductColumns} />
        </WhiteBoxWrapper>
    );
};

export default ProductPage;
