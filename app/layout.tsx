import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageContextProvider from "@/context/PageContext";
import VoltageContextProvider from "@/context/VoltageContext";
import BadgeContextProvider from "@/context/BadgeContext";

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
      <body>
        <BadgeContextProvider>
          <PageContextProvider>
            <VoltageContextProvider>
              <Header />
              {children}
            </VoltageContextProvider>
          </PageContextProvider>
        </BadgeContextProvider>
      </body>
    </html>
  );
}
