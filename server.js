const express = require('express')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(express.json())

app.use('/api/v1/products', require('./routes/products'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is now listen on port ${PORT}...`)
})