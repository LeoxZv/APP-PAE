// Código JavaScript para manejar el formulario y mostrar datos en la tabla


const boton_abrir = document.getElementById("formulario_crear");
const boton_cerrar = document.getElementById("cerrar_formulario");
const formulario_añadir = document.getElementById("formulario_añadir");

boton_abrir.addEventListener("click", () => {
    formulario_añadir.classList.add("open");
	fetchTipo_doc();
	fetchColegios();
});

boton_cerrar.addEventListener("click", () => {
    formulario_añadir.classList.remove("open");
});

async function fetchTipo_doc() {
    try {
        const response = await fetch('http://localhost:3000/doc', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const tipo_doc_select = document.getElementById('tipo_doc');
        const data = await response.json(); // 'data' ahora es el array de documentos

        // La respuesta del servidor es directamente el array, por lo que no se necesita `data.success`
        console.log('exitoso, pudimos traer los tipos de documento:', data);

        // Limpiar opciones existentes y añadir una opción por defecto
        tipo_doc_select.innerHTML = '';

        // Iterar directamente sobre el array 'data' para crear las opciones
        data.forEach(tipo_doc => {
            const option = document.createElement('option');
            option.value = tipo_doc.id_doc;
            option.textContent = tipo_doc.siglas;
            tipo_doc_select.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al cargar los tipos de documento.');
        return [];
    }
}

async function fetchColegios() {
	try {
		const response = await fetch('http://localhost:3000/colegio', {
			method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
		const colegio_select = document.getElementById('colegio');
		const data = await response.json(); // 'data' ahora es el array de colegios
		console.log('exitoso, pudimos traer los colegios:', data);
		// Limpiar opciones existentes y añadir una opción por defecto
		colegio_select.innerHTML = '';
		// Iterar directamente sobre el array 'data' para crear las opciones
		data.forEach(colegio => {
			const option = document.createElement('option');
			option.value = colegio.id_colegio;
			option.textContent = colegio.nombre_colegio;
			colegio_select.appendChild(option);
		});
	} catch (error) {
		console.error('Error:', error);
		alert('Hubo un problema al cargar los colegios.');
		return [];
	}
}

    fetch('http://localhost:3000/estudiante', { // Cambia la URL si tu servidor está en otro puerto
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json()) // Verifica que la respuesta sea JSON
    .then(data => {
        if (data.success) {
            console.log('exitoso, pudimos traer los estudiantes:', data.message);
        } else {
            console.log('Conexion fallida:', data.message);
            alert('No pudimos traer los estudiantes. Intenta nuevamente.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un problema al intentar iniciar sesión.');
    });

function construir_tabla(data){

    let tabla = document.getElementById("cuerpo_tabla");

    for (i= 0; i < data.length; i++) {
        var fila = `<tr>
                        <td>${data[i].nombre_estudiante}</td>
                        <td>${data[i].apellido_estudiante}</td>
                        <td>${data[i].tipo_doc.siglas}</td>
                        <td>${data[i].numero_documento}</td>
                        <td>${data[i].grado}</td>
                        <td>${data[i].jornada}</td>
                        <td>${data[i].colegio.nombre_colegio}</td>

                    </tr>`;
        tabla.innerHTML += fila;
    }
}

construir_tabla(ejemplo_data);