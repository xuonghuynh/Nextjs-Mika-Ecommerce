import { db } from "@/lib/db"

export const getEmailByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        })
        return user
    } catch (error) {
        return null
    }
}

export const getEmailById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            }
        })
        return user
    } catch (error) {
        return null
    }
}