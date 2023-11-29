const express = require('express');
const mercadopago = require("mercadopago");
const router = express.Router();
const accessToken = "TEST-7976763045465946-111720-0f4a9c6447c6dd4b2714f37bf7d2eae8-1553213749"
const {Mercado_Pago} = require('../controllers/MercadoPago.controller')
const auth = require('../middlewares/auth')

mercadopago.configure({
    access_token: accessToken || "",
})

router.post("/", Mercado_Pago )


module.exports = router