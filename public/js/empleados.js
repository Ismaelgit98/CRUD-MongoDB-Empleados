document.addEventListener("DOMContentLoaded", () => {
    // Btn mostrar todos los empleados
    const btn_mostrar = document.getElementById("btn_mostrar");
    btn_mostrar.addEventListener("click", mostrar_empleados);

    // Btn buscar empleado por id
    const btn_buscar = document.getElementById("btn_buscar");
    btn_buscar.addEventListener("click", buscar_empleado_por_id);

    // Btn filtrar empleados por provincia
    const btn_filtrar_provincia = document.getElementById("btn_filtrar_provincia");
    btn_filtrar_provincia.addEventListener("click", buscar_empleados_por_provincia);

    // Btn top 10 salarios
    const btn_top_salarios = document.getElementById("btn_top_salarios");
    btn_top_salarios.addEventListener("click", obtener_top_10_salarios);

    // Btn guardar nuevo
    const btn_agregar = document.getElementById("btn_agregar");
    btn_agregar.addEventListener("click", agregar_empleado);

    // Actualización de empleado
    const btn_buscar_actualizar = document.getElementById("btn_buscar_actualizar");
        btn_buscar_actualizar.addEventListener("click", buscar_empleado_para_actualizar);

    // Btn actualizar empleado
    const btn_actualizar = document.getElementById("btn_actualizar");
        btn_actualizar.addEventListener("click", ejecutar_actualizacion_empleado);
    
    
    // Ocultar campos de actualización al cargar la página
    ocultar_seccion_actualizar();

    // Evento para ocultar sección si modifican el ID a buscar
    const input_id_actualizar = document.getElementById("actualizar_id_empleado");
        input_id_actualizar.addEventListener("input", () => {
            ocultar_seccion_actualizar();
        });

    // Btn eliminar empleado
    const btn_eliminar = document.getElementById("btn_eliminar");
    btn_eliminar.addEventListener("click", eliminar_empleado);

    // Btn salario promedio por provincia
    const btn_promedio_provincia = document.getElementById("btn_promedio_provincia");
    btn_promedio_provincia.addEventListener("click", obtener_promedio_salarios);

    // Btn exportar empleados
    const btn_exportar_empleados = document.getElementById("btn_exportar_empleados");
    btn_exportar_empleados.addEventListener("click", exportar_empleados);

    // Btn backup de la base de datos
    const btn_backup_db = document.getElementById("btn_backup_db");
    btn_backup_db.addEventListener("click", generar_backup_db);
});

// Función mostrar todos los empleados
async function mostrar_empleados() {
    const contenedor = document.getElementById("tabla_empleados");

    try {
        const respuesta = await fetch("empleados/lista_empleados");

        if (!respuesta.ok) {
            throw new Error("Lista de empleados no encontrada");
        }

        const empleados = await respuesta.json();
        contenedor.innerHTML = "";

        empleados.forEach(empleado => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${empleado.id_empleado}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.edad}</td>
                <td>${empleado.id_departamento}</td>
                <td>${empleado.salario}</td>
                <td>${empleado.provincia}</td>
            `;
            contenedor.appendChild(fila);
        });

    } catch (error) {
        console.error(error);
        alert("Error al obtener los empleados");
    }
}

// Función buscar empleado por id
async function buscar_empleado_por_id() {
    const contenedor = document.getElementById("tabla_empleados");
    const input_id = document.getElementById("id_empleado");

    if (!input_id.checkValidity()) {
        input_id.reportValidity();
        return;
    }

    try {
        const respuesta = await fetch(`empleados/empleado/${input_id.value}`);

        if (!respuesta.ok) {
            mostrar_modal("El ID del empleado no existe en la base de datos");
            return;
        }

        const empleados = await respuesta.json();
        const lista = Array.isArray(empleados) ? empleados : [empleados];
        
        if (!empleados || lista.length === 0 || (lista.length === 1 && !lista[0].id_empleado)) {
            mostrar_modal("El ID del empleado no existe en la base de datos");
            return;
        }

        contenedor.innerHTML = "";

        lista.forEach(empleado => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${empleado.id_empleado}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.edad}</td>
                <td>${empleado.id_departamento}</td>
                <td>${empleado.salario}</td>
                <td>${empleado.provincia}</td>
            `;
            contenedor.appendChild(fila);
        });

    } catch (error) {
        console.error(error);
        mostrar_modal("El ID del empleado no existe en la base de datos");
    }
}

// Función buscar empleados por provincia
async function buscar_empleados_por_provincia() {
    const contenedor = document.getElementById("tabla_empleados");
    const input_provincia = document.getElementById("filtro_provincia");

    if (!input_provincia.checkValidity()) {
        input_provincia.reportValidity();
        return;
    }

    try {
        const respuesta = await fetch(`empleados/provincia/${encodeURIComponent(input_provincia.value)}`);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los empleados");
        }

        const empleados = await respuesta.json();
        contenedor.innerHTML = "";

        empleados.forEach(empleado => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${empleado.id_empleado}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.edad}</td>
                <td>${empleado.id_departamento}</td>
                <td>${empleado.salario}</td>
                <td>${empleado.provincia}</td>
            `;
            contenedor.appendChild(fila);
        });

    } catch (error) {
        console.error(error);
        alert("Error al obtener los empleados por provincia");
    }
}

// Función obtener top 10 salarios
async function obtener_top_10_salarios() {
    const contenedor = document.getElementById("tabla_empleados");

    try {
        const respuesta = await fetch("empleados/top_salarios");

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener el top de salarios");
        }

        const empleados = await respuesta.json();
        contenedor.innerHTML = "";

        empleados.forEach(empleado => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${empleado.id_empleado}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.edad}</td>
                <td>${empleado.id_departamento}</td>
                <td>${empleado.salario}</td>
                <td>${empleado.provincia}</td>
            `;
            contenedor.appendChild(fila);
        });

    } catch (error) {
        console.error(error);
        alert("Error al obtener el top 10 de salarios");
    }
}

// Función agregar nuevo empleado
async function agregar_empleado() {
    const inputs_agregar = [
        document.getElementById("nombre_empleado"),
        document.getElementById("apellido_empleado"),
        document.getElementById("edad_empleado"),
        document.getElementById("id_departamento_empleado"),
        document.getElementById("salario_empleado"),
        document.getElementById("provincia_empleado")
    ];

    for (let input of inputs_agregar) {
        if (!input.checkValidity()) {
            input.reportValidity();
            return;
        }
    }

    const empleado = {
        nombre: inputs_agregar[0].value,
        apellido: inputs_agregar[1].value,
        edad: Number(inputs_agregar[2].value),
        id_departamento: Number(inputs_agregar[3].value),
        salario: Number(inputs_agregar[4].value),
        provincia: inputs_agregar[5].value
    };

    try {
        const respuesta = await fetch("empleados/nuevo_empleado", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(empleado)
        });

        if (respuesta.ok) {
            mostrar_modal("Empleado registrado correctamente");
            inputs_agregar.forEach(input => input.value = "");
            mostrar_empleados();
        } else {
            mostrar_modal("Error al registrar empleado");
        }

    } catch (error) {
        console.error(error);
        mostrar_modal("Error de comunicación con el servidor");
    }
}

// Función ocultar y vaciar la sección desplegable de actualización
function ocultar_seccion_actualizar() {
    const seccion = document.getElementById("seccion_campos_actualizar");
    if (seccion) {
        seccion.style.display = "none";
        seccion.classList.remove("activo");
    }

    const ids = [
        "actualizar_nombre_empleado",
        "actualizar_apellido_empleado",
        "actualizar_edad_empleado",
        "actualizar_id_departamento_empleado",
        "actualizar_salario_empleado",
        "actualizar_provincia_empleado"
    ];
    
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
}

// Función mostrar la sección desplegable con los datos cargados
function mostrar_seccion_actualizar(datos) {
    document.getElementById("actualizar_nombre_empleado").value = datos.nombre || "";
    document.getElementById("actualizar_apellido_empleado").value = datos.apellido || "";
    document.getElementById("actualizar_edad_empleado").value = datos.edad || "";
    document.getElementById("actualizar_id_departamento_empleado").value = datos.id_departamento || "";
    document.getElementById("actualizar_salario_empleado").value = datos.salario || "";
    document.getElementById("actualizar_provincia_empleado").value = datos.provincia || "";

    const seccion = document.getElementById("seccion_campos_actualizar");
    if (seccion) {
        seccion.style.display = "block";
        setTimeout(() => {
            seccion.classList.add("activo");
        }, 10);
    }
}

// Función buscar ID para actualización
async function buscar_empleado_para_actualizar() {
    const input_id = document.getElementById("actualizar_id_empleado");
    
    if (!input_id.checkValidity()) {
        input_id.reportValidity();
        return;
    }

    try {
        const respuesta = await fetch(`empleados/empleado/${input_id.value}`);

        if (!respuesta.ok) {
            mostrar_modal("El ID del empleado no existe en la base de datos");
            ocultar_seccion_actualizar();
            return;
        }

        const empleado = await respuesta.json();
        const datos = Array.isArray(empleado) ? empleado[0] : empleado;

        if (!datos || !datos.id_empleado) {
            mostrar_modal("El ID del empleado no existe en la base de datos");
            ocultar_seccion_actualizar();
            return;
        }

        mostrar_seccion_actualizar(datos);

    } catch (error) {
        console.error(error);
        mostrar_modal("El ID del empleado no existe en la base de datos");
        ocultar_seccion_actualizar();
    }
}

// Función ejecutar la actualización final
async function ejecutar_actualizacion_empleado() {
    const inputs = [
        document.getElementById("actualizar_id_empleado"),
        document.getElementById("actualizar_nombre_empleado"),
        document.getElementById("actualizar_apellido_empleado"),
        document.getElementById("actualizar_edad_empleado"),
        document.getElementById("actualizar_id_departamento_empleado"),
        document.getElementById("actualizar_salario_empleado"),
        document.getElementById("actualizar_provincia_empleado")
    ];

    for (let input of inputs) {
        if (!input.checkValidity()) {
            input.reportValidity();
            return;
        }
    }

    const empleado = {
        id_empleado: Number(inputs[0].value),
        nombre: inputs[1].value,
        apellido: inputs[2].value,
        edad: Number(inputs[3].value),
        id_departamento: Number(inputs[4].value),
        salario: Number(inputs[5].value),
        provincia: inputs[6].value
    };

    try {
        const respuesta = await fetch("empleados/actualizar_empleado", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(empleado)
        });

        if (respuesta.ok) {
            mostrar_modal("Empleado actualizado correctamente");
            document.getElementById("actualizar_id_empleado").value = "";
            ocultar_seccion_actualizar();
            mostrar_empleados();
        } else {
            mostrar_modal("Error al actualizar empleado");
        }
    } catch (error) {
        console.error(error);
        mostrar_modal("Error de comunicación con el servidor");
    }
}

// Función eliminar empleado por id
async function eliminar_empleado() {
    const input_id = document.getElementById("id_eliminar_empleado");

    if (!input_id.checkValidity()) {
        input_id.reportValidity();
        return;
    }

    try {
        const respuesta = await fetch(`empleados/eliminar_empleado/${input_id.value}`, {
            method: "DELETE"
        });

        if (respuesta.ok) {
            mostrar_modal("Empleado eliminado correctamente");
            input_id.value = "";
            mostrar_empleados();
        } else {
            mostrar_modal("El ID del empleado no existe en la base de datos");
        }

    } catch (error) {
        console.error(error);
        mostrar_modal("Error al eliminar empleado");
    }
}

// Función obtener promedio salario por provincia
async function obtener_promedio_salarios() {
    const contenedor = document.getElementById("tabla_empleados");

    try {
        const respuesta = await fetch("empleados/promedio_salario_provincia");

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener el salario promedio");
        }

        const resultados = await respuesta.json();
        contenedor.innerHTML = "";

        resultados.forEach(item => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>-</td>
                <td>Provincia: ${item._id}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>${item.promedio_salario.toFixed(2)}</td>
                <td>-</td>
            `;
            contenedor.appendChild(fila);
        });

    } catch (error) {
        console.error(error);
        alert("Error al obtener el salario promedio por provincia");
    }
}

// Función exportar empleados
async function exportar_empleados() {
    try {
        const respuesta = await fetch('/empleados/export');
        const resultado = await respuesta.json();
        mostrar_modal(resultado.mensaje);
    } catch (error) {
        console.error(error);
        mostrar_modal("Error al exportar");
    }
}

// Función exportar base de datos
async function generar_backup_db() {
    try {
        const respuesta = await fetch('/empleados/backup');
        const resultado = await respuesta.json();
        mostrar_modal(resultado.mensaje);
    } catch (error) {
        console.error(error);
        mostrar_modal("Error al generar backup");
    }
}

// Funciones auxiliares para controlar el modal
function mostrar_modal(mensaje) {
    const contenido = document.getElementById("contenido_modal");
    const modal = document.getElementById("mi_modal");
    if (contenido) contenido.innerText = mensaje;
    if (modal) modal.style.display = "flex";
}

function cerrar_modal() {
    const modal = document.getElementById("mi_modal");
    if (modal) modal.style.display = "none";
}