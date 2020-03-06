const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDb is now connected...')
  } catch (err) {
    console.log('Error: ' + err.message)
    process.exit(1)
  }
}

module.exports = connectDB
