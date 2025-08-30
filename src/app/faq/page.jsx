'use client';

import React, { useState, useEffect } from 'react';
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

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search term
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

  // Get popular FAQs
  const popularFAQs = faqData.filter(faq => faq.popular);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="w-16 h-16 mr-4 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-8">
            Find answers to common questions about our products, services, and policies.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 text-lg rounded-xl border-0 shadow-lg focus:ring-4 focus:ring-white/20 focus:outline-none text-gray-900"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Categories & Popular */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
              </div>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {category.icon}
                    <span className="ml-2 text-sm font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
              
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="w-full mt-4 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Popular Questions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Popular Questions</h3>
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
                    className="text-left text-sm text-blue-600 hover:text-blue-800 hover:underline line-clamp-2"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-3">Still Need Help?</h3>
              <p className="text-green-100 text-sm mb-4">
                Can't find what you're looking for? Our support team is here to help!
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:support@company.com"
                  className="flex items-center text-sm text-white hover:text-green-100 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  support@company.com
                </a>
                <a
                  href="tel:+911234567890"
                  className="flex items-center text-sm text-white hover:text-green-100 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +91 98765 43210
                </a>
                <button className="w-full mt-3 bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                  Start Live Chat
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - FAQ Items */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory === 'all' ? 'All Questions' : categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
                    {searchTerm && ` for "${searchTerm}"`}
                  </p>
                </div>
                
                {filteredFAQs.length > 0 && (
                  <div className="text-sm text-gray-500">
                    Click questions to expand answers
                  </div>
                )}
              </div>

              {/* No Results */}
              {showNoResults && (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any questions matching your search.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={clearFilters}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                    <p className="text-sm text-gray-500">
                      or <a href="mailto:support@company.com" className="text-blue-600 hover:underline">contact our support team</a>
                    </p>
                  </div>
                </div>
              )}

              {/* FAQ Items */}
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className={`border border-gray-200 rounded-xl transition-all duration-200 ${
                      openItems.has(faq.id) ? 'shadow-md bg-blue-50 border-blue-200' : 'hover:shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
                    >
                      <div className="flex items-start flex-1">
                        {faq.popular && (
                          <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          <div className="flex items-center mt-2 space-x-2">
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                              {faq.category}
                            </span>
                            {faq.popular && (
                              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {openItems.has(faq.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </button>
                    
                    {openItems.has(faq.id) && (
                      <div className="px-6 pb-6 pt-0">
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-4">
                            {faq.tags.map(tag => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full cursor-pointer hover:bg-blue-200 transition-colors"
                                onClick={() => setSearchTerm(tag)}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* Helpful Actions */}
                          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-600">Was this helpful?</p>
                            <div className="flex items-center space-x-4">
                              <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                                👍 Yes
                              </button>
                              <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                                👎 No
                              </button>
                              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                📧 Contact Support
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Load More (for pagination if needed) */}
              {filteredFAQs.length > 0 && (
                <div className="text-center mt-8 pt-8 border-t border-gray-200">
                  <p className="text-gray-600 mb-4">
                    Still can't find what you're looking for?
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Submit a Question
                    </button>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                      Contact Support
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQsSection;