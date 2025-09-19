// index.js

import { updateWelcomeMessage, toggleDashboardUsuariosLink, updateRoleMessage } from '../util/dom_index.js';

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
    // Llama a las funciones de manipulación del DOM con el objeto de usuario
    updateWelcomeMessage(user);
    toggleDashboardUsuariosLink(user);
    updateRoleMessage(user);
  })
  .catch(error => {
    console.error('Error de autenticación:', error);
    window.location.href = '/code/src/pages/login.html';
  });
});

document.getElementById('logout-button').addEventListener('click', () => {
  fetch('http://localhost:3000/auth/logout', {
    method: 'POST',
    credentials: 'include',
  }
  ).then(response => {
    if (response.ok) {
      window.location.href = '/code/src/pages/login.html'; // Redirige al login después de cerrar sesión
    } else {
      alert('Error al cerrar sesión. Por favor, intente de nuevo.');
    }
  })
  .catch(error => {
    console.error('Error al cerrar sesión:', error);
    alert('Error al cerrar sesión. Por favor, intente de nuevo.');
  });
});