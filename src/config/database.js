const mongoose = require('mongoose');
require('dotenv').config();

const conexion_mongo = mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB conectado');
    }
)

.catch ((error) => {
    console.log(error);
    }
);

module.exports = {conexion_mongo}