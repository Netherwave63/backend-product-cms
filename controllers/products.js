const Product = require('../models/Product')

// @desc    Get all products
// @route   GET /api/v1/products
// @access  public
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    return res.status(200).json({
      success: true,
      data: products
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

// @desc    Add new product
// @route   POST /api/v1/products
// @access  public
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    return res.status(201).json({
      success: true,
      data: product
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

// @desc    Delete an existing product
// @route   GET /api/v1/products/:productId
// @access  public
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)
    if (product) {
      await product.remove()
      return res.status(200).json({
        success: true,
        data: {}
      })
    } else {
      return res.status(404).json({
        success: false,
        error: 'No product found'
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

// @desc    Update an existing product
// @route   GET /api/v1/products/:productId
// @access  public
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)
    if (product) {
      if (req.body.index) {
        product.index = req.body.index
      } 
      product.name = req.body.name
      product.packaging_material = req.body.packaging_material
      product.packaging_method = req.body.packaging_method
      product.weight_per_batch = req.body.weight_per_batch
      const updatedProduct = await product.save()
      return res.status(200).json({
        success: true,
        data: updatedProduct
      })
    } else {
      return res.status(404).json({
        success: false,
        error: 'No product found'
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}
