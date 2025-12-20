'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Bell, Globe } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      icon: <Eye className="w-5 h-5 text-green-500" />,
      content: "We collect information that you provide directly to us, including name, email address, phone number, and shipping address when you make a purchase or create an account. We also automatically collect certain technical information such as IP address and device identifiers."
    },
    {
      title: "How We Use Your Data",
      icon: <Globe className="w-5 h-5 text-green-500" />,
      content: "Your data is used to process orders, maintain your account, improve our services, and communicate with you about updates or promotions. We use secure encryption protocols to ensure your data remains protected during processing."
    },
    {
      title: "Data Security",
      icon: <Lock className="w-5 h-5 text-green-500" />,
      content: "We implement industry-standard security measures to protect your personal information. This includes SSL encryption, secure server hosting, and regular security audits. Access to your personal data is strictly limited to authorized personnel."
    },
    {
      title: "Third-Party Sharing",
      icon: <Shield className="w-5 h-5 text-green-500" />,
      content: "We do not sell your personal information. We only share data with trusted third parties (like payment processors and shipping carriers) necessary to fulfill your orders and provide our services."
    },
    {
      title: "Your Rights",
      icon: <FileText className="w-5 h-5 text-green-500" />,
      content: "You have the right to access, correct, or delete your personal information at any time. You can manage your preferences through your account settings or by contacting our support team directly."
    },
    {
      title: "Policy Updates",
      icon: <Bell className="w-5 h-5 text-green-500" />,
      content: "We may update this policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the 'Last Updated' date."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-zinc-950 border-b border-zinc-900 py-20 mt-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-500 text-xs font-black tracking-[0.2em] mb-6 uppercase font-sans"
          >
            <Shield size={14} /> Security Protocol
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white italic tracking-tighter mb-6 uppercase">
            Privacy<span className="text-green-500">_</span>Policy
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
            Last Updated: December 19, 2025. Your data security is our primary directive.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid gap-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-green-500/50 transition-colors">
                  {section.icon}
                </div>
                <h2 className="text-xl font-heading font-bold text-white uppercase tracking-tight italic">
                  {section.title}
                </h2>
              </div>
              <div className="pl-14">
                <p className="text-zinc-500 leading-relaxed font-medium">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-center"
        >
          <h3 className="text-white font-bold mb-4">Have questions about your data?</h3>
          <p className="text-zinc-500 mb-8">Establish a secure connection with our legal department.</p>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-8 py-3 bg-white text-black font-black uppercase tracking-tighter rounded-xl hover:bg-green-500 transition-all active:scale-95"
          >
            Contact Legal Dept
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
