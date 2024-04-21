import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getServerCurrentUser } from "@/lib/auth";
import React from "react";

const DashboardPage = async() => {
    // const session = useCurrentUser();
    const user = await getServerCurrentUser();
    console.log(user)
    return (
        <div className="p-6">
            {JSON.stringify(user)}
        </div>
    );
};

export default DashboardPage;
