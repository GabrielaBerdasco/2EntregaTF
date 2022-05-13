import FirebaseProdContainer from "../../controllers/products/firebaseProducts";

class ProductsDaoFB extends FirebaseProdContainer {
    constructor(db) {
        super('products', db);
    }
}

export default ProductsDaoFB;