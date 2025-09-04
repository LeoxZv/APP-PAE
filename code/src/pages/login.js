const formulario = document.getElementsByName("formulario")[0];

console.log('Formulario encontrado:', formulario);

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const documento = document.getElementsByName("documento")[0].value;
    console.log('Documento:', documento);
    const password = document.getElementsByName("password")[0].value;
    console.log('Password:', password);

    const formData = {
        numero_documento: documento,
        password_user: password
    };

    // Envía los datos al backend
    fetch('http://localhost:3000/auth/login', { // Cambia la URL si tu servidor está en otro puerto
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json()) // Verifica que la respuesta sea JSON
    .then(data => {
        if (data.success) {
            console.log('Login exitoso:', data.message);
            // Redirige al usuario a la página principal o dashboard
            window.location.href = '/code/src/pages/index.html';
            localStorage.setItem('currentUser', JSON.stringify(data.user));
        } else {
            console.log('Login fallido:', data.message);
            alert('Credenciales incorrectas');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un problema al intentar iniciar sesión.');
    });

    formulario.reset();
});