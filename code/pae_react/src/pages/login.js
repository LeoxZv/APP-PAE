const formulario = document.querySelector('form');
const nombre = document.getElementsByName("nombre");
const apellido = document.getElementsByName("apellido");
const password = document.getElementsByName("password");
const remember = document.getElementsByName("remember");

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    // Create JSON object from form data
    const formData = {
        nombre: nombre[0].value,
        apellido: apellido[0].value,
        password: password[0].value,
        remember: remember[0].checked ? true : false
    };

    // Convert JSON object to string
    const jsonString = JSON.stringify(formData, null, 2);

    // Create a blob with the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a link element to trigger download
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "formData.json";

    // Append link to body, click it to trigger download, then remove it
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Log to console as before
    console.log(nombre[0].value);
    console.log(apellido[0].value);
    console.log(password[0].value);
    console.log(remember[0].checked ? 'Recordar usuario' : 'No recordar usuario');
    console.log('Formulario enviado');

    formulario.reset();
});
