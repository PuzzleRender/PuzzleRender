// app/layouts/MainLayout.tsx
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NoAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
