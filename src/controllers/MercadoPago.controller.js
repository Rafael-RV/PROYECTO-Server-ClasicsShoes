const Product = require('../models/Products.model');
const mercadopago = require('mercadopago');


const Mercado_Pago = async (req, res) => {
    const product = new Product(req.body)

    try {
        const preference = {
            items: [
                {
                    title: product.modelo,
                    unit_price: product.precio,
                    currency_id: "CLP",
                    quantity: 1
                },
            ],

            back_urls: {
                success: "https://github.com/Rafael-RV/PROYECTO-Server-ClasicsShoes.git",
                failure: "https://github.com/Rafael-RV/PROYECTO-Server-ClasicsShoes.git/fallo",
            },

            auto_return: "approved",
        };

        const resp = await mercadopago.preferences.create(preference);
        console.log(resp.response.init_point);
        res.status(200).json(resp.response.init_point);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Error al procesar la solicitud" });
    }
};

module.exports = Mercado_Pago;
