import CartContainer from "../../controllers/carts/cartController";

class CartsDaoFS extends CartContainer {
    constructor() {
        super('./db/cart.txt');
    }
}

export default CartsDaoFS;