const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is missing from .env.local");
    process.exit(1);
}

const orderSchema = new mongoose.Schema({
    orderId: String,
    amount: Number,
    status: String
}, { strict: false });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

async function checkDB() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("✅ MongoDB Connected Successfully!");

        const count = await Order.countDocuments();
        console.log(`📊 Total Orders in DB: ${count}`);

        if (count > 0) {
            const orders = await Order.find().sort({ _id: -1 }).limit(10);
            console.log("---------------------------------------------------");
            console.log("Recent Orders Dump:");
            orders.forEach(o => {
                console.log(`ID: ${o.orderId} | Email: ${o.customer?.email} | Status: ${o.status}`);
            });
            console.log("---------------------------------------------------");
        } else {
            console.log("⚠️ No orders found. If you placed one, it might not have saved.");
        }

        process.exit(0);
    } catch (error) {
        console.error("❌ Connection failed:", error);
        process.exit(1);
    }
}

checkDB();
