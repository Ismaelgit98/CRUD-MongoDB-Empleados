const conexion_mongo = require('../config/database');
const { empleado } = require('../entidades/empleados');

//--------------------------Modelos

// Modelo consultar lista de todos los empleados
async function modelo_consultar_lista_empleados() {
    await conexion_mongo.conexion_mongo;
    
    const lista_empleados = await empleado.find({}, { _id: 0 });
    return lista_empleados;
}

// Modelo buscar empleado por id
async function modelo_buscar_empleado_por_id(id_empleado) {
    await conexion_mongo.conexion_mongo;
    
    const datos_empleado = await empleado.find(
        { id_empleado: Number(id_empleado) },
        { _id: 0 }
    );
    return datos_empleado;
}

// Modelo buscar empleados por provincia
async function modelo_buscar_empleados_por_provincia(provincia) {
    await conexion_mongo.conexion_mongo;
    return await empleado.find({ provincia: provincia }, { _id: 0 });
}

// Modelo top 10 salarios
async function modelo_top_10_salarios() {
    await conexion_mongo.conexion_mongo;
    return await empleado.find({}, { _id: 0 }).sort({ salario: -1 }).limit(10);
}

// Modelo agregar un nuevo empleado
async function modelo_agregar_nuevo_empleado(datos_empleado) {
    await conexion_mongo.conexion_mongo;
    
    const ultimo_empleado = await empleado
        .findOne()
        .sort({ id_empleado: -1 });
        
    const nuevo_id = ultimo_empleado ? ultimo_empleado.id_empleado + 1 : 1;
        
    const nuevo_registro = await empleado.create({
        id_empleado: nuevo_id, 
        nombre: datos_empleado.nombre,
        apellido: datos_empleado.apellido,
        edad: datos_empleado.edad,
        id_departamento: datos_empleado.id_departamento,
        salario: datos_empleado.salario,
        provincia: datos_empleado.provincia
    });
        
    return nuevo_registro;
}

// Modelo actualizar un empleado
async function modelo_actualizar_empleado(datos_empleado) {
    await conexion_mongo.conexion_mongo;

    const actualizar = await empleado.updateOne(
        { id_empleado: Number(datos_empleado.id_empleado) },
        {
            $set: {
                nombre: datos_empleado.nombre, 
                apellido: datos_empleado.apellido,
                edad: datos_empleado.edad,
                id_departamento: datos_empleado.id_departamento,
                salario: datos_empleado.salario,
                provincia: datos_empleado.provincia
            }
        }
    );
    return actualizar;
}

// Modelo eliminar un empleado
async function modelo_eliminar_empleado(id_empleado) {
    await conexion_mongo.conexion_mongo;

    const eliminar = await empleado.deleteOne({ id_empleado: Number(id_empleado) });
    return eliminar;
}

// Modelo promedio salario por provincia
async function modelo_promedio_salario_por_provincia() {
    await conexion_mongo.conexion_mongo;
    return await empleado.aggregate([
        {
            $group: {
                _id: "$provincia",
                promedio_salario: { $avg: "$salario" }
            }
        }
    ]);
}

//-------------------Exportar modelos

module.exports = {
    modelo_consultar_lista_empleados,
    modelo_buscar_empleado_por_id,
    modelo_buscar_empleados_por_provincia,
    modelo_top_10_salarios,
    modelo_agregar_nuevo_empleado,
    modelo_actualizar_empleado,
    modelo_eliminar_empleado,
    modelo_promedio_salario_por_provincia,
};