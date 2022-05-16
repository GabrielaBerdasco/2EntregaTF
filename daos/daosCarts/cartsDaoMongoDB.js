import mongoose from "mongoose";
import MongoCartsContainer from "../../controllers/carts/mongoDBCarts.js";

const schema = new mongoose.Schema({
    id: {type: Number},
    date: { type: Date, default: Date.now },
    user: { type: String, required: true },
    products: { type: Array, required: true }
})

class CartsDaoMongoDB extends MongoCartsContainer {
    constructor() {
        super("carts", schema);
    }
}

export default CartsDaoMongoDB;