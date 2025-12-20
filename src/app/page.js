"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Shield,
  Truck,
  RefreshCw,
  Star,
  Smartphone,
  Watch,
  Headphones,
  Laptop
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// --- Data ---

const categories = [
  {
    name: "Laptops",
    icon: <Laptop className="w-8 h-8" />,
    description: "Power & Potability",
    image: "/laptop-modern.png",
    color: "from-green-600/20 to-green-900/20"
  },
  {
    name: "Mobiles",
    icon: <Smartphone className="w-8 h-8" />,
    description: "Next Gen Performance",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
    color: "from-green-600/20 to-green-900/20"
  },
  {
    name: "Headphones",
    icon: <Headphones className="w-8 h-8" />,
    description: "Immersive Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
    color: "from-green-600/20 to-green-900/20"
  },
  {
    name: "Smart Watches",
    icon: <Watch className="w-8 h-8" />,
    description: "Stay Connected",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000",
    color: "from-green-600/20 to-green-900/20"
  },
];

const features = [
  { icon: <Zap className="w-6 h-6" />, title: "Ultra Fast", description: "Same-day dispatch." },
  { icon: <Shield className="w-6 h-6" />, title: "Secure", description: "256-bit SSL protection." },
  { icon: <Truck className="w-6 h-6" />, title: "Global", description: "Worldwide shipping available." },
  { icon: <RefreshCw className="w-6 h-6" />, title: "Easy Returns", description: "30-day peace of mind." },
];

// --- Components ---

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-black">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-green-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
      </div>

      {/* Hero Image - Subtle Parallax */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/hero-modern.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Content */}
      <div className="container relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block py-2 px-4 rounded-full bg-white/5 border border-white/10 text-green-400 text-xs font-black tracking-[0.3em] mb-8 backdrop-blur-md font-sans uppercase"
          >
            SYSTEM ACTIVATED // PROTOCOL 2025
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] font-heading italic uppercase"
            >
              FUTURE OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">TECH IS HERE</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Experience the pinnacle of innovation. Premium electronics engineered for the next generation of digital excellence.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/products">
              <Button size="lg" className="h-16 px-12 rounded-2xl bg-white text-black hover:bg-green-500 hover:text-white font-black text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Shop Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link href="/products?sort=newest">
              <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-black text-lg backdrop-blur-md transition-all duration-300 border-2 active:scale-95">
                Latest Drops
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase font-black text-zinc-600 group-hover:text-green-500 transition-colors">Scroll to Explore</span>
        <div className="w-[2px] h-12 bg-gradient-to-b from-green-500/50 to-transparent rounded-full overflow-hidden">
          <motion.div
            animate={{ y: [-48, 48] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/2 bg-green-500"
          />
        </div>
      </motion.div>
    </section>
  );
};

const CategoryShowcase = () => {
  return (
    <section className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4"
        >
          <div>
            <h2 className="text-5xl font-black text-white mb-4 font-heading italic uppercase tracking-tighter">
              The <span className="text-green-500">Inventory</span>
            </h2>
            <p className="text-zinc-500 max-w-md font-medium">Curated hardware selected for peak performance and uncompromising style.</p>
          </div>
          <Link href="/products" className="text-green-500 hover:text-white flex items-center gap-2 font-black uppercase tracking-widest text-xs group transition-colors">
            Access Full Database <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[800px]">
          {/* Large Featured Category */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 relative group rounded-3xl overflow-hidden cursor-pointer"
          >
            <Link href="/products?category=laptops">
              <Image
                src={categories[0].image}
                alt="Laptops"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              <div className="absolute inset-0 bg-green-900/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-0 left-0 p-10 w-full">
                <div className="text-green-500 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {categories[0].icon}
                </div>
                <h3 className="text-4xl font-black text-white mb-2 font-heading italic uppercase tracking-tighter">Laptops</h3>
                <p className="text-zinc-400 font-medium mb-6 max-w-sm">Command centers for the modern creator. Overwhelming power, engineered for portability.</p>
                <div className="inline-flex items-center gap-2 text-white text-xs font-black uppercase tracking-[0.2em] py-3 px-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 group-hover:bg-green-600 transition-all">
                  Configure Now <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Medium Categories */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 md:row-span-1 relative group rounded-3xl overflow-hidden cursor-pointer"
          >
            <Link href="/products?category=mobiles">
              <Image
                src={categories[1].image}
                alt="Mobiles"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-black text-white font-heading italic uppercase tracking-tighter">Next-Gen Mobiles</h3>
                <p className="text-zinc-400 text-sm font-medium">Neural processing. Cinematic optics.</p>
              </div>
            </Link>
          </motion.div>

          {/* Smaller Categories */}
          {categories.slice(2).map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="md:col-span-1 md:row-span-1 relative group rounded-3xl overflow-hidden cursor-pointer"
            >
              <Link href={cat.href || `/products?category=${cat.name.toLowerCase().replace(/ /g, "-")}`}>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-lg font-black text-white font-heading italic uppercase tracking-tighter">{cat.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrendingSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 4)))
      .catch(console.error);
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-1 bg-green-500 mb-8"
          />
          <span className="text-green-500 font-black tracking-[0.4em] uppercase text-xs font-sans mb-4">Priority Access</span>
          <h2 className="text-5xl md:text-7xl font-black text-white mt-3 mb-6 font-heading italic uppercase tracking-tighter">
            Trending <span className="text-zinc-800">Now</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/products/${product.id}`} className="group block">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-zinc-900 mb-6 border border-zinc-800 group-hover:border-green-500/50 transition-all duration-500 shadow-2xl group-hover:shadow-green-500/10">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Scanline Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-1 opacity-0 group-hover:opacity-100 animate-scanline pointer-events-none" />

                  {/* Hover Info */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                    <Button className="rounded-xl bg-white text-black hover:bg-green-500 hover:text-white font-black uppercase tracking-tighter transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-xl">
                      View Item
                    </Button>
                  </div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-green-600 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-[0.2em] uppercase shadow-lg shadow-green-600/50">Hot Drop</span>
                  </div>
                </div>
                <div className="px-2">
                  <p className="text-green-500 text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">{product.category}</p>
                  <h3 className="text-xl font-black text-white group-hover:text-green-400 transition-colors truncate font-heading italic uppercase tracking-tighter">{product.title}</h3>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-2xl font-black text-white">₹{product.price}</p>
                    <div className="h-px flex-1 bg-zinc-800 mx-4 opacity-30" />
                    <Star className="w-4 h-4 text-green-500 fill-green-500" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    { name: "Vikram R.", role: "Tech Reviewer", text: "The delivery protocol is unmatched. Received my laptop within 4 hours. Unbelievable precision." },
    { name: "Ananya S.", role: "UI Architect", text: "Finally an e-commerce platform that understands aesthetic. The tech curation is top-tier." },
    { name: "Rahul M.", role: "Lead Dev", text: "Clean checkout, verified components, and elite support. My primary hardware source from now on." },
  ];

  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-black border border-zinc-900 relative group hover:border-green-500/30 transition-all duration-500"
            >
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-green-500 fill-green-500" />)}
              </div>
              <p className="text-zinc-400 text-lg font-medium leading-relaxed mb-8 italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600" />
                <div>
                  <h4 className="text-white font-black font-heading uppercase tracking-tight">{t.name}</h4>
                  <p className="text-zinc-600 text-xs font-black uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureBanner = () => {
  return (
    <section className="py-20 border-y border-white/5 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {features.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-2">
                {item.icon}
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const NewsletterCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-green-900/10 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-heading italic uppercase tracking-tighter">Join the Future</h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10">
          Subscribe to our newsletter for exclusive drops, early bird access to new tech, and special offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-green-500 transition-colors"
          />
          <Button size="lg" className="rounded-full h-auto py-4 px-8 bg-green-600 hover:bg-green-700 text-white font-bold">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-foreground overflow-x-hidden selection:bg-green-500/30 selection:text-green-200">
      <HeroSection />
      <FeatureBanner />
      <CategoryShowcase />
      <TrendingSection />
      <TestimonialsSection />
      <NewsletterCTA />
    </div>
  );
}
