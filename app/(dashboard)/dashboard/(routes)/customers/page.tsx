import { getCustomers } from "@/actions/get-customers";
import { CustomerColumns } from "@/app/(dashboard)/dashboard/(routes)/customers/_components/CustomerColunms";
import { CustomerTable } from "@/app/(dashboard)/dashboard/(routes)/customers/_components/CustomerTable";
import WhiteBoxWrapper from "@/components/WhiteBox";
import React from "react";

const CustomersPage = async () => {
    
    const allCustomer = await getCustomers()

    return (
        <WhiteBoxWrapper>
            <CustomerTable data={allCustomer} columns={CustomerColumns} />
        </WhiteBoxWrapper>
    );
};

export default CustomersPage;
