// auth_utils.js

const API_BASE_URL = 'http://localhost:3000';

/**
 * Verifica la autenticación del usuario y su rol.
 * @param {string[]} requiredRoles - Un array de roles permitidos para la página.
 * @returns {Promise<object | null>} - Devuelve los datos del usuario si está autorizado, de lo contrario, redirige y devuelve null.
 */
export async function verifyAuthAndRoles(requiredRoles = []) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            // Si no está autenticado, redirige al index
            window.location.href = '../pages/index.html';
            return null;
        }

        const user = await response.json();
        const userRole = user.rol.nombre_rol;

        // Si se especifican roles requeridos, verificar si el rol del usuario está en la lista
        if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
            // Si el rol no está autorizado, redirige a una página de acceso denegado
            window.location.href = '../pages/index.html';
            alert('Acceso no autorizado.');
            return null;
        }

        return user; // Devuelve el objeto de usuario si todo es correcto

    } catch (error) {
        console.error('Error al verificar la autenticación:', error);
        alert('Ocurrió un error. Por favor, intente de nuevo.');
        window.location.href = '../pages/login.html';
        return null;
    }
}
