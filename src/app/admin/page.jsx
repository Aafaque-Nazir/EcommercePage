"use client";

import AdminGuard from "@/components/admin/AdminGuard";
import { AdminSidebar, StatCard } from "@/components/admin/AdminComponents";
import { DollarSign, Package, ShoppingBag, Users, RefreshCw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    users: 0,
    products: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);

  // Fetch Stats
  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/stats");
      const data = await res.json();

      if (data.success) {
        setStats(data.stats);
        setRecentOrders(data.recentOrders);
        setSalesData(data.salesChart || []); // Use real chart data
      } else {
        toast.error("Failed to load dashboard data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Networking error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statusStyles = {
    placed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    shipped: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    pending: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <AdminSidebar />
        
        <main className="lg:pl-72 pt-8 transition-all duration-300">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time data from your store.</p>
              </div>
              <button onClick={fetchStats} className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total Revenue" 
                value={`₹${stats.revenue.toLocaleString()}`} 
                change="+100%" 
                trend="up" 
                icon={DollarSign} 
                color="green" 
              />
              <StatCard 
                title="Total Orders" 
                value={stats.orders} 
                change="Live" 
                trend="up" 
                icon={ShoppingBag} 
                color="blue" 
              />
              <StatCard 
                title="Total Products" 
                value={stats.products} 
                change="+4.3%" 
                trend="up" 
                icon={Package} 
                color="green" 
              />
              <StatCard 
                title="Active Users" 
                value={stats.users} 
                change="+5" 
                trend="up" 
                icon={Users} 
                color="orange" 
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Sales Chart */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Revenue Analytics</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.3} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dx={-10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem', color: '#F9FAFB' }}
                        itemStyle={{ color: '#F9FAFB' }}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Visitors Chart */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">User Activity</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.3} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dx={-10} />
                      <Tooltip 
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem', color: '#F9FAFB' }}
                      />
                      <Bar dataKey="visitors" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Orders</h3>
                <button className="text-sm text-green-600 dark:text-green-400 font-medium hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {loading ? (
                       <tr>
                         <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading orders...</td>
                       </tr>
                    ) : recentOrders.length === 0 ? (
                       <tr>
                         <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No orders found.</td>
                       </tr>
                    ) : (
                      recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{order.user}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{order.total}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[order.status] || statusStyles.pending}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
