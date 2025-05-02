import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@t-shirt-shop/shared/src/styles/globals.css";
import { Header, Footer } from "@t-shirt-shop/shared";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "T-Shirt Shop - Account",
  description: "Manage your account and orders.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
