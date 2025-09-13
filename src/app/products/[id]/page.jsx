import AddToCartButton from "../../../components/AddToCartButton";

async function getProduct(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/products`,
    { cache: "no-store" }
  );
  const list = await res.json();
  return list.find((p) => p.id.toString() === id.toString());
}

export default async function ProductDetail({ params }) {
  const product = await getProduct(params.id);
  if (!product)
    return <div className="text-center mt-20 text-gray-500">Not found</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT - PRODUCT IMAGE */}
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT - PRODUCT DETAILS */}
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl sm:text-4xl font-extrabold text-purple-600">
              ₹{product.price}
            </span>
            {product.oldPrice && (
              <span className="line-through text-gray-400 text-lg">
                ₹{product.oldPrice}
              </span>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <AddToCartButton
              product={product}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md hover:from-purple-600 hover:to-pink-600 transition"
            />
            <button className="flex-1 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium shadow-md hover:bg-black transition">
              Buy Now
            </button>
          </div>

          {/* EXTRA INFO */}
          <div className="space-y-3 text-sm sm:text-base text-gray-700">
            <p className="flex items-center gap-2">
              ✅ Free shipping on orders above ₹999
            </p>
            <p className="flex items-center gap-2">
              ✅ Easy 7-day return & refund policy
            </p>
            <p className="flex items-center gap-2">
              ✅ Cash on Delivery available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
