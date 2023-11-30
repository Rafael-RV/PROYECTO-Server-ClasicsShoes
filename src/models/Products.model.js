const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    modelo: { type: String },
    precio: { type: Number },
    color: { type: String },
    imagen: { type: String }
})

const Products = mongoose.model('Products', productsSchema)
module.exports = Products