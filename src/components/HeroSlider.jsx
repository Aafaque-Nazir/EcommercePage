"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Elevate Your Lifestyle",
    subtitle: "Premium Collection 2025",
    description: "Discover a curated selection of premium products designed to enhance your everyday life. Quality, style, and innovation in one place.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    cta: "Shop Now",
    link: "/products",
    color: "from-purple-900/40 via-gray-900/80 to-black/90"
  },
  {
    id: 2,
    title: "Next-Gen Audio",
    subtitle: "Immersive Experience",
    description: "Experience sound like never before with our latest collection of high-fidelity headphones and speakers.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    cta: "Explore Audio",
    link: "/products?category=audio",
    color: "from-blue-900/40 via-gray-900/80 to-black/90"
  },
  {
    id: 3,
    title: "Urban Fashion",
    subtitle: "Redefine Your Style",
    description: "Stay ahead of the trends with our exclusive fashion line. Comfort meets contemporary design.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    cta: "View Collection",
    link: "/products?category=fashion",
    color: "from-pink-900/40 via-gray-900/80 to-black/90"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-gray-950 text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${slides[current].color} z-10`} />
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            className="object-cover opacity-60"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold uppercase tracking-widest mb-6">
                {slides[current].subtitle}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-tight">
                {slides[current].title}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                {slides[current].description}
              </p>
              <div className="flex gap-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="h-14 px-8 rounded-full text-lg font-bold bg-white text-black hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  <Link href={slides[current].link}>
                    {slides[current].cta} <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 right-10 z-30 flex gap-4">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-10 z-30 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1 transition-all duration-300 rounded-full ${
              current === idx ? "w-8 bg-white" : "w-4 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
