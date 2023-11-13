const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    modelo: { type: String, required: true },
    precio: { type: String, required: true },
    tallas: { type: String, required: true }
})

const Products = mongoose.model('Products', productsSchema)
module.exports = Products