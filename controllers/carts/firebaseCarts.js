import { lastIdFunction } from '../../service/lastIdService.js';

class FirebaseCartsContainer{
    constructor(db, collectionName){
        this.db = db;
        this.query = this.db.collection(collectionName);
    }

    async writeFile(data){
        try {
            if(data) {
                let id = data.id;
                let doc = this.query.doc(`${id}`);
                await doc.create({timestamp: data.timestamp, user: data.user, products: data.products});
                console.log(`Nuevo carrito creado con id: ${id}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async readFile(){
        try {
            let cart = await this.query.get();
            let docs = cart.docs;
            const response = docs.map((doc) => ({
                id: doc.id,
                timestamp: doc.timestamp,
                user: doc.user,
                products: doc.products,
            }));
            return response;
        
        } catch (error) {
            console.log(error);
        }
    }

    async createCart(){
        try {
            let cart = await this.readFile();
            let lastId = lastIdFunction(cart);
            let data = {
                id: lastId,
                timestamp: Date.now(),
                user: "",
                products: [],
            }
            await this.writeFile(data)
            console.log(`Nuevo carrito creado con id: ${lastId}`);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(idNumber){
        try {
            let id = idNumber;
            const doc = this.query.doc(`${id}`);
            const item = await doc.delete();
            console.log("El carrito con id: " + id + " fue eliminado");

        } catch (error) {
            console.log(error);
        }
    }

    async listProducts(idNumber){
        try {
            const doc = this.query.doc(`${idNumber}`);
            const item = await doc.get();
            const data = item.data();
            if(data.products.length > 0) {
                console.log(data.products);
            } else {
                console.log("El carrito esta vacio");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(idNumber, product){
        try {
            let id = idNumber;
            const doc = this.query.doc(`${id}`);
            const item = await doc.get();
            const data = item.data();
            let products = data.products;
            products.push(product);
            await doc.update({products: products});
            console.log("Producto agregado al carrito");

        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCart(idNumber, idProduct){
        try {
            let id = idNumber;
            const doc = this.query.doc(`${id}`);
            const item = await doc.get();
            const data = item.data();
            let products = data.products;
            let filteredProducts = products.filter(p => p.id != idProduct);
            await doc.update({products: filteredProducts});
            console.log("Producto eliminado del carrito");
            
        } catch (error) {
            console.log(error);
        }
    }
}

export default FirebaseCartsContainer;