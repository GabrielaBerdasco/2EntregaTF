import FirebaseProdContainer from "../../controllers/products/firebaseProducts.js";

class ProductsDaoFB extends FirebaseProdContainer {
    constructor(db) {
        super(db, 'products');
    }
}

export default ProductsDaoFB;