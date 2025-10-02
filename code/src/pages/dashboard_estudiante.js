import { fetchData, obtenerEntidades } from '../util/api_fetch.js';
import { verifyAuthAndRoles } from '../util/auth.js';
import { 
    toggleAddStudentButton,
    toggleColegioColumn,
    toggleAccionesColumn, 
    toggleColegioSelect
} from '../util/dom_dashboard_estudiante.js';

document.addEventListener('DOMContentLoaded', async () => {

    // const permittedRoles = ['admin', 'aseador', 'Profesor', 'colegio'];

    // const user = await verifyAuthAndRoles(permittedRoles);
    // if (!user) {
    //     return;
    // }

    const boton_abrir = document.getElementById("formulario_crear");
    const boton_cerrar = document.getElementById("cerrar_formulario");
    const formulario_añadir = document.getElementById("formulario_añadir");
    const form = document.querySelector(".formulario_añadir form");
    const botonFiltro = document.getElementById("btnFiltro");
    const contenedorFiltros = document.getElementById("contenedorFiltros");

    let currentEstudianteId = null;

    botonFiltro.addEventListener('click', function() {
    // 3. Alternar la clase 'mostrar' en el div
    // Si tiene la clase, se la quita (y se oculta).
    // Si NO tiene la clase, se la añade (y se muestra).
    contenedorFiltros.classList.toggle('mostrar');
    });

    toggleAddStudentButton(user); 

    if (boton_filtros) {
        boton_filtros.addEventListener("click", () => {
            const isShown = filtros_container.classList.toggle("show");
            
            if (isShown) {
                boton_filtros.textContent = 'Filtros ↑';
                // Cargar datos y mostrar el colegio si el rol es 'admin'
                fetchData('doc', 'filter-tipo-doc', 'id_doc', 'siglas');
                fetchData('colegio', 'filter-colegio', 'id_colegio', 'nombre_colegio', () => {
                    if (user.rol.nombre_rol === 'admin') {
                        document.getElementById('filter-colegio').style.display = 'block';
                    }
                });
                fetchData('grado', 'filter-grado', 'id_grado', 'numero_grado');
                fetchData('jornada', 'filter-jornada', 'id_jornada', 'nombre_jornada');
            } else {
                boton_filtros.textContent = 'Filtros ↓';
            }
        });
    }
    if (boton_abrir) {
        boton_abrir.addEventListener("click", () => {
            formulario_añadir.classList.add("open");
            form.reset();
            currentEstudianteId = null;
            fetchData('doc', 'tipo_doc', 'id_doc', 'siglas');
            fetchData('grado', 'grado', 'id_grado', 'numero_grado');
            fetchData('jornada', 'Jornada', 'id_jornada', 'nombre_jornada');

            toggleColegioSelect(user);


            if (user.rol.nombre_rol === 'aseador') {
                fetchData('colegio', 'colegio', 'id_colegio', 'nombre_colegio');
            }
        });
    }
    if (boton_cerrar) {
        boton_cerrar.addEventListener("click", () => {
            formulario_añadir.classList.remove("open");
        });
    }



    document.getElementById('cuerpo_tabla').addEventListener('click', async (e) => {
        if (e.target.classList.contains('editar_btn')) {
            const estudianteId = e.target.dataset.id;
            await abrirFormularioEdicion(estudianteId);
        } else if (e.target.matches('.confirmacion_btn')) {
            const estudianteId = e.target.dataset.id;
            const confirmacion = confirm('¿Estás seguro de que quieres eliminar a este estudiante? Esta acción es irreversible.');
            if (confirmacion) {
                try {
                    const response = await fetch(`http://localhost:3000/estudiante/${estudianteId}`, {
                        method: 'DELETE',
                        credentials: 'include',
                    });
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    alert(result.message);
                    obtenerEntidades('estudiante', (data) => construir_tabla(data, user));
                } catch (error) {
                    console.error('Error al eliminar estudiante:', error);
                    alert(`Error al eliminar estudiante: ${error.message}`);
                }
            }
        }
    });

form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const endpoint = currentEstudianteId
            ? `http://localhost:3000/estudiante/${currentEstudianteId}`
            : 'http://localhost:3000/estudiante';
        const method = currentEstudianteId ? 'PATCH' : 'POST';
        try {
            const meResponse = await fetch('http://localhost:3000/auth/me', {
                method: 'GET',
                credentials: 'include',
            });
            if (!meResponse.ok) {
                throw new Error(`Error: HTTP status ${meResponse.status}`);
            }
            const userData = await meResponse.json();
            const nombre_estudiante = document.querySelector('input[name="nombre_usuario"]').value;
            const apellido_estudiante = document.querySelector('input[name="apellido"]').value;
            const numero_documento = document.querySelector('input[name="documento"]').value;
            const id_grado = document.getElementById('grado').value;
            const id_jornada = document.getElementById('Jornada').value;
            const id_doc = document.getElementById('tipo_doc').value;
            
            // Lógica para determinar el ID del colegio según el rol
            let id_colegio;
            if (userData.rol.nombre_rol === 'admin') {
                id_colegio = document.getElementById('colegio').value;
            } else {
                id_colegio = userData.colegio.id_colegio;
            }

            const estudianteData = {
                nombre_estudiante,
                apellido_estudiante,
                numero_documento,
                id_grado: Number(id_grado),
                id_jornada: Number(id_jornada),
                id_doc: Number(id_doc),
                colegio: Number(id_colegio)
            };

            const response = await fetch(endpoint, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(estudianteData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            form.reset();
            formulario_añadir.classList.remove("open");
            currentEstudianteId = null;
            obtenerEntidades('estudiante', (data) => construir_tabla(data, user));
        } catch (error) {
            console.error(`Error al ${currentEstudianteId ? 'actualizar' : 'registrar'} estudiante:`, error);
            alert(`Error al ${currentEstudianteId ? 'actualizar' : 'registrar'} estudiante: ${error.message}`);
        }
    });

    obtenerEntidades('estudiante', (data) => construir_tabla(data, user));

    async function abrirFormularioEdicion(id) {
        try {
            const response = await fetch(`http://localhost:3000/estudiante/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const estudiante = await response.json();
            document.querySelector('input[name="nombre_usuario"]').value = estudiante.nombre_estudiante;
            document.querySelector('input[name="apellido"]').value = estudiante.apellido_estudiante;
            document.querySelector('input[name="documento"]').value = estudiante.numero_documento;
            await fetchData('doc', 'tipo_doc', 'id_doc', 'siglas');
            document.getElementById('tipo_doc').value = estudiante.tipo_doc?.id_doc;
            await fetchData('grado', 'grado', 'id_grado', 'numero_grado');
            document.getElementById('grado').value = estudiante.grado?.id_grado;
            await fetchData('jornada', 'Jornada', 'id_jornada', 'nombre_jornada');
            document.getElementById('Jornada').value = estudiante.jornada?.id_jornada;
            currentEstudianteId = id;
            formulario_añadir.classList.add('open');
        } catch (error) {
            console.error('Error al cargar datos para edición:', error);
            alert('No se pudo cargar la información del estudiante para editar.');
        }
    }
});

function construir_tabla(data, user) {
    const tabla = document.getElementById("cuerpo_tabla");
    tabla.innerHTML = '';
    
    // Primero, construye las filas con todas las celdas, sin importar el rol
    data.forEach(estudiante => {
        const fila = `
            <tr class="fila-cuerpo">
                <td>${estudiante.nombre_estudiante}</td>
                <td>${estudiante.apellido_estudiante}</td>
                <td>${estudiante.tipo_doc.siglas}</td>
                <td>${estudiante.numero_documento}</td>
                <td>${estudiante.grado.numero_grado}</td>
                <td>${estudiante.jornada.nombre_jornada}</td>
                <td class="celda-colegio">${estudiante.colegio.nombre_colegio}</td>
                <td class="celda-acciones">
                    <button class="editar_btn" data-id="${estudiante.id_estudiante}">Editar ✍️</button>
                    <button class="confirmacion_btn" data-id="${estudiante.id_estudiante}">Eliminar 🗑️</button>
                </td>
            </tr>`;
        tabla.innerHTML += fila;
    });

    // Luego, llama a las funciones que ocultarán los elementos según el rol
    toggleColegioColumn(user);
    toggleAccionesColumn(user);
}