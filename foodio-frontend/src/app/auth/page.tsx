'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, MapPin, Loader2, ChevronRight, Info } from 'lucide-react';

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

  // Listener for the 'A' key shortcut mentioned in your footer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'a' && (e.target as HTMLElement).tagName !== 'INPUT') {
        router.push('/admin/menu');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

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
      alert(err.response?.data?.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF8F0] p-6 font-sans selection:bg-[#8B5E3C]/20">
      {/* Brand Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex items-center gap-3"
      >
        <div className="w-10 h-10 bg-[#8B5E3C] rounded-xl flex items-center justify-center shadow-lg shadow-[#8B5E3C]/20">
           <span className="text-white text-xl font-black">F</span>
        </div>
        <h1 className="text-3xl font-black text-[#8B5E3C] tracking-tighter">Foodio.</h1>
      </motion.div>

      {/* Main Auth Card */}
      <motion.div 
        layout
        className="bg-white p-10 rounded-[50px] shadow-2xl shadow-[#8B5E3C]/10 w-full max-w-lg border border-[#F4EBD0] relative overflow-hidden"
      >
        <div className="text-center mb-10">
           <p className="text-[#8B7E66] font-medium italic">Premium flavors, delivered.</p>
        </div>

        {/* Sliding Toggle Switch */}
        <div className="flex bg-[#FDF8F0] rounded-2xl p-1.5 mb-10 border border-[#F4EBD0] relative">
          <motion.div 
            className="absolute top-1.5 bottom-1.5 bg-white rounded-xl shadow-md z-0"
            initial={false}
            animate={{ 
              left: isLogin ? '6px' : '50%', 
              right: isLogin ? '50%' : '6px' 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button 
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3.5 rounded-xl text-sm font-black z-10 transition-colors ${isLogin ? 'text-[#8B5E3C]' : 'text-[#8B7E66]/60'}`}
          >
            Sign in
          </button>
          <button 
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3.5 rounded-xl text-sm font-black z-10 transition-colors ${!isLogin ? 'text-[#8B5E3C]' : 'text-[#8B7E66]/60'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleAction} className="space-y-6">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B5E3C]/60 ml-4">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8B7E66]/40 group-focus-within:text-[#8B5E3C] transition-colors" size={18} />
                  <input 
                    type="text" placeholder="John Doe" 
                    className="w-full bg-[#FDF8F0]/50 border-2 border-transparent px-14 py-4 rounded-2xl outline-none focus:border-[#8B5E3C]/20 focus:bg-white transition-all font-bold text-[#8B5E3C] placeholder:text-[#8B7E66]/30"
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B5E3C]/60 ml-4">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8B7E66]/40 group-focus-within:text-[#8B5E3C] transition-colors" size={18} />
              <input 
                type="email" placeholder="name@example.com" 
                className="w-full bg-[#FDF8F0]/50 border-2 border-transparent px-14 py-4 rounded-2xl outline-none focus:border-[#8B5E3C]/20 focus:bg-white transition-all font-bold text-[#8B5E3C] placeholder:text-[#8B7E66]/30"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B5E3C]/60 ml-4">Delivery Address</label>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8B7E66]/40 group-focus-within:text-[#8B5E3C] transition-colors" size={18} />
                  <input 
                    type="text" placeholder="e.g. House:23, Road:23, Dhaka" 
                    className="w-full bg-[#FDF8F0]/50 border-2 border-transparent px-14 py-4 rounded-2xl outline-none focus:border-[#8B5E3C]/20 focus:bg-white transition-all font-bold text-[#8B5E3C] placeholder:text-[#8B7E66]/30"
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B5E3C]/60 ml-4">Password</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8B7E66]/40 group-focus-within:text-[#8B5E3C] transition-colors" size={18} />
              <input 
                type="password" placeholder="••••••••"
                className="w-full bg-[#FDF8F0]/50 border-2 border-transparent px-14 py-4 rounded-2xl outline-none focus:border-[#8B5E3C]/20 focus:bg-white transition-all font-bold text-[#8B5E3C] placeholder:text-[#8B7E66]/30"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#8B5E3C] text-white py-5 rounded-[22px] font-black text-lg shadow-xl shadow-[#8B5E3C]/30 hover:bg-black transition-all disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-3 group"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'}
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Footer Instructions */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 text-[#8B7E66]/50 text-xs font-bold flex items-center gap-2"
      >
        <span className="w-5 h-5 rounded-full bg-white border border-[#F4EBD0] flex items-center justify-center shadow-sm">
          <Info size={12} className="text-[#8B5E3C]" />
        </span>
        Press <kbd className="bg-white px-2 py-0.5 rounded border border-[#F4EBD0] text-[#8B5E3C] mx-1 shadow-sm">A</kbd> to access the Admin Panel.
      </motion.p>
    </div>
  );
}