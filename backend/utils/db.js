import mongoose from "mongoose";

const link ='mongodb+srv://karunpoddar0:Qig1pkNcyeBhRVnC@cluster0.2i8mt.mongodb.net/';

const connectDB = async () => {
    try {
        await mongoose.connect(link);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;