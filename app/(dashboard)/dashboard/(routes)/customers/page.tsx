import { getCustomers } from "@/actions/get-customers";
import { CustomerColumns } from "@/app/(dashboard)/dashboard/(routes)/customers/_components/CustomerColunms";
import { CustomerTable } from "@/app/(dashboard)/dashboard/(routes)/customers/_components/CustomerTable";
import Title from "@/components/Title";
import WhiteBoxWrapper from "@/components/WhiteBox";
import React from "react";

const CustomersPage = async () => {
    const allCustomer = await getCustomers();

    return (
        <div className="p-8">
            <Title name="Customers" />
            <WhiteBoxWrapper>
                <CustomerTable data={allCustomer} columns={CustomerColumns} />
            </WhiteBoxWrapper>
        </div>
    );
};

export default CustomersPage;
