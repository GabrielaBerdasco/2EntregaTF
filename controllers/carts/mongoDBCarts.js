import mongoose from "mongoose";

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

    async addElement(product) {
        try {
            const savedElement = await this.collection.save(product);
            console.log(savedElement);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const elements = await this.collection.find();
            return elements;
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

export default MongoCartsContainer;