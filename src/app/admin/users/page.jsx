"use client";

import AdminGuard from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminComponents";
import { Users, Mail, Phone, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <AdminSidebar />
        <main className="lg:pl-72 pt-8 transition-all duration-300">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-orange-500" />
              Customer Management
            </h1>
            
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Orders</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Spent</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Last Active</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {loading ? (
                       <tr><td colSpan="5" className="p-8 text-center text-gray-500">Loading customers...</td></tr>
                    ) : users.map((user) => (
                      <tr key={user.email} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 font-bold">
                              {user.name?.[0] || 'U'}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                              <div className="text-xs text-gray-500">ID: {user.email.split('@')[0]}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3" /> {user.email}
                            </div>
                            <div className="flex items-center gap-2">
                               <Phone className="w-3 h-3" /> {user.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            {user.totalOrders} Orders
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          ₹{user.totalSpent.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                           {new Date(user.lastActive).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
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
