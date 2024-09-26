import jwt from "jsonwebtoken";
import { 
    createProduct, 
    createCart,
    getProducts,
    getProductById,
    updateQuantity,
    showCartItems,
    removeCartProduct 
} from "../Controller/shoppy.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";


export function shoppyRoutes(app) {

    app.get("/products", getProducts),
    app.get("/products/:id", getProductById),
    app.get("/cartitems", verifyToken, showCartItems),
    app.post("/product", createProduct),
    app.post("/cart", verifyToken, createCart),
    app.put("/cart", verifyToken, updateQuantity),
    app.delete("/cart/:id", removeCartProduct)
}