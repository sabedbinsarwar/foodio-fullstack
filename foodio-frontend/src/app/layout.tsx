'use client';
import { usePathname } from 'next/navigation';
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide standard Navbar on Admin and Auth pages
  const isHideNavbar = pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register';

  return (
    <html lang="en">
      <body className="bg-white text-[#1D352F]">
        {!isHideNavbar && <Navbar />}
        <main>{children}</main>
      </body>
    </html>
  );
}