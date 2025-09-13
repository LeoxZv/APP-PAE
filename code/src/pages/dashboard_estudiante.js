// dashboard_estudiante.js

import { fetchData, obtenerEntidades } from './api_fetch.js';

document.addEventListener('DOMContentLoaded', () => {
    const boton_abrir = document.getElementById("formulario_crear");
    const boton_cerrar = document.getElementById("cerrar_formulario");
    const formulario_añadir = document.getElementById("formulario_añadir");
    const form = document.querySelector(".formulario_añadir form");

    let currentEstudianteId = null;

    boton_abrir.addEventListener("click", () => {
        formulario_añadir.classList.add("open");
        form.reset();
        currentEstudianteId = null;
        fetchData('doc', 'tipo_doc', 'id_doc', 'siglas');
        fetchData('grado', 'grado', 'id_grado', 'numero_grado');
        fetchData('jornada', 'Jornada', 'id_jornada', 'nombre_jornada');
    });

    boton_cerrar.addEventListener("click", () => {
        formulario_añadir.classList.remove("open");
    });

    // Combina los dos listeners de clic en uno solo para evitar errores
    document.getElementById('cuerpo_tabla').addEventListener('click', async (e) => {
        // Lógica para el botón de editar
        if (e.target.classList.contains('editar_btn')) {
            const estudianteId = e.target.dataset.id;
            await abrirFormularioEdicion(estudianteId);
        }
        // Lógica para el botón de eliminar
        else if (e.target.matches('.confirmacion_btn')) {
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

                    obtenerEntidades('estudiante', construir_tabla);

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
            const userColegioId = userData.colegio.id_colegio;

            const nombre_estudiante = document.querySelector('input[name="nombre_usuario"]').value;
            const apellido_estudiante = document.querySelector('input[name="apellido"]').value;
            const numero_documento = document.querySelector('input[name="documento"]').value;
            const id_grado = document.getElementById('grado').value;
            const id_jornada = document.getElementById('Jornada').value;
            const id_doc = document.getElementById('tipo_doc').value;

            const estudianteData = {
                nombre_estudiante,
                apellido_estudiante,
                numero_documento,
                id_grado: Number(id_grado),
                id_jornada: Number(id_jornada),
                id_doc: Number(id_doc),
                colegio: userColegioId,
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

            obtenerEntidades('estudiante', construir_tabla);

        } catch (error) {
            console.error(`Error al ${currentEstudianteId ? 'actualizar' : 'registrar'} estudiante:`, error);
            alert(`Error al ${currentEstudianteId ? 'actualizar' : 'registrar'} estudiante: ${error.message}`);
        }
    });

    obtenerEntidades('estudiante', construir_tabla);

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

function construir_tabla(data) {
    const tabla = document.getElementById("cuerpo_tabla");
    tabla.innerHTML = '';
    data.forEach(estudiante => {
        const fila = `
            <tr class="fila-cuerpo">
                <td>${estudiante.nombre_estudiante}</td>
                <td>${estudiante.apellido_estudiante}</td>
                <td>${estudiante.tipo_doc.siglas}</td>
                <td>${estudiante.numero_documento}</td>
                <td>${estudiante.grado.numero_grado}</td>
                <td>${estudiante.jornada.nombre_jornada}</td>
                <td>${estudiante.colegio.nombre_colegio}</td>
                <td>
                    <button class="editar_btn" data-id="${estudiante.id_estudiante}">Editar ✍️</button>
                    <button class="confirmacion_btn" data-id="${estudiante.id_estudiante}">Eliminar 🗑️</button>
                </td>
            </tr>`;
        tabla.innerHTML += fila;
    });
}