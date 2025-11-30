"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Users,
  Shield,
  Zap,
  Truck,
  RefreshCw,
  ShoppingCart,
  Star,
  ArrowRight,
  TrendingUp,
  Smartphone,
  Watch,
  Headphones,
  Camera,
  Award,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import HeroSlider from "@/components/HeroSlider";

// --- Data ---

const categories = [
  { name: "Electronics", icon: <Smartphone className="w-6 h-6" />, color: "bg-blue-500" },
  { name: "Fashion", icon: <Watch className="w-6 h-6" />, color: "bg-green-500" },
  { name: "Audio", icon: <Headphones className="w-6 h-6" />, color: "bg-emerald-500" },
  { name: "Photography", icon: <Camera className="w-6 h-6" />, color: "bg-orange-500" },
];

const trendingProducts = [
  { id: 1, name: "Sony WH-1000XM5", price: "$348", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop", category: "Audio" },
  { id: 2, name: "Apple Watch Ultra", price: "$799", image: "https://images.unsplash.com/photo-1664478546384-d57ffe74a797?w=500&auto=format&fit=crop", category: "Wearables" },
  { id: 3, name: "Nike Air Max", price: "$129", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop", category: "Fashion" },
  { id: 4, name: "Canon EOS R5", price: "$3899", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop", category: "Photography" },
];

const brands = [
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
  { name: "Canon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Canon_logo.svg/1200px-Canon_logo.svg.png" },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Buyer",
    content: "The quality of the products is absolutely unmatched. I'm blown away by the attention to detail!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Tech Enthusiast",
    content: "Fastest delivery I've ever experienced. The customer support team is also incredibly helpful.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Fashion Blogger",
    content: "I love the variety of styles available. Definitely my go-to shop for new trends.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
  }
];

const features = [
  { icon: <Zap className="w-6 h-6" />, title: "Lightning Fast", description: "Same-day dispatch on all orders placed before 2PM." },
  { icon: <Shield className="w-6 h-6" />, title: "Secure Payments", description: "256-bit SSL encryption to keep your data safe." },
  { icon: <Truck className="w-6 h-6" />, title: "Global Shipping", description: "Free worldwide shipping on orders over $150." },
  { icon: <RefreshCw className="w-6 h-6" />, title: "Easy Returns", description: "No questions asked 30-day return policy." },
];

// --- Components ---

const TrendingSection = () => {
  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm font-bold text-green-600 uppercase tracking-wider">Hot Right Now</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Trending Products</h2>
          </div>
          <Link href="/products" className="hidden md:flex items-center text-gray-500 hover:text-green-600 font-medium transition-colors">
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product) => (
            <Link href={`/products`} key={product.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-900 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-black/90 text-white hover:bg-black backdrop-blur-sm">
                    {product.category}
                  </Badge>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Button className="w-full bg-black text-white hover:bg-gray-900 shadow-lg">
                    Quick View
                  </Button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-green-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-400 font-medium">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const BrandsSection = () => {
  return (
    <section className="py-16 bg-gray-900 border-y border-gray-800">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">
          Trusted by World-Class Brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand) => (
            <div key={brand.name} className="relative h-8 w-24 md:h-10 md:w-32">
              {/* Note: Using simple text for brands if logos fail to load, but ideally these are SVGs */}
              <div className="flex items-center justify-center w-full h-full text-xl font-black text-gray-400 hover:text-white transition-colors">
                {brand.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CategorySection = () => {
  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Shop by Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our wide range of premium collections, carefully curated for your unique style and needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href={`/products?category=${cat.name.toLowerCase()}`}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer bg-gray-900">
                  <CardContent className="p-8 flex flex-col items-center justify-center h-64 relative">
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${cat.color}`} />
                    <div className={`w-20 h-20 rounded-full ${cat.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <div className="text-white">
                        {cat.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                    <span className="text-sm text-green-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 font-medium flex items-center gap-1">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-6 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-green-500/30">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-600 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-600 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-500/20 text-green-300 hover:bg-green-500/30 border-0 px-4 py-1">Testimonials</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Trusted by Thousands</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] md:h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Card className="bg-white/5 backdrop-blur-lg border-white/10 h-full">
                  <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 h-full">
                    <div className="flex-shrink-0">
                      <Avatar className="w-24 h-24 border-4 border-white/10 shadow-xl">
                        <AvatarImage src={testimonials[current].avatar} />
                        <AvatarFallback>{testimonials[current].name[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start gap-1 mb-4 text-yellow-400">
                        {[...Array(testimonials[current].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6 text-gray-200 italic">
                        &quot;{testimonials[current].content}&quot;
                      </p>
                      <div>
                        <h4 className="font-bold text-lg text-white">{testimonials[current].name}</h4>
                        <p className="text-green-300">{testimonials[current].role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${current === idx ? "bg-green-500 w-8" : "bg-white/20 hover:bg-white/40"
                  }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Experience the Future?</h2>
            <p className="text-lg md:text-xl text-green-100 mb-10">
              Join over 50,000 satisfied customers and upgrade your lifestyle today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="h-14 px-8 rounded-full bg-black text-green-600 hover:bg-gray-900 font-bold text-lg shadow-lg hover:scale-105 transition-transform">
                  Start Shopping
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full border-white text-white hover:bg-white/10 font-bold text-lg">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSlider />
      <BrandsSection />
      <TrendingSection />
      <CategorySection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
