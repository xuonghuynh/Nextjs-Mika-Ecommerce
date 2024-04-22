import { CustomerColumns } from "@/app/(dashboard)/dashboard/(routes)/customers/_components/CustomerColunms";
import { CustomerTable } from "@/app/(dashboard)/dashboard/(routes)/customers/_components/CustomerTable";
import { db } from "@/lib/db";
import React from "react";

const CustomersPage = async () => {
    
    const allCustomer = await db.user.findMany({
        include: {
            accounts: true,
        }
    });

    console.log(allCustomer)

    return (
        <div>
            <CustomerTable data={allCustomer} columns={CustomerColumns} />
        </div>
    );
};

export default CustomersPage;
