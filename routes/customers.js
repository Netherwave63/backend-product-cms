const express = require('express')
const router = express.Router()
const {
  getCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/customers')

router
  .route('/')
  .get(getCustomers)
  .post(addCustomer)

router
  .route('/:customerId')
  .delete(deleteCustomer)
  .put(updateCustomer)
  
router
  .route('/products/:customerId')
  .post(addProduct)
  .put(updateProduct)

router
  .route('/:customerId/products/:productId')
  .delete(deleteProduct)

module.exports = router
