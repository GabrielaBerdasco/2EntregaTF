import mongoose from "mongoose";

const productsCollection = 'productos';

const productsSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        max: 100
    },
    description: {
        type: String,
        required: true,
        max: 300
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;