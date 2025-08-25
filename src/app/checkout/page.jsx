export default function CheckoutResult({ searchParams }) {
const success = searchParams?.success === "1";
return (
<div className="mx-auto max-w-xl text-center space-y-2">
<h1 className="text-3xl font-bold">{success ? "Payment successful" : "Payment canceled"}</h1>
<p className="text-gray-600">{success ? "Thanks for your order!" : "You can try again from your cart."}</p>
</div>
);
}