import type { Metadata } from "next";
import { Hind_Siliguri, Inter, Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "@/app/(landing)/_components/Navbar";
import Footer from "@/app/(landing)/_components/Footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import HolyLoader from "holy-loader";
import MobileNavbar from "@/app/(landing)/_components/MobileNavbar";
import { ReactQueryProvider } from "@/ultils/providers/ReactQuery";
import { Toaster } from "react-hot-toast";

const poppin = Poppins({
    subsets: ["latin"],
    weight: ["200", "400", "500", "600"],
    variable: "--font-poppins",
    display: "swap",
});

const hind = Hind_Siliguri({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-hind",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Mika Shop",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body className={`${poppin.variable} ${hind.variable}`}>
                    <Toaster position="top-center" />
                    <HolyLoader color="#AB8D7A" />
                    <Navbar />
                    <ReactQueryProvider>{children}</ReactQueryProvider>
                    <Footer />
                    <MobileNavbar />
                </body>
            </html>
        </SessionProvider>
    );
}
