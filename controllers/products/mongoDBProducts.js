import mongoose from "mongoose";
import { connect } from "../../config/mongoose.js";	

await connect();

class MongoProductsContainer {
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

    async saveObject(pData) {
        try {
            const savedElement = await this.collection.save(pData);
            console.log("Producto guardado" + savedElement);
            
        } catch (error) {
            console.log(error);            
        }
    }

    async modifyObject(idNumber, pObj) {
        try {
            const savedElement = await this.collection.findOneAndUpdate({id: idNumber}, pObj);
            console.log("Producto modificado" + savedElement);
            
        } catch (error) {  
            console.log(error);
        }
    }

    async getById(idNumber) {
        try {
            const element = await this.collection.findOne({id: idNumber});
            console.log(element);

        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const elements = await this.collection.find();
            console.log(elements);

        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(idNumber) {
        try {
            await this.collection.deleteOne({id: idNumber});
            console.log("Elemento con id: " + idNumber + "eliminado");
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await this.collection.deleteMany({});
            console.log("Elementos en colección eliminados");;
        } catch (error) {
            console.log(error);
        }
    }

}


export default MongoProductsContainer;