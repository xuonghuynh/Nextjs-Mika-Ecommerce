"use client";
import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import CardWarapper from "@/components/auth/CardWrapper";

const LoginPage = () => {
    return (
        <div className="flex min-h-[50vh] w-[40%] items-center justify-center py-20">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
