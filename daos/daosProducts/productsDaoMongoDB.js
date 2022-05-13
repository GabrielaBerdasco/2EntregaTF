import MongoProductsContainer from "../../controllers/products/mongoDBProducts";

class ProductsDaoMongoDB extends MongoProductsContainer {
    constructor() {
        super("products", {
            date: { type: Date, default: Date.now },
            image: { type: String, required: true },
            name: { type: String, required: true, max: 100 },
            description: { type: String, required: true, max: 300 },
            price: {type: Number, required: true },
            stock: { type: Number, required: true },
            code: { type: String, required: true }
        });
    }
}

export default ProductsDaoMongoDB;