//get the config file
require('dotenv').config()
//This is a already built middleware for asyncWrapper. You only import it and thats enough. YOu just need to throw an error and it works.
require('express-async-errors')
const express = require('express')
const app = express()
const products = require('./routes/products')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleWare = require('./middleware/not-found')
const connectDB = require('./db/connect')


app.use(express.json());

app.get('/', (req, res)=>{
    res.send('<h1>Store API</h1> <a href="/api/v1/products"> Click here </a>')
})

app.use('/api/v1/products', products)

app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try{
      //we use await because it returns a promise. (Check the .then in connect.js)
      //We use the secret of the .env
      await connectDB(process.env.MONGO_URI)
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}....`)
      })
    }catch (error){
      console.log(error)
    }
  }
  
  start()