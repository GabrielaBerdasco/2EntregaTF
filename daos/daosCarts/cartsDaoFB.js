import FirebaseCartsContainer from "../../controllers/carts/firebaseCarts.js";

class CartsDaoFB extends FirebaseCartsContainer {
    constructor(db) {
        super(db, 'carts');
    }
}

export default CartsDaoFB;