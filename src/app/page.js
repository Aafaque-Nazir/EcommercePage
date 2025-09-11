"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight, Users, Shield, Zap, Truck, RefreshCw, Quote, ShoppingCart, Play } from "lucide-react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Testimonials
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Buyer",
    content: "Amazing quality and fast delivery. Customer service is outstanding!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Regular Customer",
    content: "Best shopping experience online. Products exactly as described!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
  },
];

// Features
const features = [
  { icon: <Zap className="w-6 h-6" />, title: "Lightning Fast", description: "Checkout in under 60 seconds" },
  { icon: <Shield className="w-6 h-6" />, title: "Secure Payments", description: "Bank-level data encryption" },
  { icon: <Truck className="w-6 h-6" />, title: "Free Shipping", description: "Orders over $50" },
  { icon: <RefreshCw className="w-6 h-6" />, title: "Easy Returns", description: "30-day hassle free policy" },
];

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      {/* Hero */}
 <section
  className="relative flex items-center justify-center min-h-[90vh] text-center px-6 bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://media.istockphoto.com/id/1331058264/photo/online-shopping-concept-with-laptop-banner-shopping-cart-lipstick-high-heel-shoe-credit-card.webp?a=1&b=1&s=612x612&w=0&k=20&c=5S6uZtLXYBEQDu4QAKMzaIZ5TSJ1FsxSePjpjvQzwyE=')",
  
  }}
>

  <div 
    className="absolute inset-0 bg-black/80 opacity-40 z-0" 
    aria-hidden="true"
  ></div>

  {/* Content  */}
  <div className="relative z-10 max-w-3xl mx-auto">
    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white drop-shadow-lg">
      Run Faster. Shop Smarter.
    </h1>

    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-8 leading-relaxed drop-shadow">
      Discover trendy fashion, latest gadgets, and everyday essentials — all in one place.  
      Exclusive deals, lightning-fast delivery, and a secure checkout for a smarter shopping experience.  
    </p>

    <div className="flex gap-4 flex-wrap justify-center">
      <Link href="/products">
        <Button
          size="lg"
          className="px-8 py-4 rounded-xl  
                     hover:scale-105 transition-transform duration-300 text-lg text-white shadow-lg"
        >
          Browse Products <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </Link>
    </div>
  </div>
</section>



      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="border-0 shadow-md hover:shadow-lg bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm transition-all">
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center text-purple-600">{feature.icon}</div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-100 to-purple-300 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">What Our Customers Say</h2>
          <Card className="border-0 bg-white/10 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].name} />
                  <AvatarFallback>{testimonials[currentTestimonial].name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <p className="italic mb-4">“{testimonials[currentTestimonial].content}”</p>
              <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
              <p className="text-sm opacity-80">{testimonials[currentTestimonial].role}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Join our community and discover amazing products at unbeatable prices
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/products">
            <Button size="lg" className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700">
              <ShoppingCart className="w-5 h-5 mr-2" /> Start Shopping
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="px-8 py-4 rounded-xl">
              <Users className="w-5 h-5 mr-2" /> Create Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
