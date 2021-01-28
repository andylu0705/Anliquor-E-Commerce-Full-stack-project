//import local data(data file) to MongoDB database
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'
dotenv.config();
connectDB()

const importData = async () => {
    try{
        // delete all inital data
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        //import data from local database
        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id
        // combine admin-user to product data
        const sampleProducts = products.map(product =>{
            return {...product, user: adminUser}
        })

        //inser combine data to Product collections
        await Product.insertMany(sampleProducts)
        console.log("Data Imported!".green.inverse)
        process.exit()

    } catch (error){
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}


const destoryData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log("Data Destroyed".red.inverse)
        process.exit()

    } catch (error){
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

// run node backend/seeder -d to Delete all data
if (process.argv[2] === '-d') {
    destoryData()
} else{
// run node backend/seeder to Add all data
    importData()
}