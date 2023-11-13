const express = require('express')
const router = express.Router(),
{
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct

} = require('../controllers/Products.controller')


router.get('/', getProducts)
router.post('/',createProduct)
router.put('/', updateProduct)
router.delete('/', deleteProduct)

module.exports = router;