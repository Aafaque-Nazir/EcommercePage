"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";
import AddToCartButton from "../../../components/AddToCartButton";
import WishlistButton from "../../../components/WishlistButton";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronLeft, Star, Truck, ShieldCheck, RefreshCw, Share2, 
  Heart, ShoppingCart, Plus, Minus, Check, ZoomIn, X,
  MapPin, Clock, Award, Package
} from "lucide-react";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const id = params?.id;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [showImageModal, setShowImageModal] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products`);
      const products = await res.json();
      const foundProduct = products.find((p) => p.id.toString() === id.toString());
      setProduct(foundProduct);
      
      // Get related products from same category
      if (foundProduct) {
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty: quantity,
      category: product.category,
      description: product.description,
    };

    dispatch(addToCart(cartProduct));
    router.push('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-4">Product Not Found</h2>
        <p className="text-gray-400 mb-8">The product you are looking for does not exist.</p>
        <Link href="/products">
          <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all">
            Back to Products
          </button>
        </Link>
      </div>
    );
  }

  // Mock multiple images (in production, these would come from the product data)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const reviews = [
    { id: 1, name: "Rahul Sharma", rating: 5, comment: "Excellent product! Highly recommended.", date: "2 days ago", helpful: 12 },
    { id: 2, name: "Priya Patel", rating: 4, comment: "Good quality, fast delivery.", date: "1 week ago", helpful: 8 },
    { id: 3, name: "Amit Kumar", rating: 5, comment: "Worth every penny. Amazing quality!", date: "2 weeks ago", helpful: 15 },
  ];

  const specifications = {
    "Brand": "ShopEase Premium",
    "Model": product.id.toUpperCase(),
    "Category": product.category,
    "Warranty": "1 Year Manufacturer Warranty",
    "Color": "As shown in image",
    "Material": "Premium Quality",
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden selection:bg-green-500/30">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-green-600/10 rounded-full blur-[140px]" 
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.04]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Breadcrumb & Navigation */}
      <nav className="relative z-20 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em]">
            <Link href="/products" className="text-zinc-500 hover:text-green-500 transition-colors">INVENTORY</Link>
            <span className="text-zinc-800">//</span>
            <Link href={`/products?category=${product.category}`} className="text-zinc-500 hover:text-green-500 transition-colors">
              {product.category}
            </Link>
            <span className="text-green-500/50">//</span>
            <span className="text-white truncate max-w-[200px]">{product.title}</span>
          </div>
          
          <Link 
            href="/products" 
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            EXIT_VIEW
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 lg:py-20 relative z-10">

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          
          {/* LEFT - Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-zinc-950 rounded-[2.5rem] overflow-hidden border border-zinc-900 group shadow-2xl">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity animate-scanline pointer-events-none z-10" />
              <Image
                src={productImages[selectedImage]}
                alt={product.title}
                fill
                className="object-contain p-12 group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              
              {/* Sale Badge */}
              {product.oldPrice && (
                <div className="absolute top-8 left-8 bg-white text-black px-6 py-2 rounded-full font-black text-[10px] tracking-[0.2em] shadow-2xl z-20 uppercase">
                  PRICE_REDUCTION // -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </div>
              )}
              
              {/* Zoom Button */}
              <button
                onClick={() => setShowImageModal(true)}
                className="absolute top-8 right-8 bg-black/40 backdrop-blur-md p-4 rounded-2xl hover:bg-green-600 hover:text-white transition-all border border-white/10 z-20"
              >
                <ZoomIn className="w-5 h-5 flex-shrink-0" />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-[1.5rem] overflow-hidden border transition-all duration-300 ${
                    selectedImage === idx 
                      ? 'border-green-500 bg-green-500/5 shadow-lg shadow-green-500/20' 
                      : 'border-zinc-900 bg-zinc-950/50 hover:border-zinc-700'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} - ${idx + 1}`}
                    fill
                    className="object-contain p-4 opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT - Product Details */}
          <div className="space-y-10">
            <div className="space-y-6">
              {/* Category & Status */}
              <div className="flex items-center gap-4">
                <span className="px-5 py-2.5 bg-green-500/10 text-green-400 rounded-full text-[10px] font-black tracking-[0.3em] border border-green-500/20 uppercase">
                  {product.category}
                </span>
                <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-zinc-600 uppercase">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  UNIT_READY // IN_STOCK
                </div>
              </div>

              {/* Product Title */}
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] font-heading italic uppercase"
                >
                  {product.title}
                </motion.h1>
              </div>
              
              {/* Rating & Identity */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">(128 FEEDBACKS)</span>
                </div>
                <div className="h-4 w-px bg-zinc-800" />
                <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em]">ID // {product.id.split('-').pop().toUpperCase()}</span>
              </div>
            </div>

            {/* Price section */}
            <div className="bg-zinc-950/50 backdrop-blur-3xl border border-zinc-900 rounded-[2rem] p-8 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-black text-white font-heading italic tracking-tighter">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.oldPrice && (
                  <span className="text-2xl text-zinc-700 line-through font-bold">
                    ₹{product.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.oldPrice && (
                <div className="inline-block px-3 py-1 bg-green-500/10 rounded-lg text-green-500 text-[10px] font-black uppercase tracking-widest">
                  SAVED // ₹{(product.oldPrice - product.price).toLocaleString()}
                </div>
              )}
              <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mt-4">Standard credit acquisition includes all local sector taxes.</p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] ml-4">Unit Quantity</label>
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-zinc-950 border border-zinc-900 rounded-2xl p-1 shadow-inner">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-zinc-900 transition-all rounded-xl text-zinc-500 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-black text-xl text-white font-heading italic">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-zinc-900 transition-all rounded-xl text-zinc-500 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest">
                  {quantity > 5 ? (
                    <span className="text-green-500">BULK_TRANSFER_ENABLED</span>
                  ) : (
                    <span className="text-zinc-600">UNITS_REMAINING // 12</span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pt-4">
              <AddToCartButton
                product={product}
                quantity={quantity}
                className="w-full h-20 text-xl font-black rounded-2xl bg-white text-black hover:bg-green-500 hover:text-white transition-all shadow-2xl uppercase tracking-tighter italic flex items-center justify-center gap-3 active:scale-95 group"
              >
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                INITIATE // LOAD_CART
              </AddToCartButton>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleBuyNow}
                  className="h-16 border-2 border-zinc-900 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-900 hover:border-zinc-700 transition-all active:scale-95"
                >
                  SECURE_BUY
                </button>
                
                <WishlistButton 
                  product={product} 
                  className="h-16 border-2 border-zinc-900 bg-zinc-950 text-zinc-500 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:border-red-500/50 hover:text-red-500 transition-all active:scale-95" 
                />
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-10">
              {[
                { icon: <Truck className="w-6 h-6" />, label: "NEURAL_TRANSIT", sub: "Priority" },
                { icon: <RefreshCw className="w-6 h-6" />, label: "DATA_RECUP", sub: "7-Cycle" },
                { icon: <ShieldCheck className="w-6 h-6" />, label: "CORE_WARRANTY", sub: "Verified" }
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 bg-zinc-950 rounded-[1.5rem] border border-zinc-900 group/badge hover:border-green-500/30 transition-all">
                  <div className="text-green-500 mb-4 group-hover/badge:scale-110 transition-transform">
                    {badge.icon}
                  </div>
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">{badge.label}</span>
                  <span className="text-[8px] font-medium text-zinc-600 uppercase tracking-widest mt-1">{badge.sub}</span>
                </div>
              ))}
            </div>

            {/* Delivery Info */}
            <div className="bg-zinc-950/30 border border-zinc-900 rounded-[2rem] p-8 space-y-6 shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 text-zinc-500">
                <MapPin className="w-4 h-4 text-green-500" />
                Logistics_Node
              </h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="LOCATION_IDENTIFIER..."
                  className="flex-1 bg-black border border-zinc-900 rounded-xl px-6 py-4 text-white placeholder-zinc-700 focus:border-green-500/50 focus:outline-none transition-all text-sm font-bold uppercase tracking-widest"
                />
                <button className="px-8 py-4 bg-white text-black hover:bg-green-500 hover:text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                  SCAN
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <Clock className="w-4 h-4 text-green-500" />
                  Estimated Arrival: 3-5 Cycles
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <Award className="w-4 h-4 text-green-500" />
                  CREDIT_UPON_TRANSIT enabled
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-24">
          {/* Tab Headers */}
          <div className="flex gap-1 border-b border-zinc-900 mb-12 overflow-x-auto scrollbar-hide">
            {["description", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-6 font-black text-[10px] uppercase tracking-[0.4em] transition-all whitespace-nowrap relative ${
                  activeTab === tab
                    ? "text-white"
                    : "text-zinc-600 hover:text-zinc-400"
                }`}
              >
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-full" 
                  />
                )}
                {tab}_PROTOCOL
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-zinc-950/30 border border-zinc-900 rounded-[3rem] p-10 md:p-16 drop-shadow-2xl">
            {activeTab === "description" && (
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-black text-white mb-8 font-heading italic uppercase italic tracking-tighter italic">DATA_OVERVIEW</h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-12 font-medium">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                  {[
                    { title: "PREMIUM_BUILD", desc: "Engineered with highest-grade materials for maximum durability." },
                    { title: "SECURE_AUTH", desc: "100% genuine hardware with certified origin protocols." },
                    { title: "ECO_SYSTEM", desc: "Minimally invasive manufacturing and sustainable sourcing." },
                    { title: "24/7_SUPPORT", desc: "Continuous neural link to our customer assistance units." }
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-4 group/feat">
                      <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl group-hover/feat:bg-green-600 transition-all duration-300">
                        <Check className="w-5 h-5 text-green-500 group-hover/feat:text-white" />
                      </div>
                      <div>
                        <h4 className="font-black text-white text-[10px] tracking-[0.2em] mb-2 uppercase">{feat.title}</h4>
                        <p className="text-zinc-500 text-xs leading-relaxed font-medium">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-black text-white mb-10 font-heading italic uppercase tracking-tighter italic">TECHNICAL_PROTOCOLS</h3>
                <div className="grid gap-4">
                  {Object.entries(specifications).map(([key, value], idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-black/40 rounded-2xl border border-zinc-900 hover:border-zinc-800 transition-all group"
                    >
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{key}</span>
                      <span className="text-sm font-black text-white uppercase tracking-wider group-hover:text-green-500 transition-colors">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-4 font-heading italic uppercase tracking-tighter italic">PERSONNEL_FEEDBACK</h3>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">4.8 AVERAGE // 128 LOGS</span>
                    </div>
                  </div>
                  <button className="px-10 py-5 bg-white text-black hover:bg-green-500 hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl">
                    TRANSMIT_LOG
                  </button>
                </div>

                {/* Rating Stats - Tactical Bento style */}
                <div className="mb-16 p-8 bg-black/40 rounded-[2rem] border border-zinc-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 flex flex-col items-center gap-2">
                       <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{rating} Stars</span>
                       <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500" 
                            style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%` }} 
                          />
                       </div>
                    </div>
                  ))}
                </div>

                {/* Individual Logs */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-8 bg-black/40 rounded-[2.5rem] border border-zinc-900 hover:border-zinc-800 transition-all group">
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center font-black text-green-500 group-hover:bg-green-600 group-hover:text-white transition-all text-xl">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-black text-white uppercase tracking-widest text-sm italic">{review.name}</h4>
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">{review.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-green-500 text-green-500"
                                  : "text-zinc-800"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-zinc-400 text-lg leading-relaxed mb-6 font-medium">"{review.comment}"</p>
                      <button className="text-[10px] font-black text-zinc-600 hover:text-green-500 transition-colors uppercase tracking-[0.3em]">
                        DATA_USEFUL // {review.helpful}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="relative">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-4xl font-black text-white font-heading italic uppercase tracking-tighter italic">SIMILAR_UNITS</h2>
                <p className="text-zinc-500 font-medium uppercase text-[10px] tracking-[0.3em] mt-2">Compatible hardware profiles found</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relProduct) => (
                <Link
                  key={relProduct.id}
                  href={`/products/${relProduct.id}`}
                  className="group relative bg-zinc-950/50 border border-zinc-900 rounded-[2rem] overflow-hidden hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity animate-scanline pointer-events-none z-10" />
                  <div className="relative aspect-square bg-zinc-950 p-10 overflow-hidden">
                    <Image
                      src={relProduct.image}
                      alt={relProduct.title}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-700 p-4"
                    />
                  </div>
                  <div className="p-8">
                    <div className="text-[10px] font-black text-green-500/50 uppercase tracking-widest mb-4">IDENTIFIED // {relProduct.category}</div>
                    <h3 className="font-black text-white mb-4 line-clamp-1 uppercase tracking-tighter text-xl italic group-hover:text-green-400 transition-colors">
                      {relProduct.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-black text-white font-heading italic">₹{relProduct.price}</p>
                      <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-xl">
                        <Plus size={20} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
          <button className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-5xl aspect-square">
            <Image
              src={productImages[selectedImage]}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
