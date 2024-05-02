import { getProducts } from "@/actions/get-products";
import CreateButton from "@/app/(dashboard)/_components/CreateButton";
import { ProductColumns } from "@/app/(dashboard)/dashboard/(routes)/products/_components/ProductColumns";
import { ProductTable } from "@/app/(dashboard)/dashboard/(routes)/products/_components/ProductTable";
import Title from "@/components/Title";
import WhiteBoxWrapper from "@/components/WhiteBox";
import React from "react";

const ProductPage = async () => {
    const products = await getProducts();

    console.log(products);

    return (
        <div className="p-8">
            <Title name="Products" />
            <WhiteBoxWrapper>
                <ProductTable data={products} columns={ProductColumns} />
            </WhiteBoxWrapper>
        </div>
    );
};

export default ProductPage;
