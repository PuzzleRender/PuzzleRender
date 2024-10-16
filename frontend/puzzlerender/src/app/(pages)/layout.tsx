import type { Metadata } from "next";
import localFont from "next/font/local";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "PuzzleRender",
  description: "Fun app for creating puzzlebooks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <div className="flex">
          <Sidebar />
          <div className="flex w-full flex-col">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
