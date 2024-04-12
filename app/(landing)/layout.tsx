import type { Metadata } from "next";
import { Hind_Siliguri, Inter, Poppins } from "next/font/google";
import "../globals.css";

const poppin = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600"],
  variable: "--font-poppins",
  display: 'swap',
});

const hind = Hind_Siliguri({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppin.variable} ${hind.variable}`}>{children}</body>
    </html>
  );
}
