import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header-menu";
import { ThemeProvider } from "next-themes";
import MySessionProvider from "@/provider/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mateus Cassuque🐱‍👤😎",
  description: "Site Pessoal de Mateus Cassuque - Portifolios🐱‍👤",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MySessionProvider>
          <ThemeProvider
            defaultTheme="light"
            enableSystem
            attribute="class"
          // disableTransitionOnChange
          >

            <Header/>
            {children}

          </ThemeProvider>
        </MySessionProvider>
      </body>
    </html>
  );
}
