const mongoose = require('mongoose')

//This will set the structure of our data. Go to mongoosejs.com/docs/schematypes.html to see all the types
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength:[20, 'name cannot be more than 20 characters'],
    },
    price: {
        type: Number,
        required: [true, 'must provide price'],
    },
    featured:{
        type: Boolean,
        default: false
    },
    rating:{
        type: Number,
        default: 4.5
    },
    createdAt:{
        type: Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        },
    }
})


module.exports = mongoose.model('Product', productSchema)