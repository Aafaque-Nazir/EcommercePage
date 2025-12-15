import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
        },
        customer: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String },
            address: { type: String },
        },
        items: [
            {
                id: String,
                title: String,
                price: Number,
                qty: Number,
                image: String,
            },
        ],
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "placed", "paid", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
        paymentId: {
            type: String,
        },
    },
    { timestamps: true }
);

// Prevent overwrite model error
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
