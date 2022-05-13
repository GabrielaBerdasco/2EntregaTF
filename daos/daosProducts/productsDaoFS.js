import ProductsContainer from "../../controllers/products/productsController";

class ProductsDaoFS extends ProductsContainer {
    constructor() {
        super('./db/products.txt');
    }
}

export default ProductsDaoFS;