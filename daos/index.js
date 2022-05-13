import 'dotenv/config';

let productsDao;
let cartsDao;

console.log(process.env.PERSISTENCIA);

switch(process.env.PERSISTENCIA) {
    case 'mongodb':
        const { default: ProductsDaoMongoDB } = require('./daosProducts/productsDaoMongoDB')
        const { default: CartsDaoMongoDB } = require('./daosCarts/cartsDaoMongoDB')

        productsDao = new ProductsDaoMongoDB();
        cartsDao = new CartsDaoMongoDB();
        break;

    case 'firebase':
        const { default: ProductsDaoFB } = require('./daosProducts/productsDaoFB')
        const { default: CartsDaoFB } = require('./daosCarts/cartsDaoFB')

        productsDao = new ProductsDaoFB();
        cartsDao = new CartsDaoFB();
        break;
    default:
        const { default: ProductsDaoFS } = require('./daosProducts/productsDaoFS')
        const { default: CartsDaoFS } = require('./daosCarts/cartsDaoFS')

        productsDao = new ProductsDaoFS();
        cartsDao = new CartsDaoFS();
        break;

}

export { productsDao, cartsDao };