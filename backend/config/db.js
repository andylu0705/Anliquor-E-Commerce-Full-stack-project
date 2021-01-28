import mongoose from "mongoose";

//connect to Data Base code
const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,
            {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true
            
            })
            console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
        
    } catch (error){
        console.error(`Error:${error.message}`.red.underline.bold)
        process.exit(1)
    }

}

export default connectDB;