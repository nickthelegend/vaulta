import type { Metadata } from "next";
import { Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@/src/lib/polyfill";
import { Providers } from "@/src/providers";

const archivo = Archivo_Black({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "400",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VAULTA | DeFi Savings",
  description: "Next-gen DeFi savings on YO Protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${jetbrains.variable} antialiased`}>
        <Providers>
          {/* Desktop Wrapper */}
          <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
            {/* Mobile Frame */}
            <div className="w-[390px] h-[844px] bg-[#F5F0E8] neo-border relative overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
