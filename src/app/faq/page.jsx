'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone,
  BookOpen,
  Star,
  Filter,
  X,
  ExternalLink,
  Clock,
  CheckCircle
} from 'lucide-react';

const FAQsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState(new Set());
  const [filteredFAQs, setFilteredFAQs] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);

  // Comprehensive FAQ data
  const faqData = [
    {
      id: 1,
      category: 'general',
      question: 'What products/services do you offer?',
      answer: 'We offer a comprehensive range of ecommerce solutions including product management, inventory tracking, order processing, payment integration, and customer support tools. Our platform is designed to help businesses of all sizes grow their online presence.',
      tags: ['products', 'services', 'ecommerce', 'solutions'],
      popular: true
    },
    {
      id: 2,
      category: 'pricing',
      question: 'What are your pricing plans?',
      answer: 'We offer flexible pricing plans to suit different business needs: Starter Plan ($29/month) for small businesses, Professional Plan ($79/month) for growing companies, and Enterprise Plan (custom pricing) for large organizations. All plans include a 14-day free trial.',
      tags: ['pricing', 'plans', 'cost', 'subscription'],
      popular: true
    },
    {
      id: 3,
      category: 'shipping',
      question: 'How fast is your shipping?',
      answer: 'We offer multiple shipping options: Standard shipping (5-7 business days), Express shipping (2-3 business days), and Overnight delivery (1 business day). Shipping times may vary based on your location and product availability.',
      tags: ['shipping', 'delivery', 'fast', 'overnight'],
      popular: true
    },
    {
      id: 4,
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a hassle-free 30-day return policy. Items must be in original condition with tags attached. Digital products and customized items are non-returnable. Return shipping is free for defective items, otherwise customer pays return shipping.',
      tags: ['returns', 'refund', 'policy', 'exchange'],
      popular: false
    },
    {
      id: 5,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'To reset your password: 1) Go to the login page, 2) Click "Forgot Password", 3) Enter your email address, 4) Check your email for reset instructions, 5) Follow the link to create a new password. If you don\'t receive the email, check your spam folder.',
      tags: ['password', 'reset', 'account', 'login'],
      popular: false
    },
    {
      id: 6,
      category: 'technical',
      question: 'Do you provide technical support?',
      answer: 'Yes! We provide 24/7 technical support through multiple channels: live chat, email support, phone support (business hours), and comprehensive documentation. Premium customers get priority support with guaranteed response times.',
      tags: ['support', 'technical', 'help', '24/7'],
      popular: true
    },
    {
      id: 7,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, bank transfers, and cryptocurrency (Bitcoin, Ethereum). All payments are processed securely with SSL encryption.',
      tags: ['payment', 'credit card', 'paypal', 'cryptocurrency'],
      popular: false
    },
    {
      id: 8,
      category: 'general',
      question: 'Is my data secure with you?',
      answer: 'Absolutely! We take data security seriously. We use industry-standard encryption (AES-256), regular security audits, GDPR compliance, SOC 2 certification, and secure data centers. Your personal and business data is never shared with third parties without consent.',
      tags: ['security', 'data', 'privacy', 'encryption', 'gdpr'],
      popular: true
    },
    {
      id: 9,
      category: 'integration',
      question: 'Can you integrate with my existing systems?',
      answer: 'Yes! We offer extensive integration capabilities with popular platforms like Shopify, WooCommerce, Magento, Salesforce, QuickBooks, and many more. We also provide REST APIs and webhooks for custom integrations. Our team can help with setup.',
      tags: ['integration', 'api', 'shopify', 'woocommerce', 'salesforce'],
      popular: false
    },
    {
      id: 10,
      category: 'account',
      question: 'How do I upgrade my plan?',
      answer: 'Upgrading is simple: 1) Log into your account, 2) Go to Billing & Plans, 3) Select your desired plan, 4) Confirm the upgrade. Changes take effect immediately and you\'ll be prorated for the billing period. Downgrading is also available with the same process.',
      tags: ['upgrade', 'plan', 'billing', 'subscription'],
      popular: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'general', name: 'General', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'pricing', name: 'Pricing', icon: <Star className="w-4 h-4" /> },
    { id: 'shipping', name: 'Shipping', icon: <Clock className="w-4 h-4" /> },
    { id: 'returns', name: 'Returns', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'account', name: 'Account', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'technical', name: 'Technical', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'payment', name: 'Payment', icon: <Star className="w-4 h-4" /> },
    { id: 'integration', name: 'Integration', icon: <ExternalLink className="w-4 h-4" /> }
  ];

  // Filter FAQs based on search and category
  useEffect(() => {
    let filtered = faqData;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(search) ||
        faq.answer.toLowerCase().includes(search) ||
        faq.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }
    setFilteredFAQs(filtered);
    setShowNoResults(filtered.length === 0 && (searchTerm.trim() || selectedCategory !== 'all'));
  }, [searchTerm, selectedCategory]);

  // Toggle FAQ item
  const toggleFAQ = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  // Clear search and filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setOpenItems(new Set());
  };

  const popularFAQs = faqData.filter(faq => faq.popular);

  return (
    <div className="min-h-screen bg-black font-sans scroll-smooth">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-zinc-950 border-b border-zinc-900 py-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-8"
          >
            <HelpCircle className="w-12 h-12 text-green-500 mr-4" />
            <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight text-white italic">
              F.A.Q<span className="text-green-500">_</span>
            </h1>
          </motion.div>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-sans">
            How can we help? Find answers to frequently asked questions about our technology and services.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-zinc-900 rounded-2xl border border-zinc-800 focus-within:border-green-500 transition-all">
              <Search className="ml-5 text-zinc-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search the system..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-5 bg-transparent text-white focus:outline-none font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mr-5 text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar - Categories & Popular */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800">
              <div className="flex items-center mb-6 px-2">
                <Filter className="w-4 h-4 text-green-500 mr-3" />
                <h3 className="text-xs font-heading font-bold uppercase tracking-widest text-zinc-500">Categories</h3>
              </div>
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                        : 'hover:bg-zinc-800/50 text-zinc-400 border border-transparent'
                    }`}
                  >
                    <span className={selectedCategory === category.id ? 'text-green-500' : 'text-zinc-600'}>
                      {category.icon}
                    </span>
                    <span className="ml-3 text-sm font-semibold tracking-wide">{category.name}</span>
                  </button>
                ))}
              </div>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="w-full mt-4 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* Popular Questions */}
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
              <div className="flex items-center mb-4">
                <Star className="w-4 h-4 text-green-500 mr-2" />
                <h3 className="text-xs font-heading font-bold uppercase tracking-widest text-zinc-500">Popular Queries</h3>
              </div>
              <div className="space-y-3">
                {popularFAQs.slice(0, 5).map(faq => (
                  <button
                    key={faq.id}
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchTerm('');
                      toggleFAQ(faq.id);
                    }}
                    className="text-left text-sm text-zinc-400 hover:text-green-500 transition-colors line-clamp-2"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl p-6 text-black">
              <h3 className="text-lg font-black uppercase tracking-tighter mb-2 italic">Connection Required?</h3>
              <p className="text-black/70 text-sm mb-6 font-bold uppercase tracking-tight">Our agents are standing by.</p>
              <div className="space-y-3">
                <a href="mailto:support@shopease.com" className="flex items-center text-sm font-black hover:underline gap-2">
                  <Mail size={16} /> SUPPORT@SHOPEASE.COM
                </a>
                <a href="tel:+1234567890" className="flex items-center text-sm font-black hover:underline gap-2">
                  <Phone size={16} /> +1 (234) 567-890
                </a>
                <Link href="/contact" className="w-full mt-4 bg-black text-white px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-800 transition-all text-center block">
                  Establish Terminal Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content - FAQ Items */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-900/40 rounded-3xl p-8 border border-zinc-800 shadow-2xl">
              {/* Results Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-zinc-800">
                <div>
                  <h2 className="text-2xl font-heading font-black text-white italic tracking-tight uppercase">
                    {selectedCategory === 'all' ? 'System Sync' : categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-zinc-500 mt-2 text-sm font-medium uppercase tracking-widest">
                    {filteredFAQs.length} entry found
                    {searchTerm && ` matching "${searchTerm.toUpperCase()}"`}
                  </p>
                </div>
                {filteredFAQs.length > 0 && (
                  <div className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mt-4 md:mt-0 flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <CheckCircle size={12} /> SECURE_ACCESS
                  </div>
                )}
              </div>

              {/* No Results */}
              {showNoResults && (
                <div className="text-center py-20 grayscale opacity-50">
                  <HelpCircle className="w-20 h-20 text-zinc-700 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-2 uppercase italic">Query Unsuccessful</h3>
                  <p className="text-zinc-500 mb-8 max-w-sm mx-auto font-medium">The requested data could not be located in our systems.</p>
                  <button onClick={clearFilters} className="bg-zinc-800 text-white px-8 py-3 rounded-xl hover:bg-zinc-700 transition-colors font-black uppercase tracking-widest text-xs">
                    Reset System
                  </button>
                </div>
              )}

              {/* FAQ Items */}
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className={`group transition-all duration-300 rounded-2xl overflow-hidden border ${openItems.has(faq.id) ? 'bg-zinc-800/80 border-green-500/30' : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'}`}>
                    <button onClick={() => toggleFAQ(faq.id)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                      <div className="flex items-start flex-1">
                        <div className={`mt-1 h-5 w-5 flex-shrink-0 transition-colors duration-300 ${openItems.has(faq.id) ? 'text-green-500' : 'text-zinc-700'}`}>
                           {faq.popular ? <Star size={18} fill={openItems.has(faq.id) ? "currentColor" : "none"} /> : <HelpCircle size={18} />}
                        </div>
                        <div className="ml-4">
                          <h3 className={`text-lg font-bold tracking-tight transition-all duration-300 ${openItems.has(faq.id) ? 'text-white italic' : 'text-zinc-200'}`}>
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                      <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${openItems.has(faq.id) ? 'rotate-180 text-green-500' : 'text-zinc-600'}`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {openItems.has(faq.id) && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-8 pt-2"
                        >
                          <div className="pl-9 border-l border-green-500/20">
                            <p className="text-zinc-400 leading-relaxed text-base font-medium">
                              {faq.answer}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-6">
                              {faq.tags.map(tag => (
                                <span key={tag} className="text-[10px] uppercase font-black px-2 py-0.5 bg-zinc-800 text-zinc-500 rounded border border-zinc-700 hover:text-green-500 hover:border-green-500/50 transition-all cursor-pointer">
                                  #{tag.toUpperCase()}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Bottom Support */}
              <div className="mt-16 pt-10 border-t border-zinc-800 text-center">
                <h4 className="text-white font-black tracking-[0.3em] text-xs mb-8 uppercase opacity-50">CONNECTION_STATUS: REQUIRED</h4>
                <div className="flex flex-wrap items-center justify-center gap-6">
                   <Link href="/contact" className="flex items-center gap-3 px-10 py-4 bg-green-600 hover:bg-green-500 text-black font-black uppercase tracking-tighter rounded-2xl transition-all shadow-xl shadow-green-600/20 active:scale-95">
                      <MessageCircle size={20} /> Establish Terminal Contact
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQsSection;