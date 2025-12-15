
"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function SearchBar({ onSearchSubmit }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef(null);
  const router = useRouter();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced Search Effect
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        try {
          const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
          const data = await res.json();
          if (data.success) {
            setResults(data.results);
            setShowResults(true);
          }
        } catch (error) {
          console.error("Search error", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
      setShowResults(false);
      if (onSearchSubmit) onSearchSubmit();
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setShowResults(true); }}
          className="w-full pl-10 pr-10 py-2.5 bg-black border border-zinc-800 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all placeholder:text-gray-500 text-white text-sm font-medium"
        />
        {query && (
            <button 
                type="button"
                onClick={() => { setQuery(""); setResults([]); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500"
            >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
            </button>
        )}
      </form>

      {/* Autocomplete Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-[300px] overflow-y-auto">
            {results.length > 0 ? (
              <>
                <div className="p-2 space-y-1">
                    {results.map((product) => (
                    <Link 
                        key={product._id} 
                        href={`/products/${product._id}`}
                        onClick={() => setShowResults(false)}
                        className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-zinc-900 transition-colors group"
                    >
                        <div className="h-10 w-10 bg-zinc-900 rounded-md overflow-hidden flex-shrink-0">
                            <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-white truncate group-hover:text-green-500 transition-colors">{product.title}</h4>
                            <p className="text-xs text-gray-400">In {product.category}</p>
                        </div>
                        <div className="text-sm font-semibold text-green-600">
                            ₹{product.price}
                        </div>
                    </Link>
                    ))}
                </div>
                <div className="border-t border-zinc-800 p-2 bg-zinc-900/50">
                    <Link 
                        href={`/products?search=${encodeURIComponent(query)}`}
                        onClick={() => setShowResults(false)}
                        className="flex items-center justify-center gap-2 text-sm font-medium text-green-500 hover:text-green-600 py-1.5"
                    >
                        View all {results.length}+ results
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
              </>
            ) : (
                <div className="p-8 text-center text-gray-400">
                    <p>No products found for "{query}"</p>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
