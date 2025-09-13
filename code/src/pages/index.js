// index.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/auth/me', {
    method: 'GET',
    credentials: 'include',
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      window.location.href = '/code/src/pages/login.html'; // No hay sesión, redirige
    }
  })
  .then(user => {
    const welcomeMessageElement = document.getElementById('welcome-message');
    if (welcomeMessageElement && user.nombre_user && user.apellido_user) {
      const fullName = `${user.nombre_user} ${user.apellido_user}`;
      welcomeMessageElement.textContent = `¡Bienvenido, ${fullName}! 🎉`;
    }
  })
  .catch(error => {
    console.error('Error de autenticación:', error);
    window.location.href = '/code/src/pages/login.html';
  });
});