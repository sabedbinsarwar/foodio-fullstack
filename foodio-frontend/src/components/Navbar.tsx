'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart, User, ArrowRight, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  
  const items = useCartStore((state: any) => state.items);
  const cartCount = items.reduce((acc: number, item: any) => acc + item.quantity, 0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setIsAdmin(role === 'ADMIN');
  }, [pathname]); // Re-check on route change to update UI after login

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex items-center justify-between px-8 lg:px-16 py-5 bg-white sticky top-0 z-50 transition-all border-b border-gray-50">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="bg-[#1D352F] p-2 rounded-xl transition-transform group-hover:scale-105">
           <UtensilLogo />
        </div>
        <span className="text-2xl font-bold text-[#1D352F] tracking-tight">Foodio.</span>
      </Link>
      
      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-2 text-[15px] font-medium text-gray-500">
        <Link 
          href="/" 
          className={`px-6 py-2 rounded-full transition-all ${isActive('/') ? 'border border-[#1D352F] text-[#1D352F]' : 'hover:text-[#1D352F] hover:bg-gray-50'}`}
        >
          Home
        </Link>
        <Link 
          href="/menu" 
          className={`px-6 py-2 rounded-full transition-all ${isActive('/menu') ? 'border border-[#1D352F] text-[#1D352F]' : 'hover:text-[#1D352F] hover:bg-gray-50'}`}
        >
          Food Menu
        </Link>
        
        {isLoggedIn && !isAdmin && (
          <Link 
            href="/orders" 
            className={`px-6 py-2 rounded-full transition-all ${isActive('/orders') ? 'border border-[#1D352F] text-[#1D352F]' : 'hover:text-[#1D352F] hover:bg-gray-50'}`}
          >
            My Orders
          </Link>
        )}

        {isAdmin && (
          <Link 
            href="/admin/menu" 
            className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${isActive('/admin/menu') ? 'bg-[#1D352F] text-white' : 'text-amber-600 hover:bg-amber-50'}`}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Cart Button */}
        <Link href="/cart" className="flex items-center gap-3 bg-[#FAF9F6] border border-gray-100 hover:bg-gray-100 px-5 py-2.5 rounded-full transition-all group">
          <div className="relative">
            <ShoppingCart size={19} className="text-[#1D352F]" />
          </div>
          <span className="font-bold text-[#1D352F] text-sm">{cartCount}</span>
        </Link>

        {isLoggedIn ? (
          <Link 
            href="/profile" 
            className={`p-2.5 rounded-full transition-all ${isActive('/profile') ? 'bg-[#1D352F] text-white shadow-md' : 'bg-gray-100 text-[#1D352F] hover:bg-gray-200'}`}
          >
            <User size={20} />
          </Link>
        ) : (
          <Link 
            href="/auth" 
            className="flex items-center gap-2 bg-[#1D352F] text-white px-7 py-2.5 rounded-full font-bold text-sm hover:bg-[#2a4d44] transition-all shadow-lg shadow-[#1D352F]/10"
          >
            Sign in
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </nav>
  );
};

const UtensilLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M17 2V12M17 12C17 14.2091 15.2091 16 13 16H11C8.79086 16 7 14.2091 7 12V2M12 2V16M12 22V16" 
      stroke="white" 
      strokeWidth="2.5" 
      strokeLinecap="round"
    />
  </svg>
);