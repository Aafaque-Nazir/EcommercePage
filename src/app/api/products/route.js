export async function GET() {
  // prices in INR (realistic)
  const products = [
    // Shoes (10 products)
    { id: "p1", title: "Air Lite Sneakers", price: 4999, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80", category: "Shoes", description: "Feather-light knit upper." },
    { id: "p2", title: "Urban Runner Shoes", price: 3499, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80", category: "Shoes", description: "Comfortable daily wear." },
    { id: "p3", title: "Classic Leather Boots", price: 6999, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80", category: "Shoes", description: "Premium leather, durable sole." },
    { id: "p19", title: "Sports Training Shoes", price: 5499, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&auto=format&fit=crop&q=80", category: "Shoes", description: "High-performance athletic shoes." },
    { id: "p20", title: "Casual Canvas Sneakers", price: 2299, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80", category: "Shoes", description: "Breathable canvas, all-day comfort." },
    { id: "p21", title: "Formal Oxford Shoes", price: 5999, image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop&q=80", category: "Shoes", description: "Elegant design for formal occasions." },
    { id: "p22", title: "Women's High Heels", price: 4499, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80", category: "Shoes", description: "Stylish heels with cushioned insoles." },
    { id: "p23", title: "Trail Hiking Boots", price: 7499, image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop&q=80", category: "Shoes", description: "Waterproof, grippy outsole." },
    { id: "p53", title: "Running Shoes Pro", price: 6499, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80", category: "Shoes", description: "Lightweight, responsive cushioning." },
    { id: "p54", title: "Slip-On Loafers", price: 3299, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80", category: "Shoes", description: "Easy wear, comfortable fit." },

    // Wearables (8 products)
    { id: "p4", title: "Smart Watch Pro", price: 8999, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80", category: "Wearables", description: "AMOLED, 7-day battery." },
    { id: "p5", title: "Fitness Tracker X", price: 2999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80", category: "Wearables", description: "Heart-rate monitoring & sleep tracker." },
    { id: "p24", title: "Smart Band Lite", price: 1999, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80", category: "Wearables", description: "Affordable fitness tracking." },
    { id: "p25", title: "GPS Running Watch", price: 12999, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80", category: "Wearables", description: "GPS tracking, route mapping." },
    { id: "p26", title: "Kids Smart Watch", price: 3499, image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=600&auto=format&fit=crop&q=80", category: "Wearables", description: "Safe tracking for kids with SOS." },
    { id: "p55", title: "Hybrid Smartwatch", price: 7999, image: "https://images.unsplash.com/photo-1617625802912-cde586faf331?w=600&auto=format&fit=crop&q=80", category: "Wearables", description: "Classic design, smart features." },
    { id: "p56", title: "Activity Tracker Ring", price: 4999, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80", category: "Wearables", description: "Sleek ring, comprehensive tracking." },
    { id: "p57", title: "Sports Watch Digital", price: 2499, image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&auto=format&fit=crop&q=80", category: "Wearables", description: "Multi-sport modes, waterproof." },

    // Audio (10 products)
    { id: "p6", title: "Noise Cancelling Earbuds", price: 3999, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80", category: "Audio", description: "Crystal-clear sound, compact design." },
    { id: "p7", title: "Bass Headphones", price: 2999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80", category: "Audio", description: "Active noise canceling." },
    { id: "p27", title: "Wireless Neckband", price: 1499, image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80", category: "Audio", description: "Magnetic earbuds, 20hr battery." },
    { id: "p28", title: "Studio Headphones", price: 6999, image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&auto=format&fit=crop&q=80", category: "Audio", description: "Professional audio quality." },
    { id: "p29", title: "Portable Bluetooth Speaker", price: 2499, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80", category: "Audio", description: "360° sound, waterproof IPX7." },
    { id: "p30", title: "Gaming Headset", price: 3499, image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=600&auto=format&fit=crop&q=80", category: "Audio", description: "RGB lighting, surround sound 7.1." },
    { id: "p31", title: "True Wireless Earbuds", price: 5999, image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=600&auto=format&fit=crop&q=80", category: "Audio", description: "Premium sound, touch controls." },
    { id: "p58", title: "Party Speaker XL", price: 8999, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80", category: "Audio", description: "Powerful bass, LED lights." },
    { id: "p59", title: "Soundbar 2.1", price: 9999, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80", category: "Audio", description: "Home theater sound, wireless subwoofer." },
    { id: "p60", title: "Wired Earphones Pro", price: 999, image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80", category: "Audio", description: "Superior sound, durable cable." },

    // Electronics (14 products)
    { id: "p8", title: "4K LED Monitor", price: 14999, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80", category: "Electronics", description: "Ultra HD display, vibrant colors." },
    { id: "p9", title: "Gaming Keyboard RGB", price: 1999, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80", category: "Electronics", description: "Mechanical keys, customizable lighting." },
    { id: "p32", title: "Wireless Gaming Mouse", price: 2499, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&auto=format&fit=crop&q=80", category: "Electronics", description: "High DPI, ergonomic design." },
    { id: "p33", title: "Laptop Stand Aluminum", price: 1299, image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&auto=format&fit=crop&q=80", category: "Electronics", description: "Adjustable height, cooling vents." },
    { id: "p34", title: "USB-C Hub 7-in-1", price: 1799, image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=600&auto=format&fit=crop&q=80", category: "Electronics", description: "HDMI, USB 3.0, SD card reader." },
    { id: "p35", title: "Wireless Charger 15W", price: 899, image: "https://images.unsplash.com/photo-1591290619762-a03c6f5a102d?w=600&auto=format&fit=crop&q=80", category: "Electronics", description: "Fast charging, LED indicator." },
    { id: "p36", title: "Power Bank 20000mAh", price: 1999, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&auto=format&fit=crop&q=80", category: "Electronics", description: "Dual USB ports, quick charge." },
    { id: "p37", title: "Webcam Full HD 1080p", price: 2799, image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=600&auto=format&fit=crop&q=80", category: "Electronics", description: "Auto-focus, built-in microphone." },
    { id: "p38", title: "Smart LED Bulb", price: 599, image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&auto=format&fit=crop&q=80", category: "Electronics", description: "WiFi, 16M colors, voice control." },
    { id: "p39", title: "Security Camera WiFi", price: 3999, image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=600&auto=format&fit=crop&q=80", category: "Electronics", description: "Night vision, motion detection." },
    { id: "p61", title: "Tablet 10-inch", price: 16999, image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=80", category: "Electronics", description: "HD display, 64GB storage." },
    { id: "p62", title: "External SSD 1TB", price: 7999, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80", category: "Electronics", description: "Fast transfer, compact design." },
    { id: "p63", title: "Bluetooth Adapter", price: 499, image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=600&auto=format&fit=crop&q=80", category: "Electronics", description: "USB dongle, long range." },
    { id: "p64", title: "Smart Plug WiFi", price: 799, image: "https://images.unsplash.com/photo-1558089687-0b4c4f0b6c2a?w=600&auto=format&fit=crop&q=80", category: "Electronics", description: "Voice control, scheduling." },

    // Clothing (14 products)
    { id: "p10", title: "Men's Casual Shirt", price: 1599, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "Cotton blend, slim fit." },
    { id: "p11", title: "Women's Summer Dress", price: 1899, image: "https://images.unsplash.com/photo-1585487000143-6b5f3f82a91a?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "Lightweight, floral design." },
    { id: "p12", title: "Denim Jeans", price: 2199, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "Stretchable, comfortable fit." },
    { id: "p13", title: "Hoodie Unisex", price: 1299, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "Soft fleece, cozy wear." },
    { id: "p40", title: "Men's Formal Blazer", price: 4999, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "Tailored fit, professional look." },
    { id: "p41", title: "Women's Yoga Pants", price: 1199, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "Stretchable fabric, moisture-wicking." },
    { id: "p42", title: "Men's Sports T-Shirt", price: 799, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "Quick-dry, breathable mesh." },
    { id: "p43", title: "Winter Jacket", price: 3999, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "Insulated, windproof design." },
    { id: "p44", title: "Women's Ethnic Kurti", price: 1499, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "Traditional design, cotton fabric." },
    { id: "p45", title: "Men's Chino Pants", price: 1999, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "Slim fit, versatile style." },
    { id: "p65", title: "Women's Cardigan", price: 1799, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "Soft knit, button-up style." },
    { id: "p66", title: "Men's Track Pants", price: 1099, image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "Athletic fit, side pockets." },
    { id: "p67", title: "Women's Leggings", price: 899, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "High-waist, compression fit." },
    { id: "p68", title: "Oversized Sweatshirt", price: 1599, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80", category: "Clothing", description: "Relaxed fit, cotton blend." },

    // Home / Kitchen (16 products)
    { id: "p14", title: "Ceramic Dinner Set", price: 3499, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&q=80", category: "Home", description: "12-piece set, dishwasher safe." },
    { id: "p15", title: "LED Desk Lamp", price: 799, image: "https://images.unsplash.com/photo-1621447980929-6638614633c8?w=600&auto=format&fit=crop&q=80", category: "Home", description: "Adjustable brightness, modern design." },
    { id: "p16", title: "Memory Foam Pillow", price: 999, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80", category: "Home", description: "Soft, ergonomic support." },
    { id: "p17", title: "Electric Kettle", price: 1499, image: "https://images.unsplash.com/photo-1563689014-9834b8d02b7e?w=600&auto=format&fit=crop&q=80", category: "Home", description: "1.7L capacity, fast boil." },
    { id: "p18", title: "Blender Mixer", price: 2299, image: "https://images.unsplash.com/photo-1585515320310-259814ba29d6?w=600&auto=format&fit=crop&q=80", category: "Home", description: "Multi-speed, stainless steel blades." },
    { id: "p46", title: "Air Fryer 4.5L", price: 4999, image: "https://images.unsplash.com/photo-1585515320310-259814ba29d6?w=600&auto=format&fit=crop&q=80", category: "Home", description: "Oil-free cooking, digital display." },
    { id: "p47", title: "Vacuum Cleaner Cordless", price: 8999, image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80", category: "Home", description: "Powerful suction, rechargeable." },
    { id: "p48", title: "Coffee Maker", price: 3299, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80", category: "Home", description: "Programmable, 12-cup capacity." },
    { id: "p49", title: "Non-Stick Cookware Set", price: 2999, image: "https://images.unsplash.com/photo-1584990347449-39b4aa38c968?w=600&auto=format&fit=crop&q=80", category: "Home", description: "5-piece set, induction compatible." },
    { id: "p50", title: "Wall Clock Digital", price: 699, image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&auto=format&fit=crop&q=80", category: "Home", description: "LED display, temperature sensor." },
    { id: "p51", title: "Curtains Blackout", price: 1599, image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=80", category: "Home", description: "Light blocking, thermal insulated." },
    { id: "p52", title: "Microwave Oven 20L", price: 6999, image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&auto=format&fit=crop&q=80", category: "Home", description: "Solo type, auto cook menus." },
    { id: "p69", title: "Bedsheet Cotton", price: 1299, image: "https://images.unsplash.com/photo-1615800001234-9fb1d7abb9bb?w=600&auto=format&fit=crop&q=80", category: "Home", description: "Double bed, premium cotton." },
    { id: "p70", title: "Table Fan 16-inch", price: 1899, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80", category: "Home", description: "High-speed, adjustable tilt." },
    { id: "p71", title: "Rice Cooker 1.8L", price: 2499, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80", category: "Home", description: "Automatic keep-warm function." },
    { id: "p72", title: "Iron Steam Press", price: 1499, image: "https://images.unsplash.com/photo-1580459849352-26d3a67ee162?w=600&auto=format&fit=crop&q=80", category: "Home", description: "Non-stick sole, spray function." },
  ];

  return new Response(JSON.stringify(products), { headers: { "Content-Type": "application/json" } });
}
