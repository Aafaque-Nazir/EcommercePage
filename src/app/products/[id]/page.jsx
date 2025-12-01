"use client";
import { useState, useEffect } from "react";
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Breadcrumb */}
      <div className="bg-[#111111] border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="text-gray-400 hover:text-green-500 transition-colors">Home</Link>
            <ChevronLeft className="w-4 h-4 rotate-180 text-gray-600" />
            <Link href="/products" className="text-gray-400 hover:text-green-500 transition-colors">Products</Link>
            <ChevronLeft className="w-4 h-4 rotate-180 text-gray-600" />
            <Link href={`/products?category=${product.category}`} className="text-gray-400 hover:text-green-500 transition-colors">
              {product.category}
            </Link>
            <ChevronLeft className="w-4 h-4 rotate-180 text-gray-600" />
            <span className="text-white font-medium truncate max-w-xs">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Back Button */}
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors mb-8 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Products</span>
        </Link>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          
          {/* LEFT - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-gray-800 group">
              <Image
                src={productImages[selectedImage]}
                alt={product.title}
                fill
                className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                priority
              />
              
              {/* Sale Badge */}
              {product.oldPrice && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                </div>
              )}
              
              {/* Zoom Button */}
              <button
                onClick={() => setShowImageModal(true)}
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-3 rounded-full hover:bg-black/70 transition-all"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx 
                      ? 'border-green-500 scale-105' 
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} - ${idx + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT - Product Details */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-green-500/10 text-green-500 rounded-full text-sm font-semibold border border-green-500/20">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Package className="w-4 h-4" />
                <span>In Stock</span>
              </div>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {product.title}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">(128 reviews)</span>
                <span className="text-gray-600">|</span>
                <span className="text-sm text-green-500 font-medium">SKU: {product.id.toUpperCase()}</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-2xl p-6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.oldPrice && (
                  <span className="text-2xl text-gray-500 line-through">
                    ₹{product.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.oldPrice && (
                <p className="text-green-500 font-medium">
                  You save ₹{(product.oldPrice - product.price).toLocaleString()} ({Math.round((1 - product.price / product.oldPrice) * 100)}%)
                </p>
              )}
              <p className="text-gray-400 text-sm mt-2">Inclusive of all taxes</p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-800 rounded-lg bg-[#1a1a1a]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-800 transition-colors rounded-l-lg"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-800 transition-colors rounded-r-lg"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-gray-400 text-sm">
                  {quantity > 5 ? 'Bulk order!' : 'Only 12 left in stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <AddToCartButton
                product={product}
                quantity={quantity}
                className="col-span-2 h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </AddToCartButton>
              
              <button 
                onClick={handleBuyNow}
                className="h-14 border-2 border-green-500 text-green-500 rounded-xl font-bold hover:bg-green-500 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                Buy Now
              </button>
              
              <WishlistButton product={product} className="h-14 border-2 border-gray-700 hover:border-red-500 hover:text-red-500 rounded-xl font-bold transition-all flex items-center justify-center gap-2" />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="flex flex-col items-center text-center p-4 bg-[#1a1a1a] rounded-xl border border-gray-800 hover:border-green-500/30 transition-all group">
                <Truck className="w-8 h-8 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm text-white">Free Shipping</span>
                <span className="text-xs text-gray-400">On orders ₹999+</span>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-[#1a1a1a] rounded-xl border border-gray-800 hover:border-green-500/30 transition-all group">
                <RefreshCw className="w-8 h-8 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm text-white">Easy Returns</span>
                <span className="text-xs text-gray-400">7-day policy</span>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-[#1a1a1a] rounded-xl border border-gray-800 hover:border-green-500/30 transition-all group">
                <ShieldCheck className="w-8 h-8 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm text-white">Warranty</span>
                <span className="text-xs text-gray-400">1 Year</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-500" />
                Delivery Options
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter PIN code"
                  className="flex-1 bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                />
                <button className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors">
                  Check
                </button>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span>Estimated delivery: 3-5 business days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-green-500" />
                  <span>Cash on Delivery available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          {/* Tab Headers */}
          <div className="flex gap-2 border-b border-gray-800 mb-8 overflow-x-auto">
            {["description", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold capitalize transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "text-green-500 border-b-2 border-green-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-2xl p-8">
            {activeTab === "description" && (
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-white mb-4">Product Description</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/10 rounded-xl">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Premium Quality</h4>
                      <p className="text-gray-400 text-sm">Made with the finest materials for long-lasting durability.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/10 rounded-xl">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Certified Authentic</h4>
                      <p className="text-gray-400 text-sm">100% genuine product with quality assurance.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/10 rounded-xl">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Eco-Friendly</h4>
                      <p className="text-gray-400 text-sm">Sustainably sourced and environmentally conscious.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/10 rounded-xl">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Expert Support</h4>
                      <p className="text-gray-400 text-sm">24/7 customer service for any queries.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Technical Specifications</h3>
                <div className="space-y-3">
                  {Object.entries(specifications).map(([key, value], idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
                    >
                      <span className="font-semibold text-gray-300">{key}</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Customer Reviews</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-gray-400">4.8 out of 5 (128 reviews)</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition-colors">
                    Write a Review
                  </button>
                </div>

                {/* Rating Distribution */}
                <div className="mb-8 p-6 bg-[#0a0a0a] rounded-xl border border-gray-800">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-4 mb-3">
                      <span className="text-sm font-medium text-gray-400 w-16">{rating} Star</span>
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                          style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 10}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-400 w-12">{rating === 5 ? 90 : rating === 4 ? 25 : 13}</span>
                    </div>
                  ))}
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-6 bg-[#0a0a0a] rounded-xl border border-gray-800 hover:border-gray-700 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center font-bold">
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-white">{review.name}</h4>
                              <span className="text-sm text-gray-400">{review.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">{review.comment}</p>
                      <button className="text-sm text-gray-400 hover:text-green-500 transition-colors">
                        👍 Helpful ({review.helpful})
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
          <div>
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link
                  key={relProduct.id}
                  href={`/products/${relProduct.id}`}
                  className="group bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all hover:scale-105"
                >
                  <div className="relative aspect-square bg-[#0a0a0a] p-6">
                    <Image
                      src={relProduct.image}
                      alt={relProduct.title}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-green-500 transition-colors">
                      {relProduct.title}
                    </h3>
                    <p className="text-2xl font-bold text-green-500">₹{relProduct.price}</p>
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
