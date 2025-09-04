// index.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtiene los datos del usuario desde localStorage
    const storedUser = localStorage.getItem('currentUser');
    
    // 2. Verifica si hay un usuario almacenado
    if (storedUser) {
        try {
            // 3. Parsea el string JSON de vuelta a un objeto JavaScript
            const user = JSON.parse(storedUser);
            
            // 4. Obtiene el elemento HTML donde se mostrará el mensaje
            const welcomeMessageElement = document.getElementById('welcome-message'); // Asume un elemento con este ID
            
            // 5. Verifica que el elemento existe y que los datos del usuario son válidos
            if (welcomeMessageElement && user.nombre_user && user.apellido_user) {
                // 6. Crea el mensaje concatenando nombre y apellido
                const fullName = `${user.nombre_user} ${user.apellido_user}`;
                
                // 7. Actualiza el contenido del elemento con el mensaje de bienvenida
                welcomeMessageElement.textContent = `¡Bienvenido, ${fullName}! 🎉`;
            } else {
                console.error("Error: Elemento 'welcome-message' no encontrado o datos de usuario incompletos.");
            }

        } catch (e) {
            console.error('Error al parsear los datos del usuario desde localStorage:', e);
            // Si hay un error, puedes redirigir al login
            window.location.href = '/code/src/pages/login.html';
        }
    } else {
        // Si no hay datos de usuario, redirige al login para forzar la autenticación
        console.log("No se encontraron datos de usuario. Redirigiendo a la página de login.");
        window.location.href = '/code/src/pages/login.html';
    }
});