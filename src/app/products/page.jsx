"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { setProducts } from "../../redux/slices/productsSlice";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Filter, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { list } = useSelector((s) => s.products);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 16;

  const categories = [
    "All",
    "Laptops",
    "Headphones",
    "Smart Watches",
    "Mobiles",
    "Accessories",
  ];

  // Handle URL category parameter on mount
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) {
      // Capitalize first letter to match category format
      const groups = ["All", "Laptops", "Headphones", "Smart Watches", "Mobiles", "Accessories"];
      
      // Simple capitalization won't work for "Smart Watches", need to find matching group case-insensitively
      const found = groups.find(g => g.toLowerCase().replace(/ /g, "-") === urlCategory.toLowerCase());
      
      if (found) {
        setCategory(found);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => {
        dispatch(setProducts(d));
        setFiltered(d);
        setLoading(false);
      });
  }, [dispatch]);

  // Filtering + Searching + Sorting
  useEffect(() => {
    let items = [...list];

    if (category !== "All") {
      items = items.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase().replace(/ /g, "-")
      );
    }

    if (search) {
      items = items.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "price-low") {
      items.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      items.sort((a, b) => b.price - a.price);
    } else if (sort === "az") {
      items.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFiltered(items);
    setCurrentPage(1); // Reset to first page when filters change
  }, [category, search, sort, list]);

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filtered.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of products section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-green-950/20 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-green-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-20 w-72 h-72 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 py-12">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
        >
          <div className="space-y-2">
            <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-green-200 to-white">
              Explore Collection
            </h1>
            <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
              Discover our curated list of premium products designed to elevate your lifestyle.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto bg-zinc-900/60 p-2 rounded-2xl backdrop-blur-xl border border-zinc-800 shadow-lg">
            <div className="relative w-full sm:w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 bg-transparent border-transparent focus:bg-zinc-800 transition-all duration-300 rounded-xl"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[180px] h-12 bg-transparent border-transparent hover:bg-zinc-800/50 rounded-xl transition-colors">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest Arrivals</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="az">Name: A - Z</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden h-12 w-12 rounded-xl hover:bg-zinc-800/50">
                    <Filter className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-gray-950">
                  <SheetHeader className="px-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="text-2xl font-bold text-white">Filters</SheetTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {setCategory("All"); setSearch(""); setSort("latest");}} 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3"
                      >
                        Reset All
                      </Button>
                    </div>
                    <SheetDescription className="text-gray-500 dark:text-gray-400">
                      Refine your product search to find exactly what you need.
                    </SheetDescription>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto py-6 px-1 space-y-8 scrollbar-hide">
                    {/* Categories Section */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Categories</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`
                              relative p-4 rounded-xl text-left transition-all duration-200 border group
                              ${category === cat 
                                ? "border-green-600 bg-green-900/20 text-green-300 shadow-md ring-1 ring-green-600" 
                                : "border-gray-800 bg-gray-900 text-gray-300 hover:border-green-800 hover:bg-gray-800"
                              }
                            `}
                          >
                            <span className="font-medium text-sm">{cat}</span>
                            {category === cat && (
                              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-500 shadow-sm" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Sort Section (Mobile Only) */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Sort By</h3>
                      <div className="space-y-2 bg-gray-900/50 p-2 rounded-2xl">
                         {[
                           { label: "Latest Arrivals", value: "latest" },
                           { label: "Price: Low to High", value: "price-low" },
                           { label: "Price: High to Low", value: "price-high" },
                           { label: "Name: A - Z", value: "az" },
                         ].map((option) => (
                           <button
                              key={option.value}
                              onClick={() => setSort(option.value)}
                              className={`w-full flex items-center justify-between p-3 rounded-xl text-sm transition-all duration-200 ${
                                sort === option.value
                                  ? "bg-gray-800 font-semibold text-white shadow-sm"
                                  : "text-gray-400 hover:bg-gray-800/50"
                              }`}
                           >
                             {option.label}
                             {sort === option.value && <Check className="w-4 h-4 text-green-500" />}
                           </button>
                         ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800 mt-auto pb-6">
                    <SheetClose asChild>
                      <Button className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                        Show {filtered.length} Results
                      </Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </motion.div>

        {/* Desktop Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden md:flex flex-wrap gap-3 mb-12 justify-center"
        >
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              onClick={() => setCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 relative overflow-hidden group ${
                category === cat
                  ? "text-white shadow-xl shadow-green-500/30 scale-105"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-800 hover:border-green-800"
              }`}
            >
              {category === cat && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600" />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {cat}
                {category === cat && (
                  <motion.span layoutId="activeDot" className="w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-3xl h-[420px] animate-pulse border border-gray-800 shadow-sm" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center bg-white/50 dark:bg-gray-900/50 rounded-3xl backdrop-blur-sm border border-dashed border-gray-300 dark:border-gray-700"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Search className="w-12 h-12 text-green-500/50" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
              We couldn't find any products matching your search. Try adjusting your filters or search term.
            </p>
            <Button 
              onClick={() => {setCategory("All"); setSearch("");}}
              className="bg-green-600 text-white hover:bg-green-700 rounded-xl px-8 py-6 h-auto text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Clear all filters
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {paginatedProducts.map((p) => (
                <motion.div
                  key={p.id}
                  variants={item}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full"
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
