// util/dom_index.js

/**
 * Actualiza el mensaje de bienvenida con el nombre del usuario.
 * @param {object} user - El objeto de usuario.
 */
export function updateWelcomeMessage(user) {
  const welcomeMessageElement = document.getElementById('welcome-message');
  if (welcomeMessageElement && user.nombre_user && user.apellido_user) {
    const fullName = `${user.nombre_user} ${user.apellido_user}`;
    welcomeMessageElement.textContent = `¡Bienvenido, ${fullName}! 🎉`;
  }
}

/**
 * Muestra u oculta el enlace al dashboard de usuarios según el rol.
 * Solo es visible para el superadmin ('aseador').
 * @param {object} user - El objeto de usuario.
 */
export function toggleDashboardUsuariosLink(user) {
  const dashboardLink = document.getElementById('dashboard-usuarios-link');
  if (dashboardLink) {
    if (user.rol.nombre_rol === 'aseador' || user.rol.nombre_rol === 'colegio') {
      dashboardLink.style.display = 'block';
    } else {
      dashboardLink.style.display = 'none';
    }
  }
}

/**
 * Actualiza el mensaje en la parte inferior de la pantalla según el rol.
 * @param {object} user - El objeto de usuario.
 */
export function updateRoleMessage(user) {
  const messageElement = document.getElementById('mensaje_rol');
  if (messageElement) {
    let message = '';
    switch (user.rol.nombre_rol) {
      case 'aseador':
        message = '<h3>¡Eres el Super Administrador! Tienes control total sobre todos los colegios y usuarios.</h3>';
        break;
      case 'colegio':
        message = '<h3>Eres el Administrador de tu colegio. Puedes gestionar a tus estudiantes y profesores.</h3>';
        break;
      case 'Profesor':
        message = '<h3>Eres un Profesor. Puedes ver a tus estudiantes y gestionar sus asistencias.</h3>';
        break;
      default:
        message = '<h3>Bienvenido. Tu rol te permite acceder a funciones específicas de tu perfil.</h3>';
    }
    messageElement.innerHTML = message;
  }
}