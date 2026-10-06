const empleado_model = require('../models/empleado.model');
const fs = require('fs');
const path = require('path');

//-----------------------------Controladores

// Controlador lista de todos los empleados
exports.controlador_consultar_lista_empleados = async (req, res) => {
    const lista_empleados =
    await empleado_model.modelo_consultar_lista_empleados();

    res.json(lista_empleados)
};

// Cpontrolador buscar empleado por id
exports.controlador_buscar_empleado_por_id = async (req, res) => {
    const id_empleado = req.params.id_empleado;
    const datos_empleado =
    await empleado_model.modelo_buscar_empleado_por_id(id_empleado);

    res.json(datos_empleado)
};

// Controlador buscar por provincia
exports.controlador_buscar_empleados_por_provincia = async (req, res) => {
    const provincia = req.params.provincia;
    const lista = await empleado_model.modelo_buscar_empleados_por_provincia(provincia);
    res.json(lista);
};

// Controlador top 10 salarios
exports.controlador_top_10_salarios = async (req, res) => {
    const lista = await empleado_model.modelo_top_10_salarios();
    res.json(lista);
};

// Controlador agergar un nuevo empleado
exports.controlador_agregar_nuevo_empleado = async (req, res) => {
    const datos_empleado = req.body;
    await empleado_model.modelo_agregar_nuevo_empleado(datos_empleado);
    res.json({mensaje: 'Empleado agregado correctamente'})
};

// Controlador actualizar empleado
exports.controlador_actualizar_empleado = async (req, res) => {
    const datos_empleado = req.body;

    const filas_afectadas =
    await empleado_model.modelo_actualizar_empleado(datos_empleado);
    
    if (filas_afectadas === 0) {
        return res.status(404).json({
            mensaje: 'Empleado no encontrado'
        });
    }
    res.json({
        mensaje: 'Empleado actualizado correctamente'
    });
};

// Controlador eliminar empleado
exports.controlador_eliminar_empleado = async (req, res) => {
    const id_empleado = req.params.id_empleado;
    
    const filas_afectadas = 
    await empleado_model.modelo_eliminar_empleado(id_empleado);
    
    if (filas_afectadas.deletedCount === 0) {
        return res.status(404).json({
            mensaje: 'Empleado no encontrado'
        });
    }
    res.json({
        mensaje: 'Empleado eliminado correctamente'
    });
}

// Controlador promedio salario por provincia
exports.controlador_promedio_salario_por_provincia = async (req, res) => {
    const resultado = await empleado_model.modelo_promedio_salario_por_provincia();
    res.json(resultado);
};

// Controlador exportar empleados 
exports.controlador_exportar_empleados = async (req, res) => {
    try {
        const empleados = await empleado_model.modelo_consultar_lista_empleados();
        
        const nombre_archivo = `empleados_export_${Date.now()}.json`;

        const ruta_destino = path.join(__dirname, '../../exports', nombre_archivo);

        fs.writeFileSync(ruta_destino, JSON.stringify(empleados, null, 2), 'utf8');
        
        res.status(200).json({ mensaje: `Exportación exitosa. Archivo guardado como: ${nombre_archivo}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al exportar los empleados" });
    }
};

// Controlador backup de la base de datos
exports.controlador_backup_db = async (req, res) => {
    try {
        const empleados = await empleado_model.modelo_consultar_lista_empleados();
        
        const backupData = {
            fecha_backup: new Date(),
            base_datos: "empresa_db",
            coleccion_empleados: empleados
        };

        const nombre_archivo = `backup_empresa_db_${Date.now()}.json`;

        const ruta_destino = path.join(__dirname, '../../buckups', nombre_archivo);
        
        fs.writeFileSync(ruta_destino, JSON.stringify(backupData, null, 2), 'utf8');
        
        res.status(200).json({ mensaje: `Backup generado con éxito. Guardado como: ${nombre_archivo}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al generar el backup de la base de datos" });
    }
};