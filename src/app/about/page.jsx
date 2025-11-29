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
      icon: <ShieldCheck className="h-6 w-6 text-purple-600" aria-hidden />,
      title: "Secure by Design",
      desc: "Bank-grade security with PCI-compliant checkout, encrypted payments, and proactive fraud protection systems.",
    },
    {
      icon: <Truck className="h-6 w-6 text-blue-600" aria-hidden />,
      title: "Lightning Fast Delivery",
      desc: "Pan-India shipping with real‑time tracking and same‑day delivery options in major metropolitan areas.",
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-green-600" aria-hidden />,
      title: "Hassle-Free Returns",
      desc: "30-day return policy with no questions asked. Instant store credit or original payment refund.",
    },
    {
      icon: <Headphones className="h-6 w-6 text-pink-600" aria-hidden />,
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
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-white to-white dark:from-purple-900/20 dark:via-gray-950 dark:to-gray-950" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid gap-12 lg:grid-cols-2 lg:items-center"
          >
            <div>
              <Badge variant="outline" className="mb-6 px-4 py-1 text-sm border-purple-200 text-purple-700 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800">
                Established 2022
              </Badge>
              <h1 className="text-5xl font-black tracking-tight lg:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Redefining <br />
                <span className="text-purple-600">E-commerce.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 sm:mb-8 max-w-lg">
                We're not just another online store. We're a technology-first retail platform obsessed with quality, speed, and customer happiness.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4">
                <Button size="lg" className="h-12 px-8 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30">
                  Our Journey
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 rounded-full border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                  Meet the Team
                </Button>
              </div>
            </div>

            <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] w-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 rounded-[2rem] transform rotate-3 scale-95 blur-2xl" />
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop"
                alt="Office culture"
                fill
                className="rounded-[2rem] object-cover shadow-2xl relative z-10"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 border-y border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center group cursor-default">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {s.value}
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story - Rich Content */}
      <section className="py-12 sm:py-24 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Rocket className="w-8 h-8 text-purple-600" />
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                To democratize access to premium products by building the world's most efficient and customer-centric commerce platform. We believe shopping should be effortless, transparent, and delightful.
              </p>
            </div>
            
            <div className="grid gap-6">
              {pillars.map((p) => (
                <Card key={p.title} className="border-0 shadow-md hover:shadow-xl transition-shadow bg-white dark:bg-gray-900">
                  <CardContent className="p-6 flex gap-4">
                    <div className="shrink-0 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl h-fit">
                      {p.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1742&auto=format&fit=crop" 
                alt="Team collaboration" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Built by Passion</h3>
                  <p className="text-gray-200">Our team works tirelessly to curate the best for you.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-blue-400" />
                  Global Presence
                </h3>
                <p className="text-gray-300 mb-6">
                  From our headquarters in Mumbai to fulfillment centers across 3 continents, we are bringing the world closer to your doorstep.
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium text-gray-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 sm:w-4 sm:h-4" /> Mumbai</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 sm:w-4 sm:h-4" /> London</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 sm:w-4 sm:h-4" /> New York</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 sm:w-4 sm:h-4" /> Singapore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">The Dream Team</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet the Minds Behind ShopEase</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A diverse group of thinkers, makers, and doers united by a single purpose.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {team.map((t) => (
              <div key={t.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800">
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white">{t.name}</h3>
                    <p className="text-purple-300 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-24 mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((f, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-xl px-4 data-[state=open]:bg-gray-50 dark:data-[state=open]:bg-gray-900 transition-colors">
              <AccordionTrigger className="text-lg font-medium hover:no-underline py-6">{f.q}</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 text-base pb-6 leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-12 sm:pb-24">
        <div className="relative rounded-2xl sm:rounded-[2.5rem] overflow-hidden bg-black text-white py-12 sm:py-20 px-4 sm:px-8 text-center">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/50 to-transparent opacity-50" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Join the Revolution
            </h2>
            <p className="text-xl text-gray-300">
              Be the first to know about new drops, exclusive collaborations, and insider events.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 rounded-full bg-white/10 border border-white/20 px-6 py-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
              />
              <Button size="lg" className="rounded-full h-auto py-4 px-8 bg-white text-black hover:bg-gray-200 font-bold">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-gray-500">
              By subscribing, you agree to our Terms & Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}