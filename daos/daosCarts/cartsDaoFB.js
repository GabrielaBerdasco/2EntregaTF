import FirebaseCartsContainer from "../../controllers/carts/firebaseCarts";

class CartsDaoFB extends FirebaseCartsContainer {
    constructor() {
        super("carts");
    }
}

export default CartsDaoFB;