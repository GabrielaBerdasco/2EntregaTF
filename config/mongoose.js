import mongoose from "mongoose";

connect();

export const connect = async() => {

    try {
        const url = 'mongodb://localhost:27017/ecommerce';
        const answer = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('MongoDB connected');

    } catch (err) {
        console.log(err);
    }

}