// Código JavaScript para manejar el formulario y mostrar datos en la tabla


const boton_abrir = document.getElementById("formulario_crear");
const boton_cerrar = document.getElementById("cerrar_formulario");
const formulario_añadir = document.getElementById("formulario_añadir");

boton_abrir.addEventListener("click", () => {
    formulario_añadir.classList.add("open");
	fetchTipo_doc();
	fetchColegios();
    fetchRol();
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

async function fetchRol() {
    try {
        const response = await fetch('http://localhost:3000/rol', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const rol_select = document.getElementById('rol');
        const data = await response.json(); 

        console.log('exitoso, pudimos traer tu rol:', data);

        // Limpia las opciones existentes
        rol_select.innerHTML = '';
        
        // Agrega una opción por defecto para guiar al usuario
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Rol';
        defaultOption.value = ''; // Opcional: valor vacío para validación
        defaultOption.disabled = true;
        defaultOption.selected = true;
        rol_select.appendChild(defaultOption);

        // Itera sobre el array 'data' y crea las opciones
        data.forEach(rol => {
            const option = document.createElement('option');
            option.value = rol.id_rol; // Es mejor usar el ID como valor
            option.textContent = rol.nombre_rol; // Muestra el nombre del rol
            rol_select.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al cargar los roles.');
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

async function obtenerUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/user', {
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
        const usuarios = data.message || data; 

        if (Array.isArray(usuarios)) {
            console.log('Éxito, pudimos traer los usuarios:', usuarios);
            construir_tabla(usuarios); 
        } else {
            console.log('Conexión fallida: La respuesta no es un array.', data);
            alert('No pudimos obtener los usuarios. La respuesta del servidor es inesperada.');
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
                        <td>${data[i].nombre_user}</td>
                        <td>${data[i].apellido_user}</td>
                        <td>${data[i].tipo_doc.siglas}</td>
                        <td>${data[i].numero_documento}</td>
                        <td>${data[i].rol.nombre_rol}</td>
                        <td>${data[i].colegio.nombre_colegio}</td>
                        <td><button class="editar_btn">Editar ✍️</button>
                        <button class="confirmacion_btn">Eliminar 🗑️</button></td>
                    </tr>`;
        tabla.innerHTML += fila;
    }
}
obtenerUsuarios();