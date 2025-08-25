import Link from "next/link"

export default function ProductCard({ product }) {
  return (
    <div className="p-4 border rounded-xl shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
      <h2 className="mt-3 text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">₹{product.price}</p>
      <Link
        href={`/product/${product.id}`}
        className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-lg"
      >
        View Details
      </Link>
    </div>
  )
}
