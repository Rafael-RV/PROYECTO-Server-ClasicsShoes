const express = require('express')
const router = express.Router(),
user = require('./User'),
products = require  ('./Products')

router.use('/user', user)
router.use('/products', products)

module.exports = router