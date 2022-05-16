import mongoose from "mongoose";

import { connect } from "../../config/mongoose.js";
import { lastIdFunction } from "../../service/lastIdService.js";

await connect();

class MongoCartsContainer {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema);
    }

    async writeFile(data) {
        try {
            await this.collection.insertMany(data);
            console.log("Datos escritos");
        } catch (error) {
            console.log(error);
        }
    }

    async readFile() {
        try {
            const elements = await this.collection.find();
            return elements;
        } catch (error) {
            console.log(error);
        }
    }

    async createCart(){
        try {
            const elements = await this.collection.find();
            const lastId = lastIdFunction(elements);
            const data = {
                id: lastId,
                timestamp: Date.now(),
                user: "",
                products: [],
            }
            this.writeFile(data)
            console.log(`Nuevo carrito creado con id: ${lastId}`);       
        } catch (error) {
            console.log(error);            
        }
    }

    async deleteCart(idNumber){
        try {
            const id = idNumber;
            const doc = await this.collection.findOne({id: id});
            await this.collection.delete({doc});
            console.log("El carrito " + doc + " fue eliminado");
        } catch (error) {
            console.log(error);
        }
    }

    async listProducts(idNumber){
        try {
            const id = idNumber;
            const doc = await this.collection.findOne({id: id});
            const items = doc.products;
            console.log(items);
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(idNumber, product){
        try {
            const id = idNumber;
            const doc = await this.collection.findOne({id: id});
            const products = doc.products.push(product);
            await this.collection.deleteOne({id: id});
            await this.collection.save(products);
            console.log("El producto fue agregado al carrito");
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCart(idNumber, idProduct){
        try {
            const id = idNumber;
            const doc = await this.collection.findOne({id: id});
            const products = doc.products.filter(product => product.id !== idProduct);
            await this.collection.deleteOne({id: id});
            await this.collection.save(products);
            console.log("El producto fue eliminado del carrito");
        } catch (error) {
            console.log(error);
        }
    }
    
}

export default MongoCartsContainer;