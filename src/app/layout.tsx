import type { Metadata } from "next";
import "./globals.css";
import style from "./layout.module.css";
import Header from "@/components/header";
import { Dongle as DongleFont } from "next/font/google";

const dongleFont = DongleFont({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata: Metadata = {
  title: "AUTO-FEEDBACK",
  description: "Service that solves problems more easily",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={dongleFont.className}>
        <Header />
        <div className={style.container}>{children}</div>
      </body>
    </html>
  );
}
