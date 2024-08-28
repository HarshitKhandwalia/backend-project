import mongoose, { connect } from "mongoose";
import { db_name } from "../constants.js";


const connectDB = async() => {
    try {

       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`);
       console.log(`{MongoDB is connected to :}${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`{MongoDB connection error:}`,error);
        process.exit(1)
    }
}

export default connectDB