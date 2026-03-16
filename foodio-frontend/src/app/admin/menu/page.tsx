'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { useCartStore } from '@/store/useCartStore';
import { Search, ShoppingCart, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
  id: number;
  name: string;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  category: Category;
}

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCatName = searchParams.get('cat');

  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [activeCatId, setActiveCatId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  const addItem = useCartStore((state: any) => state.addItem);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [itemsRes, catsRes] = await Promise.all([
          api.get('/menu-items'),
          api.get('/categories')
        ]);
        
        setItems(itemsRes.data);
        setCategories(catsRes.data);

        if (initialCatName) {
          const matchedCat = catsRes.data.find(
            (c: Category) => c.name.toLowerCase() === initialCatName.toLowerCase()
          );
          if (matchedCat) setActiveCatId(matchedCat.id);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [initialCatName]);

  const filtered = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = !activeCatId || item.category?.id === activeCatId;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-[#FDF8F0] min-h-screen pb-24 font-sans selection:bg-[#8B5E3C]/20">
      {/* HERO SECTION - Roasted Brown Aesthetic */}
      <div className="bg-[#8B5E3C] text-white pt-24 pb-40 px-6 rounded-b-[80px] mb-[-80px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <span className="bg-white/10 backdrop-blur-md text-[#FDF8F0] px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8 inline-block border border-white/20">
            Premium Selection
          </span>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-none">
            Our <span className="italic font-light text-[#F4EBD0]">Curated</span> Menu
          </h1>
          <p className="text-[#F4EBD0]/80 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Discover a symphony of flavors crafted with passion. Premium ingredients, exquisite recipes, delivered to your door.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* FILTER & SEARCH BAR - Glassmorphism */}
        <div className="bg-white/70 backdrop-blur-xl p-5 rounded-[50px] shadow-2xl shadow-[#8B5E3C]/10 flex flex-col lg:flex-row gap-6 justify-between items-center mb-28 border border-white/50">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto px-2">
            <button 
              onClick={() => setActiveCatId(null)}
              className={`px-10 py-4 rounded-full text-sm font-black transition-all whitespace-nowrap tracking-wide ${
                !activeCatId 
                  ? 'bg-[#8B5E3C] text-white shadow-xl shadow-[#8B5E3C]/40 scale-105' 
                  : 'text-[#8B7E66] hover:text-[#8B5E3C] hover:bg-[#F4EBD0]/50'
              }`}
            >All Items</button>

            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setActiveCatId(cat.id)}
                className={`px-10 py-4 rounded-full text-sm font-black transition-all whitespace-nowrap tracking-wide ${
                  activeCatId === cat.id 
                    ? 'bg-[#8B5E3C] text-white shadow-xl shadow-[#8B5E3C]/40 scale-105' 
                    : 'text-[#8B7E66] hover:text-[#8B5E3C] hover:bg-[#F4EBD0]/50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-[400px] group">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-[#8B7E66]/50 group-focus-within:text-[#8B5E3C] transition-colors" size={22} />
            <input 
              type="text" 
              placeholder="Craving something specific?" 
              className="bg-[#FDF8F0]/80 border-2 border-transparent px-16 py-5 rounded-full w-full outline-none focus:border-[#8B5E3C]/20 focus:bg-white transition-all font-bold text-[#8B5E3C] placeholder:text-[#8B7E66]/40 shadow-inner"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* FOOD GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-36">
          <AnimatePresence mode='popLayout'>
            {filtered.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="relative group"
              >
                {/* Background Card */}
                <div className="absolute inset-0 bg-[#F4EBD0]/40 rounded-[55px] mt-20 shadow-sm group-hover:shadow-2xl group-hover:bg-white group-hover:-translate-y-4 transition-all duration-500 border border-white"></div>
                
                <div className="relative p-6 pt-0 flex flex-col items-center">
                  {/* Floating Food Image */}
                  <div className="relative w-52 h-52 -mt-16 mb-8">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover rounded-full shadow-[0_40px_80px_-20px_rgba(139,94,60,0.4)] border-[10px] border-white group-hover:rotate-[8deg] group-hover:scale-105 transition-all duration-700" 
                      alt={item.name} 
                    />
                    <button className="absolute top-6 right-2 bg-white/95 backdrop-blur-md p-3 rounded-full shadow-xl text-[#8B7E66]/30 hover:text-red-500 transition-all hover:scale-110">
                      <Heart size={20} fill="currentColor" strokeWidth={2.5} />
                    </button>
                  </div>

                  <div className="w-full text-center px-4">
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#8B5E3C]/60 mb-4 block">
                      {item.category?.name}
                    </span>
                    <h3 className="text-2xl font-black text-[#8B5E3C] mb-3 line-clamp-1 tracking-tight">{item.name}</h3>
                    <p className="text-[#8B7E66] text-sm mb-10 line-clamp-2 h-10 leading-relaxed italic font-medium">
                      "{item.description}"
                    </p>
                    
                    {/* Price & Action Box */}
                    <div className="flex justify-between items-center bg-white p-3 rounded-[32px] shadow-inner border border-[#F4EBD0]">
                      <div className="pl-4">
                        <span className="text-2xl font-black text-[#8B5E3C] tracking-tighter">${item.price.toFixed(2)}</span>
                      </div>
                      <button 
                        onClick={() => addItem(item)}
                        className="bg-[#8B5E3C] text-white w-14 h-14 rounded-[22px] flex items-center justify-center hover:bg-black transition-all shadow-lg active:scale-90"
                      >
                        <ShoppingCart size={24} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* EMPTY STATE */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-40">
            <div className="inline-block p-10 bg-white rounded-full mb-8 shadow-xl border border-[#FDF8F0]">
              <Search size={50} className="text-[#F4EBD0]" />
            </div>
            <h3 className="text-3xl font-black text-[#8B5E3C] mb-3">No matching dishes</h3>
            <p className="text-[#8B7E66] font-medium">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<MenuLoader />}>
      <MenuContent />
    </Suspense>
  );
}

function MenuLoader() {
  return (
    <div className="min-h-screen bg-[#FDF8F0] p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} className="animate-pulse flex flex-col items-center">
            <div className="w-48 h-48 bg-[#F4EBD0] rounded-full mb-10"></div>
            <div className="w-full h-48 bg-white/50 rounded-[50px]"></div>
          </div>
        ))}
      </div>
    </div>
  );
}