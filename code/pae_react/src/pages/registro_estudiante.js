const header = document.querySelector("body");

const head= document.createElement("header");

header.innerHTML = `
        <img src="../assets/img/logo.png" alt="Header Image" class="header_image" />
        <a href="login.html" class="back">← Volver</a>
        <a href="register.html" class="user_icon_link">
            <img src="../assets/img/user_icon.png" alt="perfil" class="user_icon" />
        </a>
`

header.appendChild(head);

const formulario = document.querySelector('form');
const nombre = document.getElementsByName("nombre_usuario");
const apellido = document.getElementsByName("apellido");
const documento = document.getElementsByName("documento");
const grado = document.getElementsByName("grado");


formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(nombre[0].lower.value);
    console.log(apellido[0].lower.value);
    console.log(documento[0].value);
    console.log(grado[0].value);
    console.log('Formulario enviado');
    formulario.reset();
});