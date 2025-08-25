"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/slices/productsSlice";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.products);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");

  const categories = ["All", "Clothing", "Electronics", "Home", "Shoes", "Wearables", "Audio"];

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => {
        dispatch(setProducts(d));
        setFiltered(d);
      });
  }, [dispatch]);

  // Filter when category changes
  useEffect(() => {
    if (category === "All") {
      setFiltered(list);
    } else {
      setFiltered(list.filter((p) => p.category.toLowerCase() === category.toLowerCase()));
    }
  }, [category, list]);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">All Products</h1>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => {
          const isActive = cat === category;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`
                px-5 py-2 rounded-full font-medium transition
                ${isActive ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg" 
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}
              `}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
