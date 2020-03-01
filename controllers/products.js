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
  } catch(err) {
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
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

// @desc    Delete an existing product
// @route   GET /api/v1/products/:id
// @access  public
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
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
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

// @desc    Update an existing product
// @route   GET /api/v1/products/:id
// @access  public
exports.updateProduct = async (req, res) => {
  res.send('<h1>PUT products</h1>')
}