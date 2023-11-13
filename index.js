require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose'),
      routes = require('./src/routes/index'),
      cors = require('cors')
const app = express()

const corsOptions = {
    origin: '*', // Reemplaza esto con el dominio permitido
    methods: 'GET, PUT, POST, DELETE', 
    Credentials: true, //Permite el envio de cookies o credenciales
    optionsSuccesStatus: 204, // Configura el codigo de respuesta para las solicitudes
};

app.use(cors(corsOptions))
app.use(express.json())  // parseo de la información que va a llegar, middleware

mongoose.connect(process.env.MONGO_URI)

app.use('/v1', routes)

app.listen(process.env.PORT, () => {
    console.log('Servidor inciado en el puerto: ' + process.env.PORT)
})