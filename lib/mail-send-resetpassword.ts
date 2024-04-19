import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "Mika Shop <mail@longxuong.com>",
        to: [email],
        subject: "Mika Shop Reset Your Password",
        html: `<p>For resetting your password, please click on the link below</p><p><a href="http://localhost:3000/new-password?token=${token}">Reset Password</a></p>`,
    });
};
