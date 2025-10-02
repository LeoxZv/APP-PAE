import { fetchData, obtenerEntidades } from '../util/api_fetch.js';
import { verifyAuthAndRoles } from '../util/auth.js';
import { 
    toggleAddStudentButton,
    toggleColegioColumn,
    toggleAccionesColumn, 
    toggleColegioSelect
} from '../util/dom_dashboard_estudiante.js';

// =================================================================
// GLOBALES Y ESTADO DE FILTRADO
// =================================================================

// Conjunto que mantiene los IDs de los elementos (grados, docs, etc.) activos
const filtrosActivos = { 
    tipo_doc: new Set(), 
    grado: new Set(), 
    jornada: new Set(),
    colegio: new Set() 
};
let estudiantesData = []; // Data original sin filtrar

// =================================================================
// FUNCIÓN CENTRAL DE FILTRADO (Corregida)
// =================================================================

function aplicarFiltrosGlobales() {
    // 1. Obtener valores de los inputs de texto
    const busquedaInputNombre = document.getElementById('inputBusqueda').value.toLowerCase();
    const busquedaInputApellido = document.getElementById('inputApellido').value.toLowerCase(); 
    const busquedaInputDocumento = document.getElementById('inputDocumento').value;

     let resultados = estudiantesData.filter(estudiante => {
        
        // 1.1. FILTRO DE TEXTO: Se aplican a los campos nombre, apellido, y documento.
        const nombreCoincide = estudiante.nombre_estudiante.toLowerCase().includes(busquedaInputNombre);
        const apellidoCoincide = estudiante.apellido_estudiante.toLowerCase().includes(busquedaInputApellido); 
        const documentoCoincide = estudiante.numero_documento.toString().includes(busquedaInputDocumento);
        
        // 1.2. FILTRO DE CHECKBOXES: Se aplican a las claves foráneas (ID's).
        
        // Función auxiliar para verificar si el filtro de una categoría está activo
        const isFilterActive = (category, value) => {
             // Si el Set tiene elementos, verificamos si el valor está presente.
             // Si el Set está vacío, NO lo aplicamos, o bien asumimos que si está vacío
             // se aplica por defecto (se implementó la lógica de llenado por defecto en construirCheckboxes)
             
             // NOTA CLAVE: Ya que construirCheckboxes llena el Set por defecto, 
             // el Set NUNCA debería estar vacío después de la carga inicial.
             // Si está vacío, significa que los filtros AÚN no han cargado.
             
             // Para la primera carga, si el Set está vacío, asumimos que todos deben coincidir (true).
             if (filtrosActivos[category].size === 0) {
                 return true; 
             }
             return filtrosActivos[category].has(value.toString());
        };
        
        // Aplicación del filtro usando la función auxiliar
        const gradoCoincide = isFilterActive('grado', estudiante.grado.id_grado);
        const tipoDocCoincide = isFilterActive('tipo_doc', estudiante.tipo_doc.id_doc);
        const jornadaCoincide = isFilterActive('jornada', estudiante.jornada.id_jornada);

        // Manejo de Colegio
        let colegioCoincide = true;
        if (estudiante.colegio) {
            colegioCoincide = isFilterActive('colegio', estudiante.colegio.id_colegio);
        } else {
             // Si no tiene colegio, siempre coincide (a menos que haya un filtro específico para "sin colegio")
             colegioCoincide = true; 
        }

        return nombreCoincide && apellidoCoincide && documentoCoincide && gradoCoincide && tipoDocCoincide && jornadaCoincide && colegioCoincide;
    });

    // Reconstruir la tabla con los resultados filtrados
    construir_tabla(resultados, window.user);
}

// =================================================================
// CONSTRUCTOR DE CHECKBOXES (Funcionalidad de filtro)
// =================================================================

function construirCheckboxes(data, filterCategory, valueKey, textKey) {
    const container = document.getElementById(`filtro_${filterCategory}`);
    if (!container) return; 

    /* container.innerHTML = `<h4>${filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)}</h4>`; 
     */
    container.innerHTML = '';
    filtrosActivos[filterCategory].clear();
    
    data.forEach(item => {
        const itemId = item[valueKey];
        const itemText = item[textKey];
        
        // Todos activos por defecto
        filtrosActivos[filterCategory].add(itemId.toString()); 

        const div = document.createElement('div');
        div.className = 'filtro-item';
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `chk_${filterCategory}_${itemId}`;
        input.value = itemId;
        input.checked = true; 
        
        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = itemText;

        input.addEventListener('change', () => {
            // Actualiza el Set de filtros al marcar/desmarcar
            if (input.checked) {
                filtrosActivos[filterCategory].add(itemId.toString());
            } else {
                filtrosActivos[filterCategory].delete(itemId.toString());
            }
            aplicarFiltrosGlobales(); // Aplicar el filtro inmediatamente
        });

        div.appendChild(input);
        div.appendChild(label);
        container.appendChild(div);
    });
}


// =================================================================
// FUNCIÓN PARA CONSTRUIR LA TABLA (SE CONSERVA)
// =================================================================

function construir_tabla(data, user) {
    // Es CRÍTICO que los datos tengan las relaciones anidadas (ej. estudiante.grado.id_grado)
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
                <td class="celda-colegio">${estudiante.colegio ? estudiante.colegio.nombre_colegio : 'N/A'}</td>
                <td class="celda-acciones">
                    <button class="editar_btn" data-id="${estudiante.id_estudiante}">Editar ✍️</button>
                    <button class="confirmacion_btn" data-id="${estudiante.id_estudiante}">Eliminar 🗑️</button>
                </td>
            </tr>`;
        tabla.innerHTML += fila;
    });

    toggleColegioColumn(user);
    toggleAccionesColumn(user);
}


// =================================================================
// LÓGICA DE INICIALIZACIÓN
// =================================================================

document.addEventListener('DOMContentLoaded', async () => {

    const permittedRoles = ['Admin', 'Aseador', 'Profesor', 'Colegio'];

    const user = await verifyAuthAndRoles(permittedRoles);
    if (!user) {
        return;
    }
    // Hacemos el objeto user accesible globalmente para la función construir_tabla
    window.user = user; 

    // 1. Inicialización de elementos del DOM
    const boton_abrir = document.getElementById("formulario_crear");
    const boton_cerrar = document.getElementById("cerrar_formulario");
    const formulario_añadir = document.getElementById("formulario_añadir");
    const form = document.querySelector(".formulario_añadir form");
    const botonFiltro = document.getElementById("btnFiltro");
    const contenedorFiltros = document.getElementById("contenedorFiltros");
    
    // Inicializar inputs de búsqueda y adjuntar el listener
    const busquedaInputNombre = document.getElementById('inputBusqueda');
    const busquedaInputApellido = document.getElementById('inputApellido'); // Si añades ID al input de apellido
    const busquedaInputDocumento = document.getElementById('inputDocumento');
    
    [busquedaInputNombre, busquedaInputDocumento, busquedaInputApellido].forEach(element => {
        if (element) {
            element.addEventListener('input', aplicarFiltrosGlobales);
        }
    });

    let currentEstudianteId = null;

    botonFiltro.addEventListener('click', function() {
    // 1. Alternar la clase 'mostrar' en el div de filtros
    contenedorFiltros.classList.toggle('mostrar');
    
    // 2. Cambiar el texto del botón basado en el estado
    if (contenedorFiltros.classList.contains('mostrar')) {
        botonFiltro.textContent = 'Ocultar Filtros';
    } else {
        botonFiltro.textContent = 'Mostrar Filtros';
    }
    });

    botonFiltro.textContent = 'Mostrar Filtros';
    
    document.querySelectorAll('.dropdown-filtro-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // Encontramos el contenedor del contenido (el div con los checkboxes)
            const dropdownContent = e.target.nextElementSibling;
            
            // Cerramos cualquier otro dropdown abierto
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content !== dropdownContent && content.classList.contains('show')) {
                    content.classList.remove('show');
                }
            });

            // Alternamos el dropdown actual
            dropdownContent.classList.toggle('show');
            });
    });

    // Cerrar dropdowns si se hace clic fuera
    window.addEventListener('click', (e) => {
        if (!e.target.matches('.dropdown-filtro-btn')) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content.classList.contains('show')) {
                    content.classList.remove('show');
                }
            });
        }
    });

    // Lógica para formulario de creación/edición (se mantiene)
    toggleAddStudentButton(user); 
    if (boton_abrir) {
        boton_abrir.addEventListener("click", () => {
            formulario_añadir.classList.add("open");
            form.reset();
            currentEstudianteId = null;
            
            // Cargar datos para SELECTS de Formulario (usando IDs del formulario, ej. 'tipo_doc')
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

    // Lógica para eliminar y editar (se mantiene)
    document.getElementById('cuerpo_tabla').addEventListener('click', async (e) => {
        // ... (Tu lógica de editar y eliminar) ...
    });

    // Lógica para enviar formulario (se mantiene)
    form.addEventListener('submit', async (e) => {
        // ... (Tu lógica de submit) ...
    });


    // =================================================================
    // Carga Inicial de Datos y Filtros
    // =================================================================

    // 2. Cargar datos de filtros y construir checkboxes
    const loadFilters = async () => {
        // NOTA: 'fetchData' debe modificarse para devolver los datos en lugar de solo poblar un select
        // Si fetchData no devuelve los datos, necesitas una función 'fetchEntities' separada o modificar fetchData.
        
        const fetchAndBuild = async (endpoint, category, valueKey, textKey) => {
             const response = await fetch(`http://localhost:3000/${endpoint}`, { 
                 method: 'GET',
                 headers: { 'Content-Type': 'application/json' },
                 credentials: 'include',
             });
             if (response.ok) {
                 const data = await response.json();
                 construirCheckboxes(data, category, valueKey, textKey);
                 return data;
             }
             return [];
        };

        await Promise.all([
            fetchAndBuild('doc', 'tipo_doc', 'id_doc', 'siglas'),
            fetchAndBuild('grado', 'grado', 'id_grado', 'numero_grado'),
            fetchAndBuild('jornada', 'jornada', 'id_jornada', 'nombre_jornada'),
            // Solo cargar colegios si el rol lo permite
            user.rol.nombre_rol === 'aseador' ? fetchAndBuild('colegio', 'colegio', 'id_colegio', 'nombre_colegio') : Promise.resolve(),
        ]);
        
        // 3. Carga Inicial de Estudiantes
        // Modificamos el callback de obtenerEntidades para almacenar los datos
        obtenerEntidades('estudiante', (data) => {
            estudiantesData = data; // Guarda la data original
            construir_tabla(data, user); // Construye la tabla inicial
        });
        
    };
    
    loadFilters();

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
        
        // 1. Rellenar campos de texto
        document.querySelector('input[name="nombre_usuario"]').value = estudiante.nombre_estudiante;
        document.querySelector('input[name="apellido"]').value = estudiante.apellido_estudiante;
        document.querySelector('input[name="documento"]').value = estudiante.numero_documento;

        // 2. Rellenar selects
        // Es CRÍTICO que los selects se llenen *antes* de intentar seleccionar el valor.
        
        // Tipo de Documento
        await fetchData('doc', 'tipo_doc', 'id_doc', 'siglas');
        document.getElementById('tipo_doc').value = estudiante.tipo_doc?.id_doc || '';
        
        // Grado
        await fetchData('grado', 'grado', 'id_grado', 'numero_grado');
        document.getElementById('grado').value = estudiante.grado?.id_grado || '';
        
        // Jornada
        await fetchData('jornada', 'Jornada', 'id_jornada', 'nombre_jornada');
        document.getElementById('Jornada').value = estudiante.jornada?.id_jornada || '';

        // 3. Manejo Condicional del Select de Colegio
        toggleColegioSelect(window.user); // Muestra/Oculta el select de Colegio según el rol
        if (window.user.rol.nombre_rol === 'aseador') {
            await fetchData('colegio', 'colegio', 'id_colegio', 'nombre_colegio');
            document.getElementById('colegio').value = estudiante.colegio?.id_colegio || '';
        }
        
        // 4. Finalizar
        currentEstudianteId = id;
        formulario_añadir.classList.add('open');
        
    } catch (error) {
        console.error('Error al cargar datos para edición:', error);
        alert('No se pudo cargar la información del estudiante para editar.');
    }
}});

