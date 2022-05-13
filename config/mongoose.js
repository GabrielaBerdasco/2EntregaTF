import mongoose from "mongoose";

export const connect = async() => {

    try {
        const url = 'mongodb+srv://GabrielaBerdasco:CoderH33@cluster0.lsmwx.mongodb.net/ecommerce?retryWrites=true&w=majority';
        const answer = await mongoose.connect(url);
        console.log('MongoDB connected');

    } catch (err) {
        console.log(err);
    }

}

connect();



