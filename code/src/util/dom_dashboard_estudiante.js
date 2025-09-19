// util/dom_dashboard_estudiante.js

/**
 * Controla la visibilidad del botón para añadir estudiantes.
 * Es visible solo para los roles 'admin' y 'colegio'.
 * @param {object} user - El objeto de usuario.
 */
export function toggleAddStudentButton(user) {
    const botonCrear = document.getElementById('formulario_crear');
    if (botonCrear) {
        const userRole = user.rol.nombre_rol;
        if (userRole === 'aseador' || userRole === 'colegio') {
            botonCrear.style.display = 'block';
        } else {
            botonCrear.style.display = 'none';
        }
    }
}

/**
 * Controla la visibilidad de la columna 'Colegio'.
 * Es visible solo para el rol 'admin'.
 * @param {object} user - El objeto de usuario.
 */
export function toggleColegioColumn(user) {
    const headerColegio = document.getElementById('header-colegio');
    const celdasColegio = document.querySelectorAll('.celda-colegio');

    const userRole = user.rol.nombre_rol;
    const isVisible = userRole === 'aseador' || userRole === 'admin';

    if (headerColegio) {
        headerColegio.style.display = isVisible ? 'table-cell' : 'none';
    }

    celdasColegio.forEach(celda => {
        celda.style.display = isVisible ? 'table-cell' : 'none';
    });
}

/**
 * Controla la visibilidad de la columna 'Acciones'.
 * Es visible para los roles 'admin' y 'colegio'.
 * @param {object} user - El objeto de usuario.
 */
export function toggleAccionesColumn(user) {
    const headerAcciones = document.getElementById('header-acciones');
    const celdasAcciones = document.querySelectorAll('.celda-acciones');

    const userRole = user.rol.nombre_rol;
    const isVisible = userRole === 'aseador' || userRole === 'colegio';

    if (headerAcciones) {
        headerAcciones.style.display = isVisible ? 'table-cell' : 'none';
    }

    celdasAcciones.forEach(celda => {
        celda.style.display = isVisible ? 'table-cell' : 'none';
    });
}

/**
 * Controla la visibilidad del select de colegios.
 * Solo es visible para el rol 'admin'.
 * @param {object} user - El objeto de usuario.
 */
export function toggleColegioSelect(user) {
    console.log('toggleColegioSelect user:', user); // Depuración
    const selectColegio = document.getElementById('colegio');
    const userRole = user.rol.nombre_rol;

    if (selectColegio) {
        if (userRole === 'aseador') {
            selectColegio.style.display = 'block';
        } else {
            selectColegio.style.display = 'none';
        }
    }
}