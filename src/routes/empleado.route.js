const express = require('express');
const router = express.Router();
const controller = require('../controllers/empleado.controller');

//-----------------------------Rutas

//Api todos los departamentos 
router.get('/lista_empleados', controller.controlador_consultar_lista_empleados);

//Api departamento por id
router.get('/empleado/:id_empleado', controller.controlador_buscar_empleado_por_id);

//Api buscar por provincia
router.get('/provincia/:provincia', controller.controlador_buscar_empleados_por_provincia);

//Api top 10 salarios
router.get('/top_salarios', controller.controlador_top_10_salarios);

//Api nuevo departamento 
router.post('/nuevo_empleado', controller.controlador_agregar_nuevo_empleado);

//Api actualizar departamento 
router.put('/actualizar_empleado', controller.controlador_actualizar_empleado);

//Api eliminar departamento 
router.delete('/eliminar_empleado/:id_empleado', controller.controlador_eliminar_empleado);

//Api promedio salario por provincia
router.get('/promedio_salario_provincia', controller.controlador_promedio_salario_por_provincia);

//Api exportar empleados
router.get('/export', controller.controlador_exportar_empleados);

//Api backup de la base de datos
router.get('/backup', controller.controlador_backup_db);


//------------------Exportar rutas

module.exports = router;