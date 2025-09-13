// login.js

const formulario = document.getElementsByName("formulario")[0];

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const documento = document.getElementsByName("documento")[0].value;
    const password = document.getElementsByName("password")[0].value;

    const formData = {
        numero_documento: documento,
        password_user: password
    };

    fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
    })
    .then(response => {
        // Handle a server error (e.g., 500 Internal Server Error)
        if (response.status >= 500) {
            throw new Error('No se pudo conectar con el servidor.');
        }
        
        // Handle a client error (e.g., 401 Unauthorized for bad credentials)
        if (response.status === 401) {
            throw new Error('Credenciales incorrectas');
        }

        // Check if the response is valid and parse it as JSON
        if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
            return response.json();
        }
        
        // If the response is not JSON or not OK, it's an unexpected error
        if (!response.ok) {
            throw new Error('Ocurrió un error inesperado.');
        }

        // If the response is OK but not JSON (e.g., a simple redirect), handle it.
        // We will just return a placeholder.
        return {};
    })
    .then(data => {
        // Redirect only if the login was successful and the data indicates it
        if (data.success) {
            console.log('Login exitoso:', data.message);
            window.location.href = '/code/src/pages/index.html';
        } else {
            // Handle login failure messages from the backend
            throw new Error(data.message || 'Credenciales incorrectas');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert(error.message);
    });

    formulario.reset();
});