import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DEFAULT_BUTTON } from "./const/style";
import { CornholeStoreProvider } from './providers/cornhole-store-provider'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cornholder",
  description: "Score keeper for cornhole",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen gap-3`}
      >
        <CornholeStoreProvider>
          <main className="grow">{children}</main>
          <footer className="sticky bottom-0 bg-background hidden" >
            <nav className="flex justify-between max-w-3xl px-4 mx-auto">
              <Link className={`${DEFAULT_BUTTON} whitespace-nowrap`} href="/setup">New Game</Link>
              <Link className={`${DEFAULT_BUTTON} whitespace-nowrap`} href="/standings">Standings</Link>
              <Link className={`${DEFAULT_BUTTON} whitespace-nowrap`} href="/championship">Championship</Link>
            </nav>
          </footer>
        </CornholeStoreProvider>
      </body>
    </html>
  );
}
