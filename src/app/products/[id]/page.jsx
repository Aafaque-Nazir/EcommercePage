import AddToCartButton from "../../../components/AddToCartButton";
import WishlistButton from "../../../components/WishlistButton";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Star, Truck, ShieldCheck, RefreshCw, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

async function getProduct(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/products`,
    { cache: "no-store" }
  );
  const list = await res.json();
  return list.find((p) => p.id.toString() === id.toString());
}

export default async function ProductDetail({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-8">The product you are looking for does not exist.</p>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT - PRODUCT IMAGE */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-8 hover:scale-105 transition-transform duration-500"
                priority
              />
              {product.oldPrice && (
                <Badge className="absolute top-6 left-6 bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm">
                  Sale
                </Badge>
              )}
            </div>
          </div>

          {/* RIGHT - PRODUCT DETAILS */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-300 hover:bg-purple-100">
                  {product.category}
                </Badge>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <WishlistButton product={product} />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">(128 reviews)</span>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  ₹{product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through decoration-2">
                    ₹{product.oldPrice}
                  </span>
                )}
              </div>
            </div>

            <Separator className="mb-8" />

            <div className="prose prose-gray dark:prose-invert max-w-none mb-10">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex-1">
                <AddToCartButton
                  product={product}
                  className="w-full h-14 text-lg rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl"
                />
              </div>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl border-2 text-lg font-medium">
                Buy Now
              </Button>
            </div>

            {/* EXTRA INFO */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <Truck className="w-8 h-8 text-purple-600 mb-3" />
                <span className="font-semibold text-sm">Free Shipping</span>
                <span className="text-xs text-gray-500">On orders over ₹999</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <RefreshCw className="w-8 h-8 text-purple-600 mb-3" />
                <span className="font-semibold text-sm">Easy Returns</span>
                <span className="text-xs text-gray-500">7-day return policy</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <ShieldCheck className="w-8 h-8 text-purple-600 mb-3" />
                <span className="font-semibold text-sm">Secure Payment</span>
                <span className="text-xs text-gray-500">100% secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
