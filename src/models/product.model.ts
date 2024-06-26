import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, },
    description: { type: String, required: true },
    image: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
}, { timestamps: true });

export const ProductModel = mongoose.model('Product', ProductSchema);
