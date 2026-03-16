'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface OrderItem {
  id: number;
  menuItem: { name: string; price: number };
  quantity: number;
}

interface Order {
  id: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get('/orders').then(res => setOrders(res.data)).catch(() => {});
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-serif font-bold text-[#1D352F] mb-10">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[40px]">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-[#FDF8F0] p-8 rounded-[30px] flex justify-between items-center shadow-sm">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order #{order.id}</p>
                <p className="text-xl font-bold text-[#1D352F]">${order.totalPrice.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className={`px-6 py-2 rounded-full font-semibold text-sm ${
                  order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                  order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}