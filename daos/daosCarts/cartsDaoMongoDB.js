import { Schema } from "mongoose";
import MongoCartsContainer from "../../controllers/carts/mongoDBCarts";

const schema = new Schema({
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