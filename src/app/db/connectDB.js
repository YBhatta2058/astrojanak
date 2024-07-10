import mongoose from "mongoose";



const connectDB = async () => {
    try {
        console.log("connection instantiated for " + process.env.MONGO_DB_URI)
        const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Database Connected succssfully on host " + connectionInstance.connection.host);
    } catch (error) {
        console.log("Error while connecting to Database:", error);
        process.exit(1);
    }
};

export default connectDB;