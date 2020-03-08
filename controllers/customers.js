const Customer = require('../models/Customer')

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