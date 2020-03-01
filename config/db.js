const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://yl:qwerty123@clusterdb-eumii.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDb is now connected...')
  } catch(err) {
    console.log('Error: ' + err.message)
    process.exit(1)
  }
}

module.exports = connectDB
