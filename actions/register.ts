'use server'
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

 export const register = async(values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {   
        return { error: 'Invalid fields!' };
    }

    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcryptjs.hash(password, 10);

    // TODO: Add your own logic here to register the user

    const isExistingUser = await getUserByEmail(email)

    if(isExistingUser) {
        return { error: 'Email already exists!' };
    }

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    })
    
    return { success: 'Registered successfully' };
 }