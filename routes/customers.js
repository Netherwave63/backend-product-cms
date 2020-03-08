const express = require('express')
const router = express.Router()
const {
  getCustomers,
  addCustomer
} = require('../controllers/customers')

router
  .route('/')
  .get(getCustomers)
  .post(addCustomer)

module.exports = router