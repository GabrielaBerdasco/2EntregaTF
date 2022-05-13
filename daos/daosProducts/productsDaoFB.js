import FirebaseProdContainer from "../../controllers/products/firebaseProducts";

class ProductsDaoFB extends FirebaseProdContainer {
    constructor() {
        super("products");
    }
}

export default ProductsDaoFB;