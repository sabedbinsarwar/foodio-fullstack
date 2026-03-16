'use client';
import { useState } from 'react';
import Link from 'next/link';
import { UtensilsCrossed, ChefHat, CakeSlice, Timer, Flame, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FEATURED_ITEMS = [
  { id: 1, name: 'Tiramisu', category: 'Desserts', price: 15.00, image: '/tiramisu.png', desc: 'Authentic Italian coffee-flavored dessert with creamy mascarpone layers.' },
  { id: 2, name: 'Signature Crunch', category: 'Desserts', price: 18.00, image: '/crunch-squares.png', desc: 'Handcrafted chocolate squares with a satisfying honeycomb crunch.' },
  { id: 3, name: 'Pan-Seared Scallops', category: 'Main Courses', price: 28.00, image: '/scallops.png', desc: 'Jumbo scallops with cauliflower purée and truffle oil infusion.' },
  { id: 4, name: 'Golden Bites', category: 'Starters', price: 12.00, image: '/crunch-bites.png', desc: 'Crispy golden appetizers served with our secret spicy dipping sauce.' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('Desserts');

  return (
    <main className="bg-white min-h-screen pb-32 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 lg:pt-24 pb-32 flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-10 z-10 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-[#FDF8F0] text-[#1D352F] px-5 py-2.5 rounded-2xl text-xs font-black tracking-widest border border-orange-100/50 uppercase">
            <span className="text-lg">✨</span> Food Ordering Service
          </div>
          
          <h1 className="text-6xl lg:text-[90px] font-bold text-[#1D352F] leading-[0.95] tracking-tight">
            Where Great Food <br /> 
            <span className="text-gray-300 font-light italic">Meets</span> <br />
            Great Taste.
          </h1>
          
          <p className="text-gray-500 text-xl max-w-lg leading-relaxed mx-auto lg:mx-0">
            Experience a symphony of flavors crafted with passion. Premium ingredients, exquisite recipes, delivered to your door.
          </p>

    <div className="pt-6">
  <Link 
    href="/menu" 
    className="group relative inline-flex items-center gap-4 bg-[#8B5E3C] hover:bg-[#724d31] px-10 py-5 rounded-full shadow-2xl shadow-[#8B5E3C]/30 active:scale-95 transition-all duration-300 overflow-hidden"
  >
    {/* Main Text - Kept white for maximum contrast on the brown background */}
    <span className="relative z-10 text-white text-xl font-bold tracking-tight">
      View Menu
    </span>

    {/* Icon Container - Using a creamy-white translucent background */}
    <div className="bg-[#FDF8F0]/20 group-hover:bg-[#FDF8F0]/30 p-2 rounded-full relative z-10 transition-colors">
      <ArrowRight 
        size={22} 
        className="text-white group-hover:translate-x-1 transition-transform" 
        strokeWidth={2.5} 
      />
    </div>

    {/* Subtle Shine Effect - Optional: adds to the 'premium' feel */}
    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
  </Link>
</div>
        </motion.div>

        {/* Hero Image with Floating Badges */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 relative w-full flex justify-center lg:justify-end"
        >
          {/* Decorative Circle Background */}
          <div className="absolute top-1/2 left-1/2 lg:left-[65%] -translate-x-1/2 -translate-y-1/2 w-[450px] lg:w-[700px] h-[450px] lg:h-[700px] bg-[#FDF8F0] rounded-full -z-10"></div>
          
          <div className="relative">
            <img 
              src="/Pirates34.jpg" 
              alt="Signature Dish" 
              className="w-[400px] lg:w-[600px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] animate-float"
            />
            
            <Badge 
              icon={<Flame size={20} fill="currentColor" />} 
              label="Today's Offer" 
              value="Free Delivery" 
              color="bg-orange-100 text-orange-600" 
              position="top-10 -right-4" 
              delay={0.5}
            />
            
            <Badge 
              icon={<Timer size={20} />} 
              label="Avg. Delivery" 
              value="22 Minutes" 
              color="bg-green-100 text-[#1D352F]" 
              position="bottom-10 -left-10" 
              delay={0.7}
            />
          </div>
        </motion.div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-amber-600 font-bold uppercase tracking-widest text-xs">Categories</span>
            <h2 className="text-5xl font-bold text-[#1D352F] mt-2">Curated Menus</h2>
          </div>
          <p className="text-gray-400 max-w-xs text-sm">Explore our diverse selection of culinary delights from starters to desserts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <CategoryCard 
            icon={<UtensilsCrossed size={28}/>} 
            title="Starters" 
            isActive={activeTab === 'Starters'} 
            onClick={() => setActiveTab('Starters')}
          />
          <CategoryCard 
            icon={<ChefHat size={28}/>} 
            title="Main Courses" 
            isActive={activeTab === 'Main Courses'} 
            onClick={() => setActiveTab('Main Courses')}
          />
          <CategoryCard 
            icon={<CakeSlice size={28}/>} 
            title="Desserts" 
            isActive={activeTab === 'Desserts'} 
            onClick={() => setActiveTab('Desserts')}
          />
        </div>

        {/* DYNAMIC MENU GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-32">
          <AnimatePresence mode="wait">
            {FEATURED_ITEMS.filter(i => i.category === activeTab).map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-[#FAF9F6] rounded-[45px] mt-12 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 border border-gray-100"></div>
                <div className="relative p-6 pt-0 flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full -mt-10 mb-6 shadow-2xl border-[6px] border-white overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6" />
                  </div>
                  <div className="w-full px-2 text-center">
                    <h3 className="text-xl font-extrabold text-[#1D352F] mb-2">{item.name}</h3>
                    <p className="text-gray-400 text-xs mb-6 line-clamp-2 italic leading-relaxed">"{item.desc}"</p>
                    <div className="flex justify-between items-center bg-white p-2 pl-4 rounded-3xl shadow-inner">
                      <span className="text-xl font-black text-[#1D352F]">${item.price.toFixed(2)}</span>
                      <button className="bg-[#1D352F] text-white p-3 rounded-2xl hover:bg-black transition-all active:scale-90 shadow-lg">
                        <ShoppingCart size={18} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

function Badge({ icon, label, value, color, position, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute ${position} bg-white/95 backdrop-blur-md p-4 rounded-[24px] shadow-2xl flex items-center gap-4 border border-white/50 min-w-[210px] z-20`}
    >
      <div className={`${color} p-3 rounded-2xl`}>{icon}</div>
      <div>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">{label}</p>
        <p className="font-extrabold text-base text-[#1D352F]">{value}</p>
      </div>
    </motion.div>
  );
}

function CategoryCard({ icon, title, isActive, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`group cursor-pointer p-10 rounded-[48px] flex flex-col items-center gap-6 transition-all duration-500 border-2 ${isActive ? 'bg-[#1D352F] border-[#1D352F] shadow-2xl shadow-[#1D352F]/20 scale-105' : 'bg-white border-gray-50 hover:border-orange-100 hover:bg-[#FDF8F0]'}`}
    >
      <div className={`p-5 rounded-full transition-all duration-500 ${isActive ? 'bg-white/10 text-white rotate-[360deg]' : 'bg-gray-50 text-[#1D352F] group-hover:bg-[#1D352F] group-hover:text-white'}`}>
        {icon}
      </div>
      <h3 className={`text-xl font-bold transition-colors ${isActive ? 'text-white' : 'text-[#1D352F]'}`}>{title}</h3>
    </div>
  );
}