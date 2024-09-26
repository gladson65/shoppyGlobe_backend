import { productModel, cartModel } from "../Model/shoppy.model.js";


var cartItems;

export function checkData(result) {
    cartItems = result;
}


export function getProducts(req, res) {

    productModel.find().then((data) => {

        if (!data) {
            return res.status(404).json({message: "No data found!"})
        }

        console.log(cartItems)
        res.json(data);
    
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
}



export function getProductById(req, res) {

    const _id = req.params.id;

    productModel.findById(_id).then((data) => {

        if (!data) {
            return res.status(404).json({messge: `No data found with this '${_id}' ID`})
        }

        res.json(data)
    
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
}



export function createProduct(req, res) {

    const { name, price, description, stock_quantity } = req.body;

    // data preparation for Schema
    const newProduct = new productModel({
        name,
        price,
        description,
        stock_quantity
    })

    newProduct.save().then((data) => {

        if (!data) {
            return res.status(400).json({message: "Something went wrong"});
        }

        res.send(data)
    
    }).catch(error => {
        return res.status(500).json({error: error.message})
    });
    
}


// "name": "Notebook",
// "price": 60,
// "description": "jdbvohbdvjbkvjhbdvohdlh",
// "stock_quantity: 500

// {
//     "product_id": "66f2ddb30b6003e7d2fc07a1",
//     "quantities": 1
//   }

export function createCart(req, res) {

    const { product_id, quantities } = req.body;

    if (!product_id) {
        return res.json({message: "Key Should be 'product_id'"})
    }

    if (!quantities) {
        return res.json({message: "Key Should be 'quantities'"})
    }


    // check at first the item is already in the cart or not
    cartModel.findOne({product_id: `${product_id}`}).then((data) => {

        if (!data) {

            //Insert Item into the database if the item not in database already
            // preparing data to put inside the database
             const newCart = new cartModel({
                product_id,
                quantities
            })

            newCart.save().then((data) => {

                if(!data) {
                    return res.status(400).json({message: "Something Went Wrong!"})
                }

                res.status(201).json({message: "Item added to the cart", item: data});
            
            })


        } else {
            res.send("Product is already in the cart. Check in the cart section");
        }
    
    }).catch((error) => {
        return res.json({error: error.message})
    })
    
}



export function updateQuantity(req, res) {

    const { product_id, quantities } = req.body;

    if (!product_id) {
        return res.json({message: "Key Should be 'product_id'"})
    }

    if (!quantities) {
        return res.json({message: "Key Should be 'quantities'"})
    }



    const pId = {product_id: `${product_id}`};


    cartModel.findOneAndUpdate(pId, quantities).then((product) => {

        if (!product) {
            return res.status(404).json({message: `No such data with id: "${req.body.product_id}" to update product quantity`})
        }

        return res.status(201).json({message: "Quantity successfully updated", update: req.body })


    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
}


export function showCartItems(req, res) {

    cartModel.find({}).then((data) => {

        if (!data) {
            return res.status(200).json({message: "Cart is empty!"})
        }

        res.status(200).json(data)
    
    }).catch((error) => {
        return res.status(500).json({error: error.message});
    })
}



export function removeCartProduct(req, res) {

    const pId = {product_id: `${req.params.id}`};

    cartModel.findOneAndDelete(pId).then((data) => {

        if(!data) {
            return res.status(404).json({message: `No such data with ID:${req.params.id} to delete.`})
        }

        res.send("Product removed from the cart")
    
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
}