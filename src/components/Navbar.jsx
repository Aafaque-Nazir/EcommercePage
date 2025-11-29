"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  LogOut, 
  Package, 
  Heart,
  Search,
  ChevronDown,
  Smartphone,
  Watch,
  Headphones,
  Camera,
  Shirt,
  Footprints,
  Home,
  Speaker
} from "lucide-react";
import { useSelector } from "react-redux";
import { selectCartCount } from "../redux/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const { data: session, status } = useSession();
  const cartCount = useSelector(selectCartCount);

  const shopCategories = [
    { 
      name: "Electronics", 
      icon: <Smartphone className="w-5 h-5" />, 
      href: "/products?category=electronics",
      desc: "Latest gadgets & devices"
    },
    { 
      name: "Fashion", 
      icon: <Shirt className="w-5 h-5" />, 
      href: "/products?category=fashion",
      desc: "Trendy clothing for all"
    },
    { 
      name: "Audio", 
      icon: <Headphones className="w-5 h-5" />, 
      href: "/products?category=audio",
      desc: "Premium sound gear"
    },
    { 
      name: "Home", 
      icon: <Home className="w-5 h-5" />, 
      href: "/products?category=home",
      desc: "Decor & essentials"
    },
    { 
      name: "Shoes", 
      icon: <Footprints className="w-5 h-5" />, 
      href: "/products?category=shoes",
      desc: "Comfort & style"
    },
    { 
      name: "Wearables", 
      icon: <Watch className="w-5 h-5" />, 
      href: "/products?category=wearables",
      desc: "Smartwatches & bands"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20" />
      
      <nav
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
            : "bg-white dark:bg-gray-900 shadow-sm"
        }`}
        onMouseLeave={() => setShopMenuOpen(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center z-50">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                ShopEase
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                onMouseEnter={() => setShopMenuOpen(false)}
              >
                Home
              </Link>

              {/* Mega Menu Trigger */}
              <div 
                className="relative"
                onMouseEnter={() => setShopMenuOpen(true)}
              >
                <Link
                  href="/products"
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-6"
                >
                  Shop
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${shopMenuOpen ? "rotate-180" : ""}`} />
                </Link>

                {/* Mega Menu Content */}
                <AnimatePresence>
                  {shopMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden p-6 grid grid-cols-2 gap-6"
                    >
                      <div className="col-span-2 mb-2">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Shop by Category</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {shopCategories.map((cat) => (
                            <Link
                              key={cat.name}
                              href={cat.href}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                              onClick={() => setShopMenuOpen(false)}
                            >
                              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                {cat.icon}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                                  {cat.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {cat.desc}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      {/* Featured Section in Menu */}
                      <div className="col-span-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white flex justify-between items-center">
                        <div>
                          <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 mb-2">New Arrival</Badge>
                          <h4 className="font-bold text-lg mb-1">Summer Collection</h4>
                          <p className="text-purple-100 text-sm mb-4">Get up to 50% off on new arrivals</p>
                          <Button size="sm" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
                            <Link href="/products?sort=latest">Shop Now</Link>
                          </Button>
                        </div>
                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Package className="w-10 h-10 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/about"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                onMouseEnter={() => setShopMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                onMouseEnter={() => setShopMenuOpen(false)}
              >
                Contact
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Auth Section */}
              {status === "loading" ? (
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              ) : session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 h-10 px-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={session.user?.image} alt={session.user?.name} />
                        <AvatarFallback className="bg-purple-600 text-white text-xs">
                          {session.user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden xl:inline text-sm font-medium max-w-[100px] truncate">
                        {session.user?.name?.split(" ")[0] || "Account"}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{session.user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center cursor-pointer">
                        <Package className="mr-2 h-4 w-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist" className="flex items-center cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-red-600 focus:text-red-600 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/login">Sign In with Google</Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-8 space-y-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
                {/* Mobile Links Section */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                    Navigation
                  </p>
                  
                  <Link
                    href="/"
                    className="flex items-center justify-between p-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </Link>

                  {/* Mobile Shop Accordion */}
                  <div className="rounded-xl overflow-hidden">
                    <button
                      onClick={() => setMobileShopOpen(!mobileShopOpen)}
                      className="w-full flex items-center justify-between p-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      Shop
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileShopOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence>
                      {mobileShopOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-gray-50 dark:bg-gray-800/50 px-3"
                        >
                          <div className="py-2 space-y-1">
                            {shopCategories.map((cat) => (
                              <Link
                                key={cat.name}
                                href={cat.href}
                                className="flex items-center gap-3 p-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                                onClick={() => setOpen(false)}
                              >
                                <div className="w-6 h-6 flex items-center justify-center text-purple-500">
                                  {cat.icon}
                                </div>
                                {cat.name}
                              </Link>
                            ))}
                            <Link
                              href="/products"
                              className="flex items-center gap-3 p-2 rounded-lg text-sm font-semibold text-purple-600 hover:underline"
                              onClick={() => setOpen(false)}
                            >
                              View All Products
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href="/about"
                    className="flex items-center justify-between p-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center justify-between p-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Contact
                  </Link>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                  {/* Cart - Mobile */}
                  <Link
                    href="/cart"
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mb-4"
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Shopping Cart
                      </span>
                    </div>
                    {cartCount > 0 && (
                      <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {/* Auth - Mobile */}
                  {session ? (
                    <>
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl mb-4">
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar className="w-12 h-12 ring-2 ring-white dark:ring-gray-800">
                            <AvatarImage src={session.user?.image} alt={session.user?.name} />
                            <AvatarFallback className="bg-purple-600 text-white font-bold">
                              {session.user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                              {session.user?.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {session.user?.email}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setOpen(false)}
                          >
                            <User className="w-5 h-5 text-purple-600" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              My Account
                            </span>
                          </Link>
                          
                          <Link
                            href="/orders"
                            className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setOpen(false)}
                          >
                            <Package className="w-5 h-5 text-purple-600" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              My Orders
                            </span>
                          </Link>
                          
                          <Link
                            href="/wishlist"
                            className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setOpen(false)}
                          >
                            <Heart className="w-5 h-5 text-purple-600" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              Wishlist
                            </span>
                          </Link>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 font-medium"
                        onClick={() => {
                          setOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                      >
                        <LogOut className="mr-2 h-5 w-5" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Button 
                        asChild 
                        className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                      >
                        <Link href="/login" onClick={() => setOpen(false)}>
                          Sign In with Google
                        </Link>
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
