import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Layout } from "@/components/layout";
import { TransactionsProvider } from "@/features/transactions/providers/transaction-provider";
import { Toaster } from "sonner";

import "../globals.css";
import "remixicon/fonts/remixicon.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Transações PIX",
  description: "Crie e gerencie suas transações PIX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="icon" href="/vercel.svg" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TransactionsProvider>
          <Layout>{children}</Layout>
          <Toaster richColors />
        </TransactionsProvider>
      </body>
    </html>
  );
}
