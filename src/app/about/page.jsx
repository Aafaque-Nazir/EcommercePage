"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ShieldCheck,
  Truck,
  Leaf,
  RotateCcw,
  Star,
  Headphones,
  HeartHandshake,
  Factory,
  Package,
  Globe,
  Sparkles,
  Users,
  MapPin,
  Target,
  Rocket
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Happy customers", value: "120k+" },
    { label: "Products shipped", value: "1.8M" },
    { label: "Avg. rating", value: "4.8/5" },
    { label: "Countries served", value: "42" },
  ];

  const pillars = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-green-600" aria-hidden />,
      title: "Secure by Design",
      desc: "Bank-grade security with PCI-compliant checkout, encrypted payments, and proactive fraud protection systems.",
    },
    {
      icon: <Truck className="h-6 w-6 text-green-600" aria-hidden />,
      title: "Lightning Fast Delivery",
      desc: "Pan-India shipping with real‑time tracking and same‑day delivery options in major metropolitan areas.",
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-emerald-600" aria-hidden />,
      title: "Hassle-Free Returns",
      desc: "30-day return policy with no questions asked. Instant store credit or original payment refund.",
    },
    {
      icon: <Headphones className="h-6 w-6 text-green-500" aria-hidden />,
      title: "24/7 Human Support",
      desc: "Real people, real solutions. Reach our dedicated support team via chat, email, or phone anytime.",
    },
  ];

  const team = [
    { name: "Aafaque", role: "Founder & CEO", img: "/team/aafaque.jpg", fallback: "AF" },
    { name: "Ishita", role: "Head of Operations", img: "/team/ishita.jpg", fallback: "IS" },
    { name: "Raghav", role: "Lead Engineer", img: "/team/raghav.jpg", fallback: "RG" },
    { name: "Sara", role: "Customer Experience", img: "/team/sara.jpg", fallback: "SR" },
  ];

  const faqs = [
    {
      q: "What makes ShopEase different?",
      a: "We control the entire experience: from a strictly curated catalog to in-house quality assurance and logistics partnerships. This ensures every product meets our high standards.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes! We currently serve over 40 countries with priority international shipping. Customs and duties are calculated at checkout for transparency.",
    },
    {
      q: "How do I track my order?",
      a: "Once shipped, you'll receive a tracking link via email and SMS. You can also track your order in real-time from your account dashboard.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden selection:bg-green-500/30">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
        {/* Dynamic Background Mesh */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-green-600/10 rounded-full blur-[140px]" 
          />
          <motion.div 
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[140px]" 
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.04]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-12 lg:grid-cols-2 lg:items-center"
          >
            <div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-block py-2 px-4 rounded-full bg-white/5 border border-white/10 text-green-400 text-xs font-black tracking-[0.3em] mb-8 backdrop-blur-md font-sans uppercase"
              >
                ESTABLISHED 2022 // SYSTEM ACTIVATED
              </motion.div>
              
              <div className="overflow-hidden mb-6">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] font-heading italic uppercase"
                >
                  REDEFINING <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">E-COMMERCE.</span>
                </motion.h1>
              </div>

              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-10 max-w-lg font-medium"
              >
                We're a technology-first retail platform obsessed with precision, speed, and standardizing global commerce.
              </motion.p>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row flex-wrap items-center gap-4"
              >
                <Button size="lg" className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-green-500 hover:text-white font-black text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 group">
                  Our Journey <Rocket className="w-5 h-5 ml-2 group-hover:translate-y-[-2px] group-hover:translate-x-[2px] transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-black text-lg backdrop-blur-md transition-all duration-300 border-2 active:scale-95">
                  Meet the Minds
                </Button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="relative h-[400px] lg:h-[600px] w-full"
            >
              <div className="absolute inset-0 bg-green-500/20 rounded-[3rem] transform rotate-3 scale-95 blur-3xl" />
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop"
                alt="HQ Office"
                fill
                className="rounded-[2.5rem] object-cover border border-white/10 shadow-2xl relative z-10"
                priority
              />
              <div className="absolute -bottom-6 -right-6 bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl z-20 hidden sm:block">
                <p className="text-3xl font-black text-white italic font-heading">HQ_MUMBAI</p>
                <p className="text-green-500 text-xs font-black tracking-widest uppercase">Global Control Center</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 border-y border-zinc-900 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center group cursor-default">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white mb-2 group-hover:scale-110 transition-transform duration-300 font-heading italic">
                  {s.value}
                </div>
                <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Bento Pillars */}
      <section className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-heading italic uppercase tracking-tighter">
              Strategic <span className="text-green-500">Directives</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto font-medium">Outlining the fundamental protocols that govern our operational excellence.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Primary Mission Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 relative p-12 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 group hover:border-green-500/30 transition-all duration-500 overflow-hidden"
            >
              <Rocket className="w-16 h-16 text-green-600 mb-8 transform group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl font-black text-white mb-6 font-heading italic uppercase tracking-tighter">Our Core Mission</h3>
              <p className="text-zinc-400 text-xl leading-relaxed font-medium">
                To democratize access to premium hardware by building a hyper-efficient, technology-first commerce grid. We standardize delightful experiences.
              </p>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-green-500/5 rounded-full blur-[100px] group-hover:bg-green-500/10 transition-colors" />
            </motion.div>

            {/* Feature Cards Loop */}
            {pillars.map((p, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-8 rounded-[2rem] bg-zinc-900/50 border border-zinc-900 group hover:border-green-500/20 transition-all duration-500 flex flex-col justify-between ${idx === 2 ? 'md:col-span-1' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center text-green-500 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black text-white mb-3 font-heading italic uppercase tracking-tighter">{p.title}</h4>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Global Reach - Large Bento Piece */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-3 h-[400px] relative rounded-[3rem] overflow-hidden group border border-zinc-900"
            >
              <Image 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1742&auto=format&fit=crop" 
                alt="Global Collaboration" 
                fill 
                className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="max-w-xl">
                    <Badge className="bg-green-600 text-white border-0 mb-4 font-black tracking-widest uppercase">Global Network</Badge>
                    <h3 className="text-4xl font-black text-white mb-4 font-heading italic uppercase tracking-tighter">Planetary Operations</h3>
                    <p className="text-zinc-400 font-medium text-lg">From Mumbai to New York, our fulfillment protocols connect the world's finest hardware to your doorstep.</p>
                  </div>
                  <div className="flex gap-4">
                    {['BOM', 'NYC', 'LHR', 'SIN'].map(city => (
                      <div key={city} className="px-5 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-black text-sm">{city}</div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-green-500 font-black tracking-[0.4em] uppercase text-xs font-sans mb-4 block">Expert Personnel</span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4 font-heading italic uppercase tracking-tighter">MEET THE <span className="text-zinc-800">ARCHITECTS</span></h2>
            </div>
            <p className="text-zinc-500 max-w-sm font-medium">A synergistic collective of engineers, designers, and visionaries.</p>
          </div>
          
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t) => (
              <motion.div 
                key={t.name} 
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 group-hover:border-green-500/50 transition-all duration-500">
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  {/* Scanline Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-1 opacity-0 group-hover:opacity-100 animate-scanline pointer-events-none" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-black text-white font-heading italic uppercase tracking-tighter">{t.name}</h3>
                    <p className="text-green-500 font-black text-[10px] tracking-[0.2em] uppercase">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-black">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-white mb-4 font-heading italic uppercase tracking-tighter">Support Protocol</h2>
            <p className="text-zinc-500 font-medium">Frequently accessed data points for expedited resolution.</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-6">
            {faqs.map((f, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border border-zinc-900 rounded-[2rem] px-8 data-[state=open]:bg-zinc-900/50 data-[state=open]:border-green-500/30 transition-all duration-300 overflow-hidden">
                <AccordionTrigger className="text-xl font-black text-white hover:no-underline py-8 font-heading italic uppercase tracking-tighter hover:text-green-500 transition-colors">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 text-lg pb-8 leading-relaxed font-medium prose prose-invert">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-24">
        <div className="relative rounded-[3rem] overflow-hidden bg-zinc-950 border border-zinc-900 py-24 px-8 text-center group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
          <motion.div 
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full bg-green-500/5 blur-[120px] rounded-full pointer-events-none" 
          />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-10">
            <h2 className="text-5xl md:text-7xl font-black text-white font-heading italic uppercase tracking-tighter leading-none">
              JOIN THE <span className="text-green-500 text-6xl md:text-8xl block mt-2">REVOLUTION</span>
            </h2>
            <p className="text-xl text-zinc-400 font-medium">
              Synchronize with our network. Get priority access to latest drops and field intelligence.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative">
              <input
                type="email"
                placeholder="Secure Email Address"
                className="flex-1 rounded-2xl bg-black border border-zinc-800 px-8 py-5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all font-medium"
              />
              <Button size="lg" className="h-[64px] px-10 rounded-2xl bg-white text-black hover:bg-green-500 hover:text-white font-black uppercase tracking-tighter transition-all active:scale-95 shadow-2xl">
                Subscribe
              </Button>
            </form>
            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
              Authorized users only. Privacy protocol strictly enforced.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}