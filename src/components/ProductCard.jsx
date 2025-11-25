"use client";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";
import Image from "next/image";
import { Eye, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductCard({ product }) {
  return (
    <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Product Image Section */}
        <div className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
            />
          </Link>
          
          {/* Hover Overlay with Quick Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Link href={`/products/${product.id}`}>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="rounded-full bg-white/95 hover:bg-white text-gray-900 shadow-lg backdrop-blur-sm"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Quick View
                </Button>
              </Link>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            <Badge className="bg-white/95 dark:bg-gray-900/95 text-black dark:text-white hover:bg-white dark:hover:bg-gray-900 backdrop-blur-sm shadow-md font-medium">
              {product.category}
            </Badge>
            {product.oldPrice && (
              <Badge variant="destructive" className="shadow-md font-bold">
                Sale
              </Badge>
            )}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="p-5 flex flex-col flex-grow bg-white dark:bg-gray-800">
          <Link href={`/products/${product.id}`} className="block mb-3 group/title">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 group-hover/title:text-purple-600 dark:group-hover/title:text-purple-400 transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Price Section */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-base text-gray-500 line-through">
                    ₹{product.oldPrice.toLocaleString()}
                  </span>
                  <Badge variant="outline" className="ml-auto text-green-600 border-green-600">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>
          </div>

          {/* Actions Section */}
          <div className="mt-auto space-y-3">
            <Link href={`/products/${product.id}`} className="block">
              <Button 
                variant="outline" 
                className="w-full group/btn border-2 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <AddToCartButton product={product} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
