//Fucntion to automatically update our db with the products.json data

require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')


const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URI)
        //You can pass an array to the create function
        //Deletes all the data in db
        await Product.deleteMany()
        //adds all the products to db
        await Product.create(jsonProducts)
        console.log("Success")
        //After success close the process
        process.exit(0)
    }catch(error){
        console.log(error)
        process.exit(1)

    }
}

start()