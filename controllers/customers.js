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
// @route   DELETE /api/v1/customers/:id
// @access  public
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
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
// @route   PUT /api/v1/customers/:id
// @access  public
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
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

// @desc    Add new product to an existing customer/ Update an existing product
// @route   PUT /api/v1/customers/products/:id
// @access  public
exports.updateProductEntry = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    const {
      _id = null,
      name,
      productId,
      weight_per_package,
      package_per_carton
    } = req.body
    if (customer) {
      // product exists
      if (_id) {
        const targetProduct = customer.products.find(product => product._id == _id)
        targetProduct.name = name
        targetProduct.productId = productId
        targetProduct.weight_per_package = weight_per_package
        targetProduct.package_per_carton = package_per_carton
        await customer.save()
        return res.status(200).json({
          success: true,
          data: targetProduct
        })
      } else { // new product
        const newProduct = new CustomerProduct(req.body)
        customer.products.push(newProduct)
        await customer.save()
        return res.status(200).json({
          success: true,
          data: newProduct
        })
      }
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
// @route   DELETE /api/v1/customers/products/:id
// @access  public
exports.deleteProductEntry = async (req, res) => {
  try {
    const [
      customerId,
      productId
    ] = req.params.id.split('_')
    const customer = await Customer.findById(customerId)
    if (customer) {
      customer.products = customer.products.filter(product => product._id != productId)
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
