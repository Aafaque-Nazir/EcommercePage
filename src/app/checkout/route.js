import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(req) {
try {
const { items } = await req.json();
const line_items = items.map((i) => ({
price_data: {
currency: "inr",
product_data: { name: i.name },
unit_amount: i.price, // already in paise
},
quantity: i.qty,
}));


const session = await stripe.checkout.sessions.create({
mode: "payment",
payment_method_types: ["card"],
line_items,
success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?success=1`,
cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
});


return new Response(JSON.stringify({ url: session.url }), { status: 200 });
} catch (e) {
console.error(e);
return new Response(JSON.stringify({ error: "Checkout error" }), { status: 500 });
}
}