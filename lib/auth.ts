import { auth } from "@/auth";

export const getServerCurrentUser = async () => {
    const session = await auth();
    return session?.user || null;
}

export const getServerUserRole = async () => {
    const session = await auth();
    return session?.user?.role || null;
}