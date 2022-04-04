const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_URL

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: [3, 'Name must be at least 3 characters long']
    },
    number: {
      type: String,
      validate: {
        validator: function(v) {
          return /\d{2,3}-\d{5,}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      minlength: [9, 'Number must be at least 8 characters long'],
      required: [true, 'Phone number is required']
    }
  })
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)
