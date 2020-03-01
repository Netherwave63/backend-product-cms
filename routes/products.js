const express = require('express')
const router = express.Router()
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct
} = require('../controllers/products')

router
  .route('/')
  .get(getProducts)
  .post(addProduct)

router
  .route('/:id')
  .delete(deleteProduct)
  .put(updateProduct)

module.exports = router
