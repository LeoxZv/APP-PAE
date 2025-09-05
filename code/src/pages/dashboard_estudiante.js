// Código JavaScript para manejar el formulario y mostrar datos en la tabla


const boton_abrir = document.getElementById("formulario_crear");
const boton_cerrar = document.getElementById("cerrar_formulario");
const formulario_añadir = document.getElementById("formulario_añadir");

boton_abrir.addEventListener("click", () => {
    formulario_añadir.classList.add("open");
	fetchTipo_doc();
	fetchColegios();
    fetchGrado();
    fecthJornada();
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
        const data = await response.json(); 

        console.log('exitoso, pudimos traer los tipos de documento:', data);

        // Limpia las opciones existentes
        tipo_doc_select.innerHTML = '';

        // Agrega la opción por defecto
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Tipo de documento';
        defaultOption.value = ''; 
        defaultOption.disabled = true;
        defaultOption.selected = true;
        tipo_doc_select.appendChild(defaultOption);

        // Itera sobre el array 'data' para crear las opciones
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
        const data = await response.json(); 
        console.log('exitoso, pudimos traer los colegios:', data);
        
        // Limpia las opciones existentes
        colegio_select.innerHTML = '';
        
        // Agrega la opción por defecto
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Colegio';
        defaultOption.value = ''; 
        defaultOption.disabled = true;
        defaultOption.selected = true;
        colegio_select.appendChild(defaultOption);

        // Itera sobre el array 'data' para crear las opciones
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

async function fetchGrado() {
    try {
        const response = await fetch('http://localhost:3000/grado', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const grado_select = document.getElementById('grado');
        const data = await response.json(); 
        console.log('exitoso, pudimos traer los grados:', data);
        
        // Limpia las opciones existentes
        grado_select.innerHTML = '';

        // Agrega la opción por defecto
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Grado';
        defaultOption.value = ''; 
        defaultOption.disabled = true;
        defaultOption.selected = true;
        grado_select.appendChild(defaultOption);

        // Itera sobre el array 'data' para crear las opciones
        data.forEach(grado => {
            const option = document.createElement('option');
            option.value = grado.id_grado;
            option.textContent = grado.numero_grado;
            grado_select.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al cargar los grados.');
        return [];
    }
}

async function fecthJornada() {
	try {
		const response = await fetch('http://localhost:3000/jornada', {
			method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
		const jornada_select = document.getElementById('Jornada');
		const data = await response.json(); // 'data' ahora es el array de colegios
		console.log('exitoso, pudimos traer las jornadas:', data);
		// Limpiar opciones existentes y añadir una opción por defecto
		jornada_select.innerHTML = '';

                // Agrega una opción por defecto para guiar al usuario
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Jornada';
        defaultOption.value = ''; // Opcional: valor vacío para validación
        defaultOption.disabled = true;
        defaultOption.selected = true;
        jornada_select.appendChild(defaultOption); 
		// Iterar directamente sobre el array 'data' para crear las opciones
		data.forEach(jornada => {
			const option = document.createElement('option');
			option.value = jornada.id_jornada;
			option.textContent = jornada.nombre_jornada;
			jornada_select.appendChild(option);
		});
	} catch (error) {
		console.error('Error:', error);
		alert('Hubo un problema al cargar los colegios.');
		return [];
	}
}

async function obtenerEstudiantes() {
    try {
        const response = await fetch('http://localhost:3000/estudiante', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); 
        
        // Verifica si la respuesta es un array o un objeto con un array
        const estudiantes = data.message || data; 

        if (Array.isArray(estudiantes)) {
            console.log('Éxito, pudimos traer los estudiantes:', estudiantes);
            construir_tabla(estudiantes); 
        } else {
            console.log('Conexión fallida: La respuesta no es un array.', data);
            alert('No pudimos obtener los estudiantes. La respuesta del servidor es inesperada.');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al conectar con el servidor.');
    }
}




function construir_tabla(data){

    let tabla = document.getElementById("cuerpo_tabla");

    for (i= 0; i < data.length; i++) {
        var fila = `<tr class="fila-cuerpo">
                        <td>${data[i].nombre_estudiante}</td>
                        <td>${data[i].apellido_estudiante}</td>
                        <td>${data[i].id_doc.siglas}</td>
                        <td>${data[i].numero_documento}</td>
                        <td>${data[i].id_grado.numero_grado}</td>
                        <td>${data[i].id_jornada.nombre_jornada}</td>
                        <td>${data[i].colegio.nombre_colegio}</td>
                        <td><button class="editar_btn">Editar ✍️</button>
                        <button class="confirmacion_btn">Eliminar 🗑️</button></td>
                    </tr>`;
        tabla.innerHTML += fila;
    }
}
obtenerEstudiantes();