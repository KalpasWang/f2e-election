import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider";
import { roboto } from "./fonts";

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
