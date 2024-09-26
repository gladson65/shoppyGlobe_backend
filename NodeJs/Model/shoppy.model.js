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



const cartSchema = new Schema({

    product_id: {
        type: String,
        unique: true,
        required: true
    },

    quantities: {
        type: Number,
        required: true
    }

})


export const productModel = mongoose.model("products", ProductSchema);
export const cartModel = mongoose.model("cart", cartSchema);
