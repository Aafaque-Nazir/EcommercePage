export async function GET() {
  // prices in paise (realistic)
  const products = [
    // Shoes
    { id: "p1", name: "Air Lite Sneakers", price: 4999, image: "/images/sneaker-1.jpg", category: "Shoes", description: "Feather-light knit upper." },
    { id: "p2", name: "Urban Runner Shoes", price: 3499, image: "/images/sneaker-2.jpg", category: "Shoes", description: "Comfortable daily wear." },
    { id: "p3", name: "Classic Leather Boots", price: 6999, image: "/images/boots-1.jpg", category: "Shoes", description: "Premium leather, durable sole." },

    // Wearables / Electronics
    { id: "p4", name: "Smart Watch Pro", price: 8999, image: "/images/watch-1.jpg", category: "Wearables", description: "AMOLED, 7-day battery." },
    { id: "p5", name: "Fitness Tracker X", price: 2999, image: "/images/watch-2.jpg", category: "Wearables", description: "Heart-rate monitoring & sleep tracker." },
    { id: "p6", name: "Noise Cancelling Earbuds", price: 3999, image: "/images/earbuds-1.jpg", category: "Audio", description: "Crystal-clear sound, compact design." },
    { id: "p7", name: "Bass Headphones", price: 2999, image: "/images/headphones-1.jpg", category: "Audio", description: "Active noise canceling." },
    { id: "p8", name: "4K LED Monitor", price: 14999, image: "/images/monitor-1.jpg", category: "Electronics", description: "Ultra HD display, vibrant colors." },
    { id: "p9", name: "Gaming Keyboard RGB", price: 1999, image: "/images/keyboard-1.jpg", category: "Electronics", description: "Mechanical keys, customizable lighting." },

    // Clothing
    { id: "p10", name: "Men's Casual Shirt", price: 1599, image: "/images/shirt-1.jpg", category: "Clothing", description: "Cotton blend, slim fit." },
    { id: "p11", name: "Women's Summer Dress", price: 1899, image: "/images/dress-1.jpg", category: "Clothing", description: "Lightweight, floral design." },
    { id: "p12", name: "Denim Jeans", price: 2199, image: "/images/jeans-1.jpg", category: "Clothing", description: "Stretchable, comfortable fit." },
    { id: "p13", name: "Hoodie Unisex", price: 1299, image: "/images/hoodie-1.jpg", category: "Clothing", description: "Soft fleece, cozy wear." },

    // Home / Kitchen
    { id: "p14", name: "Ceramic Dinner Set", price: 3499, image: "/images/dinner-set-1.jpg", category: "Home", description: "12-piece set, dishwasher safe." },
    { id: "p15", name: "LED Desk Lamp", price: 799, image: "/images/lamp-1.jpg", category: "Home", description: "Adjustable brightness, modern design." },
    { id: "p16", name: "Memory Foam Pillow", price: 999, image: "/images/pillow-1.jpg", category: "Home", description: "Soft, ergonomic support." },
    { id: "p17", name: "Electric Kettle", price: 1499, image: "/images/kettle-1.jpg", category: "Home", description: "1.7L capacity, fast boil." },
    { id: "p18", name: "Blender Mixer", price: 2299, image: "/images/blender-1.jpg", category: "Home", description: "Multi-speed, stainless steel blades." },
  ];

  return new Response(JSON.stringify(products), { headers: { "Content-Type": "application/json" } });
}
