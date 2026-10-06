const mongoose = require('mongoose');

const empleado_schema = new mongoose.Schema(
    {
        id_empleado: {type: Number, required: true},
        nombre: {type: String, required: true},
        apellido: {type: String, required: true},
        edad: {type: Number, required: true},
        id_departamento: {type: Number, required: true},
        salario: {type: Number, required: true},
        provincia: {type: String, required: true}
    }
)

const empleado = mongoose.model('empleado', empleado_schema);

module.exports = {empleado};