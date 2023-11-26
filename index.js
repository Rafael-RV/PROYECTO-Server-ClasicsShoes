// Configuración de variables de entorno con dotenv
require('dotenv').config();

// Importación de librerías
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes/index');
const cors = require('cors');
const Mercado_Pago = require("./src/routes/Mercado_Pago_Router")

// Creación de la instancia de Express
const app = express();

// Configuración de opciones CORS
const corsOptions = {
    origin: '*', // Reemplaza esto con el dominio permitido
    methods: 'GET, PUT, POST, DELETE', 
    credentials: true, // Permite el envío de cookies o credenciales
    optionsSuccessStatus: 204, // Configura el código de respuesta para las solicitudes
};

// Middleware CORS
app.use(cors(corsOptions));


//Mercado Pago
app.use("/Mercado_Pago", Mercado_Pago);

// Middleware para parseo de la información JSON que va a llegar
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI);

// Rutas para la API versionada bajo '/v1'
app.use('/v1', routes);

// Inicio del servidor en el puerto definido en las variables de entorno
app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado en el puerto: ' + process.env.PORT);
});
