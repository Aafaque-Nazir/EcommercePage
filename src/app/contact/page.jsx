'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatePresence } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
      
      setTimeout(() => setSubmitStatus(null), 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: 'support@shopease.com',
      link: 'mailto:support@shopease.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: '+91 98765 43210',
      link: 'tel:+919876543210'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      details: 'Taloja Phase 1, Navi Mumbai',
      subDetails: 'Maharashtra 410208, India'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      details: 'Mon - Fri: 9AM - 6PM',
      subDetails: 'Sat: 10AM - 4PM'
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook', color: 'hover:bg-green-600' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter', color: 'hover:bg-green-600' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram', color: 'hover:bg-green-600' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn', color: 'hover:bg-green-600' }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden selection:bg-green-500/30">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-black">
        {/* Dynamic Background Mesh */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -45, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] bg-emerald-600/10 rounded-full blur-[160px]" 
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
          {/* Scientific Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="inline-block py-2 px-4 rounded-full bg-white/5 border border-white/10 text-green-400 text-xs font-black tracking-[0.4em] mb-8 backdrop-blur-md font-sans uppercase"
          >
            NEURAL_LINK // ESTABLISHING CONNECTION
          </motion.div>
          
          <div className="overflow-hidden mb-8">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none font-heading italic uppercase text-white"
            >
              GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">TOUCH</span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-2xl text-zinc-500 max-w-3xl mx-auto font-medium"
          >
            Initiate a secure data transfer. Our human interface units are standing by to process your inquiries.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border border-zinc-900 bg-zinc-950/80 backdrop-blur-3xl rounded-[3rem] shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />
              <CardContent className="p-10 md:p-16 relative z-10">
                <div className="flex items-center mb-12">
                  <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-green-500 mr-6 shadow-xl">
                    <MessageSquare size={32} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-white font-heading italic uppercase tracking-tighter leading-none">TERMINAL_INPUT</h2>
                    <p className="text-zinc-600 font-black text-[10px] tracking-[0.3em] uppercase mt-2">Initialize secure message transfer</p>
                  </div>
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-10 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 mr-4 shrink-0" />
                      <span className="text-green-400 font-medium">Protocol executed successfully. Data received and queued for processing.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-4">Full Identity</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`h-16 px-8 rounded-2xl bg-black/50 border-zinc-800 text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all font-medium ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="ALICE_VANCE"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-4">Communication Node</label>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`h-16 px-8 rounded-2xl bg-black/50 border-zinc-800 text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all font-medium ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="ALICE@CITADEL.COM"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-4">Subject Directive</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`h-16 px-8 rounded-2xl bg-black/50 border-zinc-800 text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all font-medium ${errors.subject ? 'border-red-500' : ''}`}
                      placeholder="HARDWARE_INQUIRY_01"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-4">Data Payload</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-8 py-6 rounded-3xl bg-black/50 border border-zinc-800 text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all font-medium resize-none ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Transmitting your request details..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-[72px] rounded-2xl bg-white text-black hover:bg-green-500 hover:text-white font-black text-xl uppercase tracking-tighter transition-all duration-300 transform active:scale-95 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? 'PROCESSING...' : (
                        <>EXECUTE TRANSFER <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                      )}
                    </span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information Cards */}
          <div className="space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.6 }}
            >
              <Card className="border border-zinc-900 bg-zinc-950 p-10 rounded-[3rem] shadow-xl group hover:border-green-500/30 transition-all">
                <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-10">Static Coordinates</h3>
                <div className="space-y-10">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-6 group/item">
                      <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center text-green-500 group-hover/item:bg-green-600 group-hover/item:text-white transition-all transform group-hover/item:scale-110">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{item.title}</h4>
                        <p className="text-lg font-black text-white font-heading italic uppercase tracking-tighter leading-none">{item.details}</p>
                        {item.subDetails && <p className="text-zinc-600 text-sm mt-1 font-medium">{item.subDetails}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.8 }}
            >
              <Card className="border-0 bg-gradient-to-br from-green-600 to-emerald-700 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity animate-scanline pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <CheckCircle size={32} />
                    <h3 className="text-2xl font-black font-heading italic uppercase tracking-tighter">QUICK_SYNC</h3>
                  </div>
                  <p className="text-green-100 font-medium mb-8 text-lg">Our central processing unit responds to most data transfers within 2.4 hours.</p>
                  <div className="p-6 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
                    <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-60">Avg. Transmission Delay</p>
                    <p className="text-5xl font-black font-heading italic">02:40:00</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Social Matrix */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 1 }}
               className="flex gap-4"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex-1 h-20 rounded-2xl bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-600 hover:text-green-500 hover:border-green-500/50 hover:bg-zinc-900 transition-all transform hover:scale-105"
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;