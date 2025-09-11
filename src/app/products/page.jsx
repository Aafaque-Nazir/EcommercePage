"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/slices/productsSlice";
import ProductCard from "../../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.products);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  const categories = [
    "All",
    "Clothing",
    "Electronics",
    "Home",
    "Shoes",
    "Wearables",
    "Audio",
  ];

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => {
        dispatch(setProducts(d));
        setFiltered(d);
      });
  }, [dispatch]);

  // Filtering + Searching + Sorting
  useEffect(() => {
    let items = [...list];

    if (category !== "All") {
      items = items.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
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
  }, [category, search, sort, list]);

  return (
    <section className="p-6">
      {/* Header */}
      <div className="flex mt-4 flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Explore Products
        </h1>

        {/* Search + Sort */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="latest">Latest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="az">A - Z</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap  gap-3 mb-8">
        {categories.map((cat) => {
          const isActive = cat === category;
          return (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                isActive
                  ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {cat}
            </motion.button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center mt-20">
          No products found
        </p>
      ) : (
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
