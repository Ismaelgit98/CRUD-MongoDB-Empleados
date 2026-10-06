
require('dotenv').config();

console.log('DB_SERVER:', process.env.DB_SERVER);

const express = require('express');

const empleados_routes = require('./src/routes/empleado.route')

const app = express();

app.use(express.json());

app.use('/empleados', empleados_routes)

app.use(express.static('public'));


app.listen(3000, () => {
    console.log('SERVIDOR EJECUTANDOSE');
});