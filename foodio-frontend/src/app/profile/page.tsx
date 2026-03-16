'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface UserProfile {
  fullName: string;
  email: string;
  address: string;
  role: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // This expects a GET /auth/profile or /auth/me endpoint in your NestJS app
        const res = await api.get('/auth/profile');
        setUser(res.data);
      } catch (err) {
        console.error("Unauthorized access");
        router.push('/auth'); // Redirect to login if not authenticated
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1D352F]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1D352F] mb-8">Account Details</h1>
        
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-50">
            <div className="w-20 h-20 bg-[#F1F0EA] rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1D352F]">{user?.fullName}</h2>
              <span className="text-xs font-bold bg-[#1D352F] text-white px-3 py-1 rounded-full uppercase">
                {user?.role}
              </span>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
              <p className="text-[#1D352F] font-medium">{user?.email}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Delivery Address</p>
              <p className="text-[#1D352F] font-medium">{user?.address || 'No address provided'}</p>
            </div>
          </div>

          <button 
            onClick={() => {
              localStorage.clear();
              router.push('/auth');
            }}
            className="mt-10 w-full py-4 border-2 border-[#1D352F] text-[#1D352F] rounded-full font-bold hover:bg-[#1D352F] hover:text-white transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}