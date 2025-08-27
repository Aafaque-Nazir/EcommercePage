export async function GET() {
  // prices in INR (realistic)
  const products = [
    // Shoes
    { id: "p1", title: "Air Lite Sneakers", price: 4999, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80", category: "Shoes", description: "Feather-light knit upper." },
    { id: "p2", title: "Urban Runner Shoes", price: 3499, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D", category: "Shoes", description: "Comfortable daily wear." },
    { id: "p3", title: "Classic Leather Boots", price: 6999, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80", category: "Shoes", description: "Premium leather, durable sole." },

    // Wearables
    { id: "p4", title: "Smart Watch Pro", price: 8999, image: "https://images.unsplash.com/photo-1655215920713-94440bf7213f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaCUyMHByb3xlbnwwfHwwfHx8MA%3D%3D", category: "Wearables", description: "AMOLED, 7-day battery." },
    { id: "p5", title: "Fitness Tracker X", price: 2999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80", category: "Wearables", description: "Heart-rate monitoring & sleep tracker." },

    // Audio
    { id: "p6", title: "Noise Cancelling Earbuds", price: 3999, image: "https://media.istockphoto.com/id/1254998855/photo/airpod-with-black-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=1Wzz7CKrZHSh4Gyk-U9OHC62en4kPzaSGazQb33zkSg=", category: "Audio", description: "Crystal-clear sound, compact design." },
    { id: "p7", title: "Bass Headphones", price: 2999, image: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D", category: "Audio", description: "Active noise canceling." },

    // Electronics
    { id: "p8", title: "4K LED Monitor", price: 14999, image: "https://media.istockphoto.com/id/611294276/photo/uhd-4k-smart-tv-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=2eqTM2U7NqFAW2oxmCWPPMssIpvjZP9Edg3Ku7Ixn5o=", category: "Electronics", description: "Ultra HD display, vibrant colors." },
    { id: "p9", title: "Gaming Keyboard RGB", price: 1999, image: "https://media.istockphoto.com/id/1393718340/photo/esport-rgb-mouse-and-keyboard.webp?a=1&b=1&s=612x612&w=0&k=20&c=mgUvKo4nOTkakobYih4jyNzQ8H4dAR5tdisspOuQs4U=", category: "Electronics", description: "Mechanical keys, customizable lighting." },

    // Clothing
    { id: "p10", title: "Men's Casual Shirt", price: 1599, image: "https://images.unsplash.com/photo-1634136918547-8c1dd23c4602?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGNhc3VhbCUyMHNoaXJ0fGVufDB8fDB8fHww", category: "Clothing", description: "Cotton blend, slim fit." },
    { id: "p11", title: "Women's Summer Dress", price: 1899, image: "https://media.istockphoto.com/id/1397185406/photo/portrait-of-woman-smiling-against-wall-with-palm-tree-shade.webp?a=1&b=1&s=612x612&w=0&k=20&c=u-KmGiwJG4H40WaMrVICw_CbMm9hdtBIrbxw2bbD0hc=", category: "Clothing", description: "Lightweight, floral design." },
    { id: "p12", title: "Denim Jeans", price: 2199, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "Stretchable, comfortable fit." },
    { id: "p13", title: "Hoodie Unisex", price: 1299, image: "https://images.unsplash.com/photo-1633332529545-41bba9ef67dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dW5pc2V4JTIwaG9vZGllfGVufDB8fDB8fHww", category: "Clothing", description: "Soft fleece, cozy wear." },

    // Home / Kitchen
    { id: "p14", title: "Ceramic Dinner Set", price: 3499, image: "https://media.istockphoto.com/id/183804580/photo/sri-lankan-cuisine.webp?a=1&b=1&s=612x612&w=0&k=20&c=0L5a8K8mV-UYzZcDJ3M8OKs4Dv4MkofTEryu7Mqq5fM=", category: "Home", description: "12-piece set, dishwasher safe." },
    { id: "p15", title: "LED Desk Lamp", price: 799, image: "https://images.unsplash.com/photo-1621447980929-6638614633c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGVzayUyMGxhbXB8ZW58MHx8MHx8fDA%3D", category: "Home", description: "Adjustable brightness, modern design." },
    { id: "p16", title: "Memory Foam Pillow", price: 999, image: "https://media.istockphoto.com/id/491392870/photo/stack-of-soft-pillows.webp?a=1&b=1&s=612x612&w=0&k=20&c=D4XtbBgkXkI6xvN9S8JwYi7duf-KxYRiTnfWFRfgv7I=", category: "Home", description: "Soft, ergonomic support." },
    { id: "p17", title: "Electric Kettle", price: 1499, image: "https://media.istockphoto.com/id/1254254675/photo/stainless-electric-kettle-on-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=bW3ey9ZY7tRTF6bhH1V5V6rQ4GiZpiL9BpzO3hF--20=", category: "Home", description: "1.7L capacity, fast boil." },
    { id: "p18", title: "Blender Mixer", price: 2299, image: "https://media.istockphoto.com/id/2169446825/photo/electric-mixer-grinder.webp?a=1&b=1&s=612x612&w=0&k=20&c=oyOV4TkWrRXLDyhR4sY2J3gsqyOn2nAdzBe0Ee-nRKc=", category: "Home", description: "Multi-speed, stainless steel blades." },
  ];

  return new Response(JSON.stringify(products), { headers: { "Content-Type": "application/json" } });
}
