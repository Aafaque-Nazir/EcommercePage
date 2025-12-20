'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, ShieldCheck, AlertCircle, ShoppingBag, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ReturnsExchanges() {
  const steps = [
    {
      title: "Initiate Return",
      desc: "Log in to your terminal and select 'Order History'. Securely flag the items you wish to return within 30 days of deployment.",
      icon: <RefreshCcw className="text-green-500" />
    },
    {
      title: "Secure Packaging",
      desc: "Repack the items in their original protective casing. Ensure all system components and documentation are included.",
      icon: <ShieldCheck className="text-green-500" />
    },
    {
      title: "Dispatch",
      desc: "Download and anchor the return label to your package. Drop it off at any authorized logistics waypoint.",
      icon: <ShoppingBag className="text-green-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-zinc-950 border-b border-zinc-900 py-24 mt-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl opacity-20" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-500 text-xs font-black tracking-[0.2em] mb-6 uppercase font-sans"
          >
            <RefreshCcw size={14} /> Restoration Protocol
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white italic tracking-tighter mb-6 uppercase">
            Returns<span className="text-green-500">_</span>Exchanges
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Hassle-free equipment replacement. 30-day window for all hardware returns. Follow the protocol below for restoration.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Step-by-Step Protocol */}
        <div className="grid gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative pl-16 py-4"
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-900 group-hover:bg-green-500/50 transition-colors" />
              <div className="absolute left-[-20px] top-6 w-10 h-10 rounded-xl bg-black border border-zinc-800 flex items-center justify-center group-hover:border-green-500 group-hover:text-green-500 transition-all z-10">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="text-green-500 opacity-50 group-hover:opacity-100 transition-opacity">
                  {step.icon}
                </div>
                <h3 className="text-xl font-heading font-black text-white uppercase italic tracking-tight italic">
                  {step.title}
                </h3>
              </div>
              <p className="text-zinc-500 font-medium leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Non-returnable Items */}
        <div className="mt-24 p-8 rounded-3xl bg-zinc-950 border border-zinc-900 border-l-4 border-l-red-600/50">
          <div className="flex gap-4">
            <AlertCircle className="text-red-600/50 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-tight italic">Exempted Gear</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Modified Equipment', 'Digital Systems', 'Custom Configured Gear', 'Opened Component Kits'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                    <XCircle size={14} className="text-red-600/30" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-16 text-center">
           <Link 
            href="/faq" 
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest group"
           >
              Query Support Database <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </div>
    </div>
  );
}
