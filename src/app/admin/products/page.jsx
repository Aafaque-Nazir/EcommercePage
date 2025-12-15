"use client";

import AdminGuard from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminComponents";
import { Package, Plus, Pencil, Trash2, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "laptops",
    description: "",
    image: "",
    stock: 100
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      toast.error("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        toast.error(data.error || "Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/admin/products";
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...formData, _id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      const data = await res.json();
      
      if (data.success) {
        toast.success(editingId ? "Product updated successfully" : "Product created successfully");
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ title: "", price: "", category: "laptops", description: "", image: "", stock: 100 });
        fetchProducts();
      } else {
        toast.error(data.error || "Operation failed");
      }
    } catch (error) {
      toast.error("Error saving product");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      stock: product.stock
    });
    setEditingId(product._id);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <AdminSidebar />
        <main className="lg:pl-72 pt-8 transition-all duration-300">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Package className="w-8 h-8 text-green-600" />
                  Products
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your store inventory</p>
              </div>
              <button 
                onClick={() => {
                  setEditingId(null);
                  setFormData({ title: "", price: "", category: "laptops", description: "", image: "", stock: 100 });
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-500/30"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
               
               {/* Search Bar */}
               <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search products..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
               </div>

               {/* Table */}
               <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Stock</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {loading ? (
                       <tr><td colSpan="5" className="p-8 text-center text-gray-500">Loading products...</td></tr>
                    ) : filteredProducts.length === 0 ? (
                       <tr><td colSpan="5" className="p-8 text-center text-gray-500">No products found. Start adding some!</td></tr>
                    ) : filteredProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden border border-gray-200 dark:border-gray-700">
                               <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                               <div className="font-medium text-gray-900 dark:text-white line-clamp-1">{product.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                           {product.category}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                           ₹{product.price}
                        </td>
                         <td className="px-6 py-4 text-sm text-gray-500">
                           {product.stock}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2">
                             <button onClick={() => handleEdit(product)} className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                               <Pencil className="w-4 h-4" />
                             </button>
                             <button onClick={() => handleDelete(product._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                               <Trash2 className="w-4 h-4" />
                             </button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>

        {/* Add Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
             <div className="bg-white dark:bg-gray-900 w-[95%] max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 scrollbar-hide">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                   <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingId ? "Edit Product" : "Add New Product"}</h2>
                   <button onClick={() => setIsModalOpen(false)}><X className="text-gray-500 hover:text-gray-900" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                      <input 
                        required
                        type="text" 
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white"
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
                        <input 
                          required
                          type="number" 
                          value={formData.price}
                          onChange={e => setFormData({...formData, price: e.target.value})}
                          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                        <input 
                          type="number" 
                          value={formData.stock}
                          onChange={e => setFormData({...formData, stock: e.target.value})}
                          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white"
                        />
                      </div>
                   </div>
                   <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                        <select 
                          value={formData.category}
                          onChange={e => setFormData({...formData, category: e.target.value})}
                          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white dark:bg-gray-900"
                        >
                          <option value="laptops" className="dark:bg-gray-800 text-gray-900 dark:text-white">Laptops</option>
                          <option value="mobiles" className="dark:bg-gray-800 text-gray-900 dark:text-white">Mobiles</option>
                          <option value="smart-watches" className="dark:bg-gray-800 text-gray-900 dark:text-white">Smart Watches</option>
                          <option value="headphones" className="dark:bg-gray-800 text-gray-900 dark:text-white">Headphones</option>
                          <option value="accessories" className="dark:bg-gray-800 text-gray-900 dark:text-white">Accessories</option>
                        </select>
                   </div>
                   <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                        <input 
                          required
                          type="url" 
                          placeholder="https://..."
                          value={formData.image}
                          onChange={e => setFormData({...formData, image: e.target.value})}
                          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white"
                        />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                      <textarea 
                        required
                        rows={3}
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white"
                      />
                   </div>
                   
                   <button type="submit" className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all">
                      {editingId ? "Update Product" : "Create Product"}
                   </button>
                </form>
             </div>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
