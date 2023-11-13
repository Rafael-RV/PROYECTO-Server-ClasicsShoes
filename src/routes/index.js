const express = require('express')
const router = express.Router(),
userRouter = require('./User.router'),
productsRouter = require  ('./Products.router')

router.use('/user', userRouter)
router.use('/products', productsRouter)

module.exports = router