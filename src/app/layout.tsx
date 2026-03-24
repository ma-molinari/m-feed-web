import { ReactNode } from "react";
import { Inter } from "next/font/google";

import { Toaster } from "@global-components/ui/toaster";
import Providers from "@global-libs/react-query";
import "./globals.css";

// Next.js font loader requires string literal subsets (not template literals).
// eslint-disable-next-line @typescript-eslint/quotes -- next/font static analysis
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
