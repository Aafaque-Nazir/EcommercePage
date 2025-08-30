"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Star, 
  Shield, 
  Zap, 
  Heart, 
  ShoppingCart, 
  Truck, 
  RefreshCw,
  Play,
  ArrowRight,
  Users,
  Award,
  TrendingUp,
  Check,
  Quote
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Badge
} from '@/components/ui/badge';
import {
  Button
} from '@/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

// Simulated product data
const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 1248,
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    rating: 4.9,
    reviews: 892,
    badge: "New"
  },
  {
    id: 3,
    name: "Minimalist Backpack",
    price: 89,
    originalPrice: 129,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 567,
    badge: "Sale"
  },
  {
    id: 4,
    name: "Wireless Charging Station",
    price: 79,
    originalPrice: 99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 423,
    badge: "Popular"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Buyer",
    content: "Amazing quality and fast delivery. The customer service is outstanding and they really care about their customers!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Regular Customer",
    content: "Best shopping experience I've had online. Products exactly as described and delivery was super fast.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Premium Member",
    content: "Love the exclusive deals and the quality is always top-notch! Highly recommend to everyone.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
  }
];

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Quick checkout in under 60 seconds"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Payments",
    description: "256-bit SSL encryption for all transactions"
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Free Shipping",
    description: "Free delivery on orders over $50"
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Easy Returns",
    description: "30-day hassle-free return policy"
  }
];

const stats = [
  { label: "Happy Customers", value: "50K+", icon: <Users className="w-5 h-5" /> },
  { label: "Products", value: "1000+", icon: <ShoppingCart className="w-5 h-5" /> },
  { label: "Satisfaction Rate", value: "99%", icon: <Award className="w-5 h-5" /> },
  { label: "Support", value: "24/7", icon: <Shield className="w-5 h-5" /> }
];

const whyChooseUs = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Premium Quality",
    description: "Every product is carefully curated and tested to ensure the highest quality standards for our customers.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Customer First",
    description: "Our dedicated support team is available 24/7 to help you with any questions or concerns you may have.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: "Easy Returns",
    description: "Not satisfied? Return any item within 30 days for a full refund, no questions asked.",
    gradient: "from-green-500 to-emerald-500"
  }
];

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

// Product Card Component using shadcn/ui
const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border-0 shadow-lg">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
          -{discount}%
        </Badge>
        <Badge variant="secondary" className="absolute top-3 right-14">
          {product.badge}
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <CardTitle className="text-base font-semibold mb-2 line-clamp-2">
          {product.name}
        </CardTitle>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">
              ${product.price}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          </div>
          
          <Button 
            size="icon" 
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Testimonial Card Component using shadcn/ui
const TestimonialCard = ({ testimonial }) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
        
        <Quote className="w-6 h-6 text-muted-foreground mb-2" />
        <p className="text-muted-foreground italic">{testimonial.content}</p>
      </CardContent>
    </Card>
  );
};

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center space-y-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-300 rounded-full opacity-30 animate-pulse blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-300 rounded-full opacity-30 animate-pulse blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-300 rounded-full opacity-20 animate-bounce blur-2xl"></div>
        
        {/* Main Content */}
        <div className="z-10 max-w-4xl">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>🚀 New products launching weekly</span>
            </div>
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 mb-6">
            Run faster.{' '}
            <span className="block">Shop smarter.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Experience the future of online shopping with our minimal storefront built with{' '}
            <Badge variant="outline" className="mx-1">Next.js</Badge>
            <Badge variant="outline" className="mx-1">Redux</Badge>
            <Badge variant="outline" className="mx-1">NextAuth</Badge>
            <Badge variant="outline" className="mx-1">Stripe</Badge>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/products" passHref>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:via-pink-600 hover:to-red-600 text-lg px-8 py-4 rounded-2xl shadow-xl">
              Browse Products
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 rounded-2xl backdrop-blur-sm">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 bg-white/20 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter end={parseInt(stat.value.replace(/\D/g, '') || '0')} suffix={stat.value.replace(/\d/g, '')} />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all cursor-pointer group">
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-2 text-primary group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Featured Collection</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trending Products
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular items loved by thousands of customers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" passHref>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-lg px-8 py-4 rounded-2xl">
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Experience the Difference
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover what sets us apart from the rest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="border-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm hover:shadow-xl transition-all">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl mb-4">{item.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 px-6 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">Testimonials</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground mb-16">
            Join thousands of satisfied customers worldwide
          </p>

          <div className="relative">
            <TestimonialCard testimonial={testimonials[currentTestimonial]} />
            
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 p-0 rounded-full ${
                    index === currentTestimonial 
                      ? 'bg-primary' 
                      : 'bg-muted hover:bg-muted-foreground/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community and discover amazing products at unbeatable prices
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-2xl text-lg font-semibold">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Start Shopping Now
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-2xl text-lg font-semibold">
              <Users className="w-5 h-5 mr-2" />
              Create Account
            </Button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}