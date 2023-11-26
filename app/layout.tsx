import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./provider";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "700"] });
export const mantouSans = localFont({
  src: "../MantouSans-Regular.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "台灣歷年總統 都幾?",
  description: "查詢台灣地區歷年總統的資料與數據",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
