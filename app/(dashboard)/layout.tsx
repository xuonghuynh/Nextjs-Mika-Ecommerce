import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { getServerCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DEFAULT_USER_LOGIN_REDIRECT } from "@/routes";
import Navbar from "@/app/(dashboard)/_components/Navbar";
import Sidebar from "@/app/(dashboard)/_components/SideBar";
import "@/app/globals.css";

export const metadata = {
    title: "Mika Dashboard",
    description: "Shop Dashboard",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const user = await getServerCurrentUser();
    if (!user || user.role !== "ADMIN") {
        redirect(DEFAULT_USER_LOGIN_REDIRECT);
    }
    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body>
                    <div className="h-full">
                        <div className="fixed inset-y-0 h-[80px] w-full md:pl-56">
                            <Navbar />
                        </div>
                        <div className="fixed inset-y-0 z-50 hidden h-full w-56 flex-col md:flex">
                            <Sidebar />
                        </div>
                        <div className="h-full pt-[80px] md:pl-56">
                            {children}
                        </div>
                    </div>
                </body>
            </html>
        </SessionProvider>
    );
}
