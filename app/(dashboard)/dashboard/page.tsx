import Title from "@/components/Title";
import WhiteBoxWrapper from "@/components/WhiteBox";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getServerCurrentUser } from "@/lib/auth";
import React from "react";

const DashboardPage = async () => {
    // const session = useCurrentUser();
    const user = await getServerCurrentUser();
    console.log(user);
    return (
        <div className="p-8">
            <Title name="Dashboard" />
            <WhiteBoxWrapper>{JSON.stringify(user)}</WhiteBoxWrapper>
        </div>
    );
};

export default DashboardPage;
