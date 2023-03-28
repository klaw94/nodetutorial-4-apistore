const express = require('express')
const router = express.Router()

const {getAllProductsStatic, getAllProducts} = require('../controllers/products')


router.get('/static', getAllProductsStatic)
router.get('/', getAllProducts)
  
  
// router.post('/', createTask)

// router.get('/:id', getTaskById)
 
// router.patch('/:id', updateTask)
  
// router.delete('/:id', deleteTask)

module.exports = router