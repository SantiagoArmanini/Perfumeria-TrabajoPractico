function renderNavbar() {
    const contenedor = document.getElementById("navbar");

    if(!contenedor) { return;
    }

    const base = contenedor.dataset.base || "";

    const sesion = sessionStorage.getItem("sesionIniciada");

    if(sesion !== "true") {
        window.location.href = base + "paginas/login.html";
        return;
    }

    let enlaces = "";
    paginas.forEach(function(pagina) {
        enlaces += `
        <a href="${base}${pagina.ruta}">${pagina.titulo}</a>`;
    });

    const navbar = `
        <nav class="navbar">
            <div class="logo">
                <a href="${base}index.html">
                    <img src="${base}img/logo.png" alt="Logo Perfumeria">
                </a>
            </div>
            <div class="menu">
                ${enlaces}
            </div>
            <div class="menu-usuario">
                <a href="${base}paginas/login.html" id="btn-logout">Cerrar sesión</a>
            </div>
        </nav>
    `;
    contenedor.innerHTML = navbar;
}

renderNavbar();