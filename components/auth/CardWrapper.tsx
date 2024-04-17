import React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SocialLogin from "@/components/auth/SocialLogin";

type CardWarapperProps = {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonLink: string;
    showSocialLogin?: boolean;
};

const CardWarapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonLink,
    showSocialLogin,
}: CardWarapperProps) => {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className="text-center">{headerLabel}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="flex justify-center flex-col items-center gap-4">
                <Link href={backButtonLink}>{backButtonLabel}</Link>
                {showSocialLogin && <SocialLogin />}
            </CardFooter>
        </Card>
    );
};

export default CardWarapper;
