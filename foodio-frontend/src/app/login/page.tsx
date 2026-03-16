'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await api.post(endpoint, payload);
      
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('role', res.data.role);

      router.push(res.data.role === 'ADMIN' ? '/admin/menu' : '/menu');
    } catch (err: any) {
      alert(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {/* Logo Section */}
      <div className="mb-8 flex items-center gap-2">
        <div className="w-8 h-8 bg-[#1D352F] rounded-full flex items-center justify-center">
           <span className="text-white text-xs">F</span>
        </div>
        <h1 className="text-2xl font-bold text-[#1D352F]">Foodio.</h1>
      </div>

      {/* Auth Card */}
      <div className="bg-[#FAF9F6] p-8 rounded-[40px] shadow-sm w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
           <Image src="/logo.png" alt="Logo" width={40} height={40} className="mx-auto mb-2" />
           <p className="text-gray-500 text-sm italic">Premium flavors, delivered.</p>
        </div>

        {/* Toggle Switch */}
        <div className="flex bg-[#F1F0EA] rounded-full p-1 mb-8">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${isLogin ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
          >
            Sign in
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${!isLogin ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleAction} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-sm font-semibold ml-1">Full Name</label>
              <input 
                type="text" placeholder="John Doe" 
                className="w-full border-none bg-white p-4 rounded-2xl mt-1 focus:ring-2 focus:ring-[#1D352F] outline-none"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="text-sm font-semibold ml-1">Email</label>
            <input 
              type="email" placeholder="name@example.com" 
              className="w-full border-none bg-white p-4 rounded-2xl mt-1 focus:ring-2 focus:ring-[#1D352F] outline-none"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="text-sm font-semibold ml-1">Address</label>
              <input 
                type="text" placeholder="e.g. House:23, Road:23, Dhaka" 
                className="w-full border-none bg-white p-4 rounded-2xl mt-1 focus:ring-2 focus:ring-[#1D352F] outline-none"
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="text-sm font-semibold ml-1">Password</label>
            <input 
              type="password" 
              className="w-full border-none bg-white p-4 rounded-2xl mt-1 focus:ring-2 focus:ring-[#1D352F] outline-none"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#1D352F] text-white py-4 rounded-full font-bold mt-4 hover:bg-[#2a4a42] transition-colors"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>
      </div>

      {/* Footer Info */}
      <p className="mt-6 text-gray-400 text-xs flex items-center gap-1">
        <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">i</span>
        For accessing Admin Panel press A from your keyboard.
      </p>
    </div>
  );
}