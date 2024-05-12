import CartSummary from "@/app/(landing)/cart/_components/CartSummary";
import ProductCartTable from "@/app/(landing)/cart/_components/ProductCartTable";
import React from "react";

const CartPage = () => {
    
    return (
        <div className="container py-20 md:min-h-[calc(100vh-655px)]">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                <div className="col-span-2">
                    <ProductCartTable />
                </div>
                <div>
                    <CartSummary />
                </div>
            </div>
        </div>
    );
};

export default CartPage;
