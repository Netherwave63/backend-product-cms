const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

require('dotenv').config({ path: './config/config-env.env' })

const app = express()

connectDB()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE')
  }
  next()
})

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/products', require('./routes/products'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is now listen on port ${PORT}...`)
})
