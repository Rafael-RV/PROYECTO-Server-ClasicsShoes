const Product = require('../models/Products.model')


const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        const resp = await newProduct.save()
        res.json({
            message: 'The product has been created successfully.',
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}


const getProducts = async (req, res) => {
    try {
        const resp = await Product.find()
        return res.json({
            message: "Products",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const newData = req.body
        const resp = await Product.findByIdAndUpdate(
            newData.productId,
            { $set: newData },
            { new: true }
        )
        return res.json({
            message: 'The product has been updated successfully.',
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const resp = await Product.findByIdAndDelete(req.body.productId)

        return res.json({
            message: 'The product has been deleted successfully.'
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
}