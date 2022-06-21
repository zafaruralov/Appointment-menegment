const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'must provide title'],
    trim: true,
  },
  price: {
    type: Number,
    required:[true, 'must have price'],
  },
})

module.exports = mongoose.model('Product', productSchema)
