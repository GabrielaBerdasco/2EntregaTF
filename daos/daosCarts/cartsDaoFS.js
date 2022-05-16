import CartContainer from "../../controllers/carts/cartController.js";

class CartsDaoFS extends CartContainer {
    constructor() {
        super('./db/cart.txt');
    }
}

export default CartsDaoFS;