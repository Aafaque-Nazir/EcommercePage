"use client";

import AdminGuard from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminComponents";
import { ShoppingBag, Search, Filter, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <ShoppingBag className="w-8 h-8 text-green-500" />
                  All Orders
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track all customer orders</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={fetchOrders}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Refresh
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                  Export CSV
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search order ID, customer name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2 items-center">
                <Filter className="w-4 h-4 text-gray-400" />
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="placed">Placed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Items</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {loading ? (
                      <tr><td colSpan="7" className="px-6 py-12 text-center text-gray-500">Loading data...</td></tr>
                    ) : filteredOrders.length === 0 ? (
                      <tr><td colSpan="7" className="px-6 py-12 text-center text-gray-500">No orders found matching your criteria.</td></tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{order.customerName}</span>
                              <span className="text-xs text-gray-500">{order.customerEmail}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {order.itemsCount} items
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                            ₹{order.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                             <select
                                value={order.status}
                                onChange={async (e) => {
                                  const newStatus = e.target.value;
                                  // Optimistic Update
                                  const oldOrders = [...orders];
                                  setOrders(orders.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
                                  
                                  const toastId = toast.loading("Updating status...");
                                  try {
                                    const res = await fetch("/api/admin/orders", {
                                        method: "PATCH",
                                        headers: {"Content-Type": "application/json"},
                                        body: JSON.stringify({ orderId: order.id, status: newStatus })
                                    });
                                    if(res.ok) {
                                        toast.success("Order updated", { id: toastId });
                                    } else {
                                        throw new Error("Failed");
                                    }
                                  } catch (err) {
                                    toast.error("Update failed", { id: toastId });
                                    setOrders(oldOrders); // Revert
                                  }
                                }}
                                className={`
                                  cursor-pointer outline-none font-medium text-xs rounded-full px-4 py-1.5 text-center border-2 border-transparent hover:border-black/10 dark:hover:border-white/20 transition-all
                                  ${statusStyles[order.status] || statusStyles.pending}
                                  focus:ring-2 focus:ring-offset-2
                                `}
                             >
                                <option value="pending" className="bg-white text-gray-900">Pending</option>
                                <option value="placed" className="bg-white text-gray-900">Placed</option>
                                <option value="shipped" className="bg-white text-gray-900">Shipped</option>
                                <option value="delivered" className="bg-white text-gray-900">Delivered</option>
                                <option value="cancelled" className="bg-white text-gray-900">Cancelled</option>
                             </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                              <Eye className="w-5 h-5" />
                            </button>
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
