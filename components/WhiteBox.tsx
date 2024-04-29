import React from "react";

interface WhiteBoxProps {
    children: React.ReactNode;
}

const WhiteBoxWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full w-full rounded-lg bg-white p-6">{children}</div>
    );
};

export default WhiteBoxWrapper;
