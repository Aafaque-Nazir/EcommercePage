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
    <section className="min-h-screen bg-black relative overflow-hidden selection:bg-green-500/30">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10 py-24">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block py-2 px-4 rounded-full bg-white/5 border border-white/10 text-green-400 text-xs font-black tracking-[0.3em] font-sans uppercase"
            >
              INVENTORY_GRID // PROTOCOL_AVAILABLE
            </motion.div>
            
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none font-heading italic uppercase"
              >
                EXPLORE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">COLLECTION</span>
              </motion.h1>
            </div>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-zinc-500 max-w-lg leading-relaxed font-medium"
            >
              Curated hardware selected for peak performance and uncompromising technical standard.
            </motion.p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto bg-zinc-950/50 p-2 rounded-2xl backdrop-blur-3xl border border-zinc-900 shadow-2xl">
            <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600 group-focus-within:text-green-500 transition-colors" />
              <Input
                placeholder="UNIT_SEARCH..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-14 bg-black/50 border-zinc-900 text-white placeholder:text-zinc-700 focus:ring-1 focus:ring-green-500/30 transition-all rounded-xl"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[180px] h-14 bg-black/50 border-zinc-900 text-white hover:bg-zinc-900/50 rounded-xl transition-colors">
                  <SelectValue placeholder="SORT_ORDER" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-900 text-white">
                  <SelectItem value="latest">Latest Arrivals</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="az">Name: A - Z</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden h-14 w-14 rounded-xl bg-black/50 border border-zinc-900 hover:bg-zinc-900/50">
                    <Filter className="h-5 w-5 text-green-500" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md bg-black border-zinc-900 text-white flex flex-col h-full">
                  <SheetHeader className="pb-8 border-b border-zinc-900">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="text-3xl font-black text-white font-heading italic uppercase tracking-tighter">GRID_FILTER</SheetTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {setCategory("All"); setSearch(""); setSort("latest");}} 
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/5 px-3 font-black uppercase text-xs tracking-widest"
                      >
                        Reset All
                      </Button>
                    </div>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto py-10 space-y-12 scrollbar-hide">
                    {/* Categories Section */}
                    <div className="space-y-6">
                      <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] ml-2">Categories</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`
                              relative p-5 rounded-[1.5rem] text-left transition-all duration-300 border flex items-center justify-between
                              ${category === cat 
                                ? "border-green-500/50 bg-green-500/5 text-white" 
                                : "border-zinc-900 bg-zinc-950 text-zinc-500 hover:border-zinc-800"
                              }
                            `}
                          >
                            <span className="font-black text-xs uppercase tracking-widest">{cat}</span>
                            {category === cat && (
                              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Sort Section */}
                    <div className="space-y-6">
                      <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] ml-2">Sort Engine</h3>
                      <div className="space-y-2 bg-zinc-950 p-2 rounded-[2rem] border border-zinc-950">
                         {[
                           { label: "Latest Arrivals", value: "latest" },
                           { label: "Price: Low to High", value: "price-low" },
                           { label: "Price: High to Low", value: "price-high" },
                           { label: "Name: A - Z", value: "az" },
                         ].map((option) => (
                           <button
                              key={option.value}
                              onClick={() => setSort(option.value)}
                              className={`w-full flex items-center justify-between p-4 rounded-xl text-xs transition-all duration-300 font-black uppercase tracking-widest ${
                                sort === option.value
                                  ? "bg-zinc-900 text-white"
                                  : "text-zinc-600 hover:bg-zinc-900/50"
                              }`}
                           >
                             {option.label}
                             {sort === option.value && <Check className="w-4 h-4 text-green-500" />}
                           </button>
                         ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-zinc-900 mt-auto pb-8">
                    <SheetClose asChild>
                      <Button className="w-full h-16 text-lg font-black uppercase tracking-tighter rounded-2xl bg-white text-black hover:bg-green-500 hover:text-white transition-all duration-300 shadow-2xl">
                        Execute Protocol ({filtered.length})
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
          className="hidden md:flex flex-wrap gap-4 mb-16 justify-center"
        >
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 relative overflow-hidden group ${
                category === cat
                  ? "text-black shadow-2xl shadow-green-500/20 scale-105"
                  : "bg-zinc-950 text-zinc-500 hover:bg-zinc-900 border border-zinc-900 hover:border-green-500/30"
              }`}
            >
              {category === cat && (
                <motion.div 
                  layoutId="activeCat"
                  className="absolute inset-0 bg-white" 
                />
              )}
              <span className="relative z-10">{cat}</span>
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
