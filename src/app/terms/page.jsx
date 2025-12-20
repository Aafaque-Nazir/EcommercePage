'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, Gavel, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TermsAndConditions() {
  const terms = [
    {
      title: "Agreement to Terms",
      content: "By accessing or using ShopEase, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our software or services."
    },
    {
      title: "User Accounts",
      content: "Users are responsible for maintaining the confidentiality of their account credentials. Any activity under your account is your sole responsibility. We reserve the right to terminate accounts that violate our security protocols."
    },
    {
      title: "Intellectual Property",
      content: "All content, features, and functionality on this platform are owned by ShopEase and are protected by international copyright, trademark, and other intellectual property laws."
    },
    {
      title: "Prohibited Uses",
      content: "You may not use our platform for any illegal purpose, to solicit others to perform illegal acts, or to violate any international or local regulations. Reverse engineering our code is strictly prohibited."
    },
    {
      title: "Limitation of Liability",
      content: "ShopEase shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or products."
    },
    {
      title: "Governing Law",
      content: "These terms shall be governed and construed in accordance with the laws of the jurisdiction in which ShopEase operates, without regard to its conflict of law provisions."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-zinc-950 border-b border-zinc-900 py-20 mt-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl opacity-20" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-500 text-xs font-black tracking-[0.2em] mb-6 uppercase font-sans"
          >
            <Gavel size={14} /> Legal Framework
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white italic tracking-tighter mb-6 uppercase">
            Terms<span className="text-green-500">_</span>Conditions
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
            Standard Operating Procedures for all ShopEase users.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-16">
          {terms.map((term, index) => (
            <motion.div
              key={term.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8"
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-green-500 to-transparent" />
              <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              
              <h2 className="text-xl font-heading font-bold text-white uppercase tracking-tight italic mb-4">
                {String(index + 1).padStart(2, '0')}. {term.title}
              </h2>
              <p className="text-zinc-500 leading-relaxed font-medium">
                {term.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Warning Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 p-8 rounded-3xl bg-zinc-950 border border-zinc-800 border-l-4 border-l-green-600"
        >
          <div className="flex gap-4">
            <AlertTriangle className="text-green-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-tight">System Termination</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-medium">
                Violation of these terms may result in immediate revocation of system access. We reserve the right to modify these parameters at any time without prior notification.
              </p>
              <div className="flex items-center gap-2 text-green-500 text-xs font-black uppercase tracking-widest">
                <CheckCircle size={14} /> System Verified & Authenticated
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back Link */}
        <div className="mt-16 text-center">
           <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest group"
           >
              Return to Base <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </div>
    </div>
  );
}
