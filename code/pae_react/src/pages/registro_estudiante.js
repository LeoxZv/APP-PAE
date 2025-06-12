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