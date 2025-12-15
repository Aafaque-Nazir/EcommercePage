import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a product title"],
            maxlength: [60, "Title cannot be more than 60 characters"],
        },
        description: {
            type: String,
            required: [true, "Please provide a product description"],
        },
        price: {
            type: Number,
            required: [true, "Please provide a product price"],
        },
        category: {
            type: String,
            required: [true, "Please provide a product category"],
            // Explicitly defining enum values to avoid validation errors
            enum: ['laptops', 'mobiles', 'smart-watches', 'headphones', 'accessories'],
        },
        image: {
            type: String,
            required: [true, "Please provide an image URL"],
        },
        rating: {
            rate: { type: Number, default: 4.5 },
            count: { type: Number, default: 0 }
        },
        stock: {
            type: Number,
            default: 100
        },
        isFeatured: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// Delete the model if it exists to force a fresh compilation with new enum values
// This fixes the HMR issue where the old enum is cached
if (mongoose.models.Product) {
    delete mongoose.models.Product;
}

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
