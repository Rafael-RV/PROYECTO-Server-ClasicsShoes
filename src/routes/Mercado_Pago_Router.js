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
  const productDetails = req.body;

  try {
    const preference = {
      items: [
        {
          title: productDetails.modelo, 
          unit_price: productDetails.precio,
          currency_id: "CLP",
          quantity: 1,
        },
      ],
      back_urls: {
        success: "https://rafael-rv.github.io/PROYECTO-ECOMMERCE-ClasicsShoes/",
        failure: "https://rafael-rv.github.io/PROYECTO-ECOMMERCE-ClasicsShoes/",
      },
      auto_return: "approved",
    };

    const respuesta = await mercadopago.preferences.create(preference);
    console.log(respuesta);
    res.status(200).json(respuesta.response.init_point);
  } catch (error) {
    console.error("Error al crear preferencia de Mercado Pago:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

module.exports = Mercado_Pago;
