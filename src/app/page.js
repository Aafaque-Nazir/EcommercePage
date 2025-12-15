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
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=1000",
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
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000"
          alt="Hero Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 text-center">
        <div>
          <span className="inline-block py-1 px-3 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm font-medium tracking-wider mb-6 backdrop-blur-sm">
            NEW COLLECTION 2025
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none">
            FUTURE OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">TECH IS HERE</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience the pinnacle of innovation. Premium electronics derived for performance and style.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products">
              <Button size="lg" className="h-14 px-10 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-[0_0_20px_-5px_rgba(22,163,74,0.5)] hover:shadow-[0_0_30px_-5px_rgba(22,163,74,0.6)] transition-all transform hover:scale-105">
                Shop Now
              </Button>
            </Link>
            <Link href="/products?sort=newest">
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-full border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300 font-bold text-lg backdrop-blur-sm">
                New Arrivals
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gray-500 to-transparent mx-auto mb-2" />
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
};

const CategoryShowcase = () => {
  return (
    <section className="py-32 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Explore Categories</h2>
            <div className="h-1 w-20 bg-green-600 rounded-full" />
          </div>
          <Link href="/products" className="text-green-500 hover:text-green-400 flex items-center gap-2 font-medium group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="hover:-translate-y-1 transition-transform duration-300"
            >
              <Link href={`/products?category=${cat.name.toLowerCase().replace(/ /g, "-")}`}>
                <div className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
                  {/* Background Image */}
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} backdrop-blur-[2px] opacity-60 group-hover:opacity-40 transition-opacity`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="mb-4 text-white/80 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {cat.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{cat.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{cat.description}</p>
                    <div className="flex items-center gap-2 text-green-400 text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 delay-100">
                      Shop Now <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
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
    <section className="py-32 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-green-500 font-bold tracking-widest uppercase text-sm">Best Sellers</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">Trending Now</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Top-tier tech selected by our experts.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <div
              key={product.id}
            >
              <Link href={`/products/${product.id}`} className="group block">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 mb-5 border border-gray-800 group-hover:border-green-500/30 transition-colors">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="rounded-full bg-white text-black hover:bg-gray-200 font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </Button>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">HOT</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-green-500 transition-colors truncate">{product.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-400 text-sm">{product.category}</p>
                    <p className="text-green-400 font-bold">₹{product.price}</p>
                  </div>
                </div>
              </Link>
            </div>
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
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Join the Future</h2>
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
      <NewsletterCTA />
    </div>
  );
}
