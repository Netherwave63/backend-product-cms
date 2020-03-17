const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  packaging_material: {
    type: String,
    required: true
  },
  packaging_method: {
    type: String,
    required: true
  },
  weight_per_batch: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Product', ProductSchema)