import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useAuth from "./components/AuthContext";
import AuthNavbar from "./components/AuthNavbar"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PuzzleRender",
  description: "Generate Puzzle Books On The Go",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { isAuthenticated, loading } = useAuth();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-stone-200`}>
        {/* {isAuthenticated? <AuthNavbar /> : <Navbar />} */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
