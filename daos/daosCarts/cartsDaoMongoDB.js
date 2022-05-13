import MongoCartsContainer from "../../controllers/carts/mongoDBCarts";

class CartsDaoMongoDB extends MongoCartsContainer {
    constructor() {
        super("carts", {
            id: {type: Number},
            date: { type: Date, default: Date.now },
            user: { type: String, required: true },
            products: { type: Array, required: true }
        });
    }
}

export default CartsDaoMongoDB;