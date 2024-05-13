import React from "react";

const LandingOrderDetails = ({ params }: { params: { orderId: string } }) => {
    return (
        <div className="container py-20 md:min-h-[calc(100vh-655px)]">
            <div></div>
            {params.orderId}
        </div>
    );
};

export default LandingOrderDetails;
