const express = require('express');
const router = express.Router(),
      user = require('./User'),
      products = require  ('./Products'),
      Mercado_Pago = require('./Mercado_Pago_Router')

router.use('/user', user);
router.use('/products', products);
router.use('/Mercado_Pago', Mercado_Pago);

module.exports = router;