'use client'
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import React from "react";

const DashboardPage = () => {
    const session = useCurrentUser();
    const onClick = () => {
        signOut()
    }
    return (
        <div>
            {JSON.stringify(session)}
            <button onClick={() => signOut()} >Sign out</button>
        </div>
    );
};

export default DashboardPage;
