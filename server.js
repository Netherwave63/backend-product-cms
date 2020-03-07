const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const app = express()

connectDB()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://products-cms.netlify.com')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/products', require('./routes/products'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is now listen on port ${PORT}...`)
})
