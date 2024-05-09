import { getProductsBySearch } from "@/actions/get-product-by-search";
import ProductsWrapper from "@/components/ProductsWrapper";
import SearchInput from "@/components/SearchInput";
import React from "react";

interface SearchPageProps {
    searchParams: { name: string };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
    console.log(searchParams);

    const products = await getProductsBySearch(searchParams);

    console.log(searchParams.name);

    const SearchTitle = () => {
        if (products.length > 0 && !searchParams.name) {
            return <span>Find our product</span>;
        } else if (products.length <= 0 && searchParams.name !== "") {
            return (
                <span>
                    Your search for `{searchParams.name}` did not yield any
                    results.
                </span>
            );
        } else {
            return (
                <span>
                    Your search for `{searchParams.name}` revealed the
                    following:
                </span>
            );
        }
    };
    return (
        <div className="container md:min-h-[calc(100vh-735px)]">
            <div className="mb-5 mt-20 text-center text-2xl font-bold ">
                <SearchTitle />
            </div>
            <div className="mb-20 flex items-center justify-center">
                <SearchInput />
            </div>
            <div className="mb-20">
                <ProductsWrapper products={products} />
            </div>
        </div>
    );
};

export default SearchPage;
