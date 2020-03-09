const mongoose = require('mongoose')

const CustomerProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weight_per_package: {
    type: Number,
    required: true
  },
  package_per_carton: {
    type: Number,
    required: true
  }
})

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  products: [CustomerProductSchema],
  created_at: {
    type: Date,
    default: Date.now()
  }
})

exports.Customer = mongoose.model('Customer', CustomerSchema)
exports.CustomerProduct = mongoose.model('CustomerProduct', CustomerProductSchema)
