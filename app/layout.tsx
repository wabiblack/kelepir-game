import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KELEPİR",
  description: "2002'de sıfırdan başlayan ikinci el ticaret oyunu",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
