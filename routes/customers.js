const express = require('express')
const router = express.Router()
const {
  getCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer,
  updateProductEntry,
  deleteProductEntry
} = require('../controllers/customers')

router
  .route('/')
  .get(getCustomers)
  .post(addCustomer)

router
  .route('/:id')
  .delete(deleteCustomer)
  .put(updateCustomer)

router
  .route('/products/:id')
  .put(updateProductEntry)
  .delete(deleteProductEntry)

module.exports = router
