'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, Globe, ShieldCheck, Box, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function ShippingInfo() {
  const methods = [
    {
      name: "Standard Delivery",
      time: "5-7 Business Days",
      cost: "Free on orders over $50",
      icon: <Truck className="text-green-500" />
    },
    {
      name: "Expedited Shipping",
      time: "2-3 Business Days",
      cost: "$15.00 Flat Rate",
      icon: <Clock className="text-green-500" />
    },
    {
      name: "Global Priority",
      time: "7-14 Business Days",
      cost: "Calculated at checkout",
      icon: <Globe className="text-green-500" />
    }
  ];

  const features = [
    { title: "Real-time Tracking", desc: "Every shipment is monitored via our satellite tracking network.", icon: <Globe size={20} /> },
    { title: "Secure Packaging", desc: "Industrial-grade protection for all hardware and tech products.", icon: <ShieldCheck size={20} /> },
    { title: "Smart Routing", desc: "AI-optimized logistics for the fastest possible delivery path.", icon: <Box size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-zinc-950 border-b border-zinc-900 py-24 mt-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl opacity-20" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-500 text-xs font-black tracking-[0.2em] mb-4 uppercase font-sans">
            <Truck className="w-3 h-3" />
            Logistics Protocol
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-heading italic uppercase tracking-tighter">
            Shipping Information
          </h1>
          </motion.div>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Optimized deployment. Fast-tracked delivery. Global coverage. Explore our shipping parameters below.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {methods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 hover:border-green-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {method.icon}
              </div>
              <h3 className="text-xl font-heading font-black text-white uppercase italic tracking-tight mb-2">
                {method.name}
              </h3>
              <div className="text-sm font-bold text-green-500 mb-4">{method.time}</div>
              <p className="text-zinc-500 font-medium">{method.cost}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-900 pt-20">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-6">
              <div className="text-green-500 flex-shrink-0">{feature.icon}</div>
              <div>
                <h4 className="text-white font-bold uppercase tracking-tight mb-2 italic">{feature.title}</h4>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-32 text-center p-12 rounded-[3rem] bg-zinc-950 border border-zinc-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-50" />
          <h3 className="text-2xl font-heading font-black text-white uppercase italic mb-4 relative z-10">Need a Deployment Status?</h3>
          <p className="text-zinc-500 mb-8 max-w-md mx-auto relative z-10 font-medium">Track your current shipment through our global logistics terminal.</p>
          <Link href="/dashboard" className="relative z-10 inline-flex items-center gap-3 px-10 py-4 bg-green-600 hover:bg-green-500 text-black font-black uppercase tracking-tighter rounded-2xl transition-all shadow-xl shadow-green-600/20 active:scale-95">
             Access Tracking Terminal <RefreshCcw size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
