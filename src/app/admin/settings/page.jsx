"use client";

import AdminGuard from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminComponents";
import { Settings, User, Bell, Shield, Wallet, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    // Simulate save
    setTimeout(() => {
      setLoading(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <AdminSidebar />
        <main className="lg:pl-72 pt-8 transition-all duration-300">
          <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <Settings className="w-8 h-8 text-gray-500" />
              Settings
            </h1>

            <div className="grid gap-8">
              
              {/* Profile Settings */}
               <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                    <User className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Profile Information</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                      <input 
                        defaultValue={session?.user?.name || "Admin User"}
                        className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                      <input 
                        defaultValue={session?.user?.email}
                        className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

               {/* Notifications */}
               <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                    <Bell className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Notifications</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Order Alerts</h3>
                      <p className="text-sm text-gray-500">Get notified when a new order is placed</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Low Stock Warning</h3>
                      <p className="text-sm text-gray-500">Alerts when product stock is below 10</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Payment Settings */}
               <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                   <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Payment Configuration</h2>
                </div>
                <div className="p-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                       <span className="font-semibold text-gray-900 dark:text-white">Cashfree Payments</span>
                       <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">ACTIVE</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Connected Account: {process.env.NEXT_PUBLIC_CASHFREE_MODE || 'Sandbox'}</p>
                    <button className="text-sm text-green-600 hover:text-green-500 font-medium">Manage Keys</button>
                  </div>
                </div>
              </div>

               <div className="flex justify-end pt-4">
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className={`flex items-center gap-2 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:shadow-lg transition-all active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <Save className="w-4 h-4" />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
               </div>

            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
