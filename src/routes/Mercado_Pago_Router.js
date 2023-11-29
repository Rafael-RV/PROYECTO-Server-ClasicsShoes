const { Router } = require("express");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();

const Mercado_Pago = Router();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKE || "",
  client_id: process.env.CLIENT_ID || "",
  client_secret: process.env.CLIENT_SECRET || "",
});

Mercado_Pago.post("/", async (req, res) => {
  const producto = req.body;

  try {
    const preference = {
      items: [
        {
          title: producto.modelo,
          unit_price: producto.precio,
          currency_id: "CLP",
          quantity: producto.cantidad
        },
      ],

      back_urls: {
        success: "https://github.com/Rafael-RV/PROYECTO-ECOMMERCE-ClasicsShoes.git/home",
        failure: "https://github.com/Rafael-RV/PROYECTO-ECOMMERCE-ClasicsShoes.git/fallo/home",
      },

      auto_return: "approved",
    };

    const respuesta = await mercadopago.preferences.create(preference);
    console.log(respuesta);
    res.status(200).json(respuesta.response.init_point);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

module.exports = Mercado_Pago;