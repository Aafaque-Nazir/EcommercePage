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
      icon: <ShieldCheck className="h-5 w-5" aria-hidden />,
      title: "Secure by design",
      desc: "PCI-compliant checkout, encrypted payments, and proactive fraud protection.",
    },
    {
      icon: <Truck className="h-5 w-5" aria-hidden />,
      title: "Fast delivery",
      desc: "Pan-India shipping with real‑time tracking and same‑day options in metros.",
    },
    {
      icon: <RotateCcw className="h-5 w-5" aria-hidden />,
      title: "30‑day returns",
      desc: "Free, no‑questions‑asked returns with instant store credit.",
    },
    {
      icon: <Headphones className="h-5 w-5" aria-hidden />,
      title: "Human support",
      desc: "Real people on chat, mail, and phone. 7 days a week.",
    },
  ];

  const values = [
    { icon: <Leaf className="h-5 w-5" />, title: "Sustainability", text: "We prioritize recyclable packaging and carbon‑neutral fulfillment." },
    { icon: <HeartHandshake className="h-5 w-5" />, title: "Fair trade", text: "Ethical sourcing with vendor scorecards and audits." },
    { icon: <Factory className="h-5 w-5" />, title: "Quality first", text: "QA at inbound, pre‑ship, and post‑delivery touchpoints." },
  ];

  const team = [
    { name: "Aafaque", role: "Founder & Product", img: "/team/aafaque.jpg", fallback: "AN" },
    { name: "Ishita", role: "Ops Lead", img: "/team/ishita.jpg", fallback: "IS" },
    { name: "Raghav", role: "Engineering", img: "/team/raghav.jpg", fallback: "RG" },
    { name: "Sara", role: "CX", img: "/team/sara.jpg", fallback: "SR" },
  ];

  const faqs = [
    {
      q: "What makes your store different?",
      a: "We own the end‑to‑end experience: curated catalog, in‑house QA, and logistics partnerships that keep delivery fast and reliable.",
    },
    {
      q: "Where do you ship?",
      a: "We currently serve 27,000+ Indian pincodes and 40+ countries via priority international shipping.",
    },
    {
      q: "How do returns work?",
      a: "Create a return from your orders page within 30 days. We'll generate a pickup and issue a refund or instant store credit.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-50 via-white to-white" />
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid gap-10 md:grid-cols-2 md:items-center"
          >
            <div>
              <Badge className="mb-4">Since 2022</Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                We make shopping feel effortless
              </h1>
              <p className="mt-4 text-neutral-600">
                A modern e‑commerce brand built on quality, speed, and service. From curated collections to quick delivery, we’re here to raise the bar for your everyday buys.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button size="lg">Shop bestsellers</Button>
                <Button variant="outline" size="lg">Explore categories</Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-neutral-600">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Secure checkout</span>
                <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4" /> Fast delivery</span>
                <span className="inline-flex items-center gap-2"><Star className="h-4 w-4" /> 4.8/5 rated</span>
              </div>
            </div>

            <div className="relative h-64 w-full md:h-[420px]">
              <Image
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop"
                alt="Warehouse operations"
                fill
                className="rounded-3xl object-cover shadow-xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 pb-6">
        <Card className="rounded-3xl">
          <CardContent className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold tracking-tight">{s.value}</div>
                <div className="mt-1 text-sm text-neutral-600">{s.label}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Story & Pillars */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Our story</h2>
          <p className="text-neutral-600">
            We started with a simple idea: make online shopping delightful again. No spammy listings, no surprise fees, no week‑long waits. Just great products delivered quickly, backed by real people.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pillars.map((p) => (
              <Card key={p.title} className="rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    {p.icon}
                    {p.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-neutral-600">{p.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">What we stand for</h2>
          <div className="grid gap-4">
            {values.map((v) => (
              <div key={v.title} className="flex items-start gap-3 rounded-2xl border p-4">
                <div className="mt-1">{v.icon}</div>
                <div>
                  <div className="font-medium">{v.title}</div>
                  <p className="text-sm text-neutral-600">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-neutral-50 p-5">
            <p className="text-sm text-neutral-700">
              We offset 100% of delivery emissions and use recycled or reusable packaging where possible.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <h2 className="mb-6 text-2xl font-semibold">Milestones</h2>
        <ol className="relative space-y-6 border-s ps-6">
          {[
            { year: "2022", text: "Launched with 150 hand‑picked SKUs." },
            { year: "2023", text: "Expanded to nationwide delivery and opened our first micro‑fulfillment center." },
            { year: "2024", text: "Introduced 2‑hour express in 4 cities and crossed 100k customers." },
          ].map((m) => (
            <li key={m.year} className="ms-4">
              <span className="absolute -start-1.5 mt-1 h-3 w-3 rounded-full bg-black" />
              <div className="font-medium">{m.year}</div>
              <p className="text-sm text-neutral-600">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <h2 className="text-2xl font-semibold">Why shoppers choose us</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[{icon: Package, title: "Curated catalog", text: "Only top‑rated products with transparent specs and reviews."},
            {icon: Globe, title: "Global brands", text: "Official partnerships and authorized sourcing."},
            {icon: Users, title: "Community", text: "Verified reviews, Q&A, and helpful buying guides."},
          ].map((f) => (
            <Card key={f.title} className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <f.icon className="h-5 w-5" /> {f.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-neutral-600">{f.text}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <h2 className="mb-6 text-2xl font-semibold">What customers say</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {[1,2,3,4].map((i) => (
            <Card key={i} className="min-w-[280px] flex-1 rounded-2xl">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-neutral-700">
                  “Super fast delivery and genuine products. The support team went above and beyond.”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/100?img=${i}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">Customer {i}</div>
                    <div className="text-xs text-neutral-500">Verified buyer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <h2 className="mb-6 text-2xl font-semibold">Meet the team</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {team.map((t) => (
            <Card key={t.name} className="rounded-2xl text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-3 h-20 w-20">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={t.img} alt={t.name} />
                    <AvatarFallback>{t.fallback}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="font-medium">{t.name}</div>
                <div className="text-sm text-neutral-600">{t.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <h2 className="mb-6 text-2xl font-semibold">FAQs</h2>
        <Accordion type="single" collapsible className="w-full rounded-2xl border p-2">
          {faqs.map((f, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-neutral-600">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Card className="rounded-3xl bg-neutral-950 text-white">
          <CardContent className="grid items-center gap-6 p-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold">Join 120k+ happy customers</h3>
              <p className="mt-2 text-neutral-300">Sign up for launches, price drops, and insider perks.</p>
              <form className="mt-5 flex max-w-md gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-sm outline-none focus:border-white"
                />
                <Button type="submit" variant="secondary">Subscribe</Button>
              </form>
            </div>
            <div className="relative h-40 w-full md:h-56">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop"
                alt="Bestseller collage"
                fill
                className="rounded-2xl object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}