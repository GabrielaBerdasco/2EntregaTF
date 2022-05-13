import 'dotenv/config';
import admin from 'firebase-admin';
import { firebaseConfig } from '../../config/serviceAccountKey.json';

admin.initializeApp({
	credential: admin.credential.cert(firebaseConfig),
})

const db = admin.firestore()

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

        productsDao = new ProductsDaoFB(db);
        cartsDao = new CartsDaoFB(db);
        break;
    default:
        const { default: ProductsDaoFS } = require('./daosProducts/productsDaoFS')
        const { default: CartsDaoFS } = require('./daosCarts/cartsDaoFS')

        productsDao = new ProductsDaoFS();
        cartsDao = new CartsDaoFS();
        break;

}

export { productsDao, cartsDao };