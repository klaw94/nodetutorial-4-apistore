const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    throw new Error('testing async error')
    res.status(200).json({msg: 'product testing route'})
}

const getAllProducts = async (req, res) => {
    //Instead of passing req.query we pass an empty object and we put the properties that we are interesed in. 
    const {featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {}

    if (featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company){
        queryObject.company = company
    }
    if (name){
        //if i include name = name, it will only look for a name that matches 100%
        //option i is case insensitive. 
        queryObject.name = {$regex: name, $options: 'i'}
    }

    if(numericFilters){
        //we convert the signs in the query to Mongoose language.
        const operatorMap ={
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<': '$lte',
        }
        const regEx =/\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item)=>{
            const [field, operator, value] = item.split('-')
            //so only if you are filtering by price or rating.
            if(options.includes(field)){
                //the query object field becomes  {$gt : 100}
                //here field is like .price
                queryObject[field] = {[operator]: Number(value)}
            }
        })
    }
    console.log(queryObject)
 
    //Basically you pass what you add in the query --> {{URLNODE}}/products?name=utopia+sofa
    let result = Product.find(queryObject)
    if (sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }
    if(fields){
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }


    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result

    //.sort({name: -1})
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}