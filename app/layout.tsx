import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageContextProvider from "@/context/PageContext";
import VoltageContextProvider from "@/context/VoltageContext";
import BadgeContextProvider from "@/context/BadgeContext";
import { AuthProvider } from "./Providers";
import HeaderWrapper from "@/components/HeaderWrapper";
import AllUserContextProvider from "@/context/AllUserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SparkStep",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AllUserContextProvider>
            <BadgeContextProvider>
              <PageContextProvider>
                <VoltageContextProvider>
                  <HeaderWrapper /> {/* Use the client component */}
                  {children}
                </VoltageContextProvider>
              </PageContextProvider>
            </BadgeContextProvider>
          </AllUserContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
