import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const connectDB = async (): Promise<void> => {

    const MongodbConnection = process.env.MONGOURI

    try {

        await mongoose.connect(MongodbConnection)
        console.log("Mongodb connected successfully")

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}