import { ReactNode } from "react";
import { Inter } from "next/font/google";

import Providers from "@global-libs/react-query";
import "./globals.css";
import { Toaster } from "@global-components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
