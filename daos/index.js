import 'dotenv/config';
import admin from 'firebase-admin';
import serviceAccount from '../config/serviceAccountKey.js';

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

let productsDao;
let cartsDao;

console.log(process.env.PERSISTENCIA);

switch(process.env.PERSISTENCIA) {
    case 'mongodb':
        const { default: ProductsDaoMongoDB } = await import('./daosProducts/productsDaoMongoDB.js')
        const { default: CartsDaoMongoDB } = await import('./daosCarts/cartsDaoMongoDB.js')

        productsDao = new ProductsDaoMongoDB();
        cartsDao = new CartsDaoMongoDB();
        break;

    case 'firebase':
        const { default: ProductsDaoFB } = await import('./daosProducts/productsDaoFB.js')
        const { default: CartsDaoFB } = await import('./daosCarts/cartsDaoFB.js')

        productsDao = new ProductsDaoFB(db);
        cartsDao = new CartsDaoFB(db);
        break;
    default:
        const { default: ProductsDaoFS } = await import('./daosProducts/productsDaoFS.js')
        const { default: CartsDaoFS } = await import('./daosCarts/cartsDaoFS.js')

        productsDao = new ProductsDaoFS();
        cartsDao = new CartsDaoFS();
        break;

}

export { productsDao, cartsDao };