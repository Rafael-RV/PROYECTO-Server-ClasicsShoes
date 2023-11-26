const { Router } = require("express");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();

const Mercado_Pago = Router();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN || "",
});

Mercado_Pago.post("/", async (req, res) => {
    try {
        const preference = {
            items: [
                {
                    title: "Computadora",
                    picture_URL: "http:dfsffs",
                    unit_price: 200,
                    currency_id: "CLP",
                    description: "zapatos",
                    quantity: 1,
                },
            ],

            back_urls: {
                success: "https://proyecto-api-autenticacion.onrender.com/v1/Mercado_Pago/success",
                failure: "https://proyecto-api-autenticacion.onrender.com/v1/Mercado_Pago/fallo",
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
