// dashboard_users.js

import { fetchData, obtenerEntidades } from './api_fetch.js';

document.addEventListener('DOMContentLoaded', async () => {
    const boton_abrir = document.getElementById("formulario_crear");
    const boton_cerrar = document.getElementById("cerrar_formulario");
    const formulario_añadir = document.getElementById("formulario_añadir");
    const form = document.querySelector(".formulario_añadir form");

    let currentUserId = null;

    async function inicializarDashboard() {
        try {
            await obtenerEntidades('user', construir_tabla);
        } catch (error) {
            if (error.message.includes('401')) {
                alert("Sesión no autorizada. Por favor, inicie sesión.");
                window.location.href = '/login.html';
            } else {
                console.error('Error al inicializar el dashboard:', error);
            }
        }
    }
    
    inicializarDashboard();

    boton_abrir.addEventListener("click", () => {
        formulario_añadir.classList.add("open");
        form.reset();
        currentUserId = null;
        document.querySelector('input[name="contraseña"]').setAttribute('required', '');
        document.querySelector('input[name="contraseña"]').placeholder = 'Contraseña';
        fetchData('doc', 'tipo_doc', 'id_doc', 'siglas').catch(err => console.error("Error al cargar docs:", err));
        fetchData('colegio', 'colegio', 'id_colegio', 'nombre_colegio').catch(err => console.error("Error al cargar colegios:", err));
        fetchData('rol', 'rol', 'id_rol', 'nombre_rol').catch(err => console.error("Error al cargar roles:", err));
    });

    boton_cerrar.addEventListener("click", () => {
        formulario_añadir.classList.remove("open");
    });

    document.getElementById('cuerpo_tabla').addEventListener('click', async (e) => {
        if (e.target.classList.contains('editar_btn')) {
            const userId = e.target.dataset.id;
            await abrirFormularioEdicion(userId);
        } else if (e.target.matches('.confirmacion_btn')) {
            const userId = e.target.dataset.id;
            
            const confirmacion = confirm('¿Estás seguro de que quieres eliminar a este usuario? Esta acción es irreversible.');

            if (confirmacion) {
                try {
                    const response = await fetch(`http://localhost:3000/user/${userId}`, {
                        method: 'DELETE',
                        credentials: 'include',
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                    }

                    const result = await response.json();
                    
                    obtenerEntidades('user', construir_tabla);

                } catch (error) {
                    console.error('Error al eliminar usuario:', error);
                    alert(`Error al eliminar usuario: ${error.message}`);
                }
            }
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isUpdating = currentUserId !== null;
        const endpoint = isUpdating 
            ? `http://localhost:3000/user/${currentUserId}` 
            : 'http://localhost:3000/user';

        const method = isUpdating ? 'PATCH' : 'POST';

        try {
            const nombre_user = document.querySelector('input[name="nombre_usuario"]').value;
            const apellido_user = document.querySelector('input[name="apellido"]').value;
            const numero_documento = document.querySelector('input[name="documento"]').value;
            const password = document.querySelector('input[name="contraseña"]').value;
            const id_colegio = document.getElementById('colegio').value;
            const id_rol = document.getElementById('rol').value;
            const id_doc = document.getElementById('tipo_doc').value;
            
            // Ajuste aquí: los nombres de las propiedades deben coincidir con tu DTO
            const userData = {
                nombre_user,
                apellido_user,
                numero_documento,
                password_user: password,
                colegio: Number(id_colegio),
                rol: Number(id_rol),
                tipo_doc: Number(id_doc),
            };

            // Para la actualización, elimina el campo de contraseña si está vacío
            if (isUpdating && password === '') {
                delete userData.password_user;
            }

            const response = await fetch(endpoint, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            console.log(`Usuario ${isUpdating ? 'actualizado' : 'creado'} exitosamente:`, await response.json());
            
            form.reset();
            formulario_añadir.classList.remove("open");
            currentUserId = null;
            
            obtenerEntidades('user', construir_tabla);
            
        } catch (error) {
            console.error(`Error al ${isUpdating ? 'actualizar' : 'registrar'} usuario:`, error);
            alert(`Error al ${isUpdating ? 'actualizar' : 'registrar'} usuario: ${error.message}`);
        }
    });

    async function abrirFormularioEdicion(id) {
        try {
            const response = await fetch(`http://localhost:3000/user/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const usuario = await response.json();

            document.querySelector('input[name="nombre_usuario"]').value = usuario.nombre_user;
            document.querySelector('input[name="apellido"]').value = usuario.apellido_user;
            document.querySelector('input[name="documento"]').value = usuario.numero_documento;

            // Al editar, el campo de contraseña no es requerido
            const passwordInput = document.querySelector('input[name="contraseña"]');
            passwordInput.value = '';
            passwordInput.placeholder = 'Dejar vacío para no cambiar';
            passwordInput.removeAttribute('required');

            await fetchData('doc', 'tipo_doc', 'id_doc', 'siglas');
            document.getElementById('tipo_doc').value = usuario.tipo_doc.id_doc;

            await fetchData('colegio', 'colegio', 'id_colegio', 'nombre_colegio');
            document.getElementById('colegio').value = usuario.colegio.id_colegio;

            await fetchData('rol', 'rol', 'id_rol', 'nombre_rol');
            document.getElementById('rol').value = usuario.rol.id_rol;

            currentUserId = id; 
            
            formulario_añadir.classList.add('open');

        } catch (error) {
            console.error('Error al cargar datos para edición:', error);
            alert('No se pudo cargar la información del usuario para editar.');
        }
    }
});

function construir_tabla(data) {
    const tabla = document.getElementById("cuerpo_tabla");
    tabla.innerHTML = '';
    data.forEach(usuario => {
        const fila = `
            <tr class="fila-cuerpo">
                <td>${usuario.nombre_user}</td>
                <td>${usuario.apellido_user}</td>
                <td>${usuario.tipo_doc.siglas}</td>
                <td>${usuario.numero_documento}</td>
                <td>${usuario.rol.nombre_rol}</td>
                <td>${usuario.colegio.nombre_colegio}</td>
                <td>
                    <button class="editar_btn" data-id="${usuario.id_user}">Editar ✍️</button>
                    <button class="confirmacion_btn" data-id="${usuario.id_user}">Eliminar 🗑️</button>
                </td>
            </tr>`;
        tabla.innerHTML += fila;
    });
}