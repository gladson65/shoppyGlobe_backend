import mongoose from "mongoose";


// creating schema
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    stock_quantity: {
        type: Number,
        required: true
    }
})


const productModel = mongoose.model("products", ProductSchema);
export default productModel;
