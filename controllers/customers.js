const {
  Customer,
  CustomerProduct
} = require('../models/Customer')

// @desc   Get all customers
// @route  GET /api/v1/customers
// @access public
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
    return res.status(200).json({
      success: true,
      data: customers
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

// @desc    Add new customer
// @route   POST /api/v1/customers
// @access  public
exports.addCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body)
    return res.status(201).json({
      success: true,
      data: customer
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

// @desc    Delete an existing customer
// @route   DELETE /api/v1/customers/:customerId
// @access  public
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId)
    if (customer) {
      await customer.remove()
      return res.status(200).json({
        success: true,
        data: {}
      })
    } else {
      return res.status(404).json({
        success: false,
        error: 'No customer found'
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

// @desc    Update an existing customer
// @route   PUT /api/v1/customers/:customerId
// @access  public
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId)
    if (customer) {
      customer.name = req.body.name
      const updatedCustomer = await customer.save()
      return res.status(200).json({
        success: true,
        data: updatedCustomer
      })
    } else {
      return res.status(404).json({
        success: false,
        error: 'No customer found'
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

// @desc    Add new product
// @route   POST /api/v1/customers/products/:customerId
// @access  public
exports.addProduct = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId)
    if (customer) {
      const newProduct = new CustomerProduct(req.body)
      customer.products.push(newProduct)
      await customer.save()
      return res.status(200).json({
        success: true,
        data: customer
      })
    } else {
      return res.status(404).json({
        success: false,
        error: 'No customer found'
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
// @route   PUT /api/v1/customers/products/:customerId
// @access  public
exports.updateProduct = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId)
    if (customer) {
      const targetProduct = customer.products.find(product => product._id == req.body._id)
      targetProduct.product_name = req.body.product_name
      targetProduct.product_id = req.body.product_id
      targetProduct.weight_per_package = req.body.weight_per_package
      targetProduct.package_per_carton = req.body.package_per_carton
      await customer.save()
      return res.status(200).json({
        success: true,
        data: customer
      })
    } else {
      return res.status(404).json({
        success: false,
        error: 'No customer found'
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

// @desc    Delete an existing product
// @route   DELETE /api/v1/customers/products/:customerId
// @access  public
exports.deleteProduct = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId)
    if (customer) {
      customer.products = customer.products.filter(product => product._id != req.body._id)
      await customer.save()
      return res.status(200).json({
        success: true,
        data: {}
      })
    } else {
      return res.status(404).json({
        success: false,
        error: 'No customer found'
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}
