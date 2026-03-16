'use client';
import { useCartStore } from '@/store/useCartStore';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items, getTotal, clearCart, addItem, removeItem, removeOne } = useCartStore() as any;
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const payload = {
        totalPrice: getTotal(),
      };

      await api.post('/orders', payload);
      clearCart();
      router.push('/orders');
    } catch (err) {
      router.push('/login');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDF8F0] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-[50px] shadow-2xl shadow-[#8B5E3C]/10 border border-[#F4EBD0] max-w-md w-full">
          <div className="bg-[#FDF8F0] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={40} className="text-[#8B7E66]/40" />
          </div>
          <h2 className="text-3xl font-black text-[#8B5E3C] mb-4 tracking-tight">Your basket is empty</h2>
          <p className="text-[#8B7E66] mb-10 font-medium">Looks like you haven't added any of our premium flavors yet.</p>
          <Link href="/menu" className="block w-full bg-[#8B5E3C] text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-[#8B5E3C]/30 hover:bg-[#724d31] transition-all active:scale-95">
            Browse Our Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDF8F0] min-h-screen pt-28 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header Area */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/menu" className="group flex items-center gap-2 text-[#8B7E66] font-bold hover:text-[#8B5E3C] transition-colors">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Menu
          </Link>
          <button onClick={clearCart} className="text-[#8B7E66]/60 hover:text-red-500 font-bold text-sm flex items-center gap-2 transition-colors">
            <Trash2 size={16} />
            Clear Basket
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Items List */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl font-black text-[#8B5E3C] tracking-tighter mb-8">Your Basket <span className="text-[#8B7E66]/40 font-light">({items.length})</span></h1>
            
            <AnimatePresence>
              {items.map((item: any) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-6 rounded-[35px] shadow-sm border border-white flex items-center gap-6 group hover:shadow-xl hover:shadow-[#8B5E3C]/5 transition-all"
                >
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-[#FDF8F0] group-hover:rotate-6 transition-transform" />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#8B5E3C]">{item.name}</h3>
                    <p className="text-[#8B7E66] text-sm font-medium mb-3">${item.price.toFixed(2)} / unit</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-[#FDF8F0] rounded-xl border border-[#F4EBD0] p-1">
                        <button onClick={() => removeOne(item.id)} className="w-8 h-8 flex items-center justify-center text-[#8B5E3C] hover:bg-white rounded-lg transition-colors">
                          <Minus size={14} strokeWidth={3} />
                        </button>
                        <span className="w-10 text-center font-black text-[#8B5E3C]">{item.quantity}</span>
                        <button onClick={() => addItem(item)} className="w-8 h-8 flex items-center justify-center text-[#8B5E3C] hover:bg-white rounded-lg transition-colors">
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-black text-[#8B5E3C] tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeItem(item.id)} className="mt-2 text-[#8B7E66]/40 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white p-10 rounded-[45px] shadow-2xl shadow-[#8B5E3C]/10 border border-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#8B5E3C]"></div>
              <h2 className="text-2xl font-black text-[#8B5E3C] mb-8 tracking-tight">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[#8B7E66] font-medium">
                  <span>Subtotal</span>
                  <span className="text-[#8B5E3C]">${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#8B7E66] font-medium">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                </div>
                <div className="border-t border-[#FDF8F0] pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-[#8B5E3C]">Total</span>
                  <span className="text-3xl font-black text-[#8B5E3C] tracking-tighter">${getTotal().toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-[#8B5E3C] hover:bg-black text-white py-6 rounded-[22px] font-bold text-xl shadow-xl shadow-[#8B5E3C]/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <CreditCard size={24} />
                Confirm & Pay
              </button>

              <div className="mt-6 flex items-center justify-center gap-4 opacity-30 grayscale">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}