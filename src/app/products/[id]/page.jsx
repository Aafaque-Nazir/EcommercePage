import AddToCartButton from "../../../AddToCartButton";


async function getProduct(id) {
const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`, { cache: "no-store" });
const list = await res.json();
return list.find((p) => p.id === id);
}


export default async function ProductDetail({ params }) {
const product = await getProduct(params.id);
if (!product) return <div>Not found</div>;


return (
<div className="grid md:grid-cols-2 gap-8">
<div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-white">
<img src={product.image} alt={product.name} className="object-cover w-full h-full" />
</div>
<div>
<h1 className="text-3xl font-bold">{product.name}</h1>
<p className="mt-2 text-xl">₹{(product.price / 100).toFixed(2)}</p>
<p className="mt-4 text-gray-600">{product.description}</p>
<AddToCartButton product={product} className="mt-6" />
</div>
</div>
);
}