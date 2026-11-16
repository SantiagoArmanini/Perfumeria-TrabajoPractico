const formularioLogin = document.querySelector("#form-login");

if (formularioLogin) {
    formularioLogin.addEventListener("submit", function (e) {
        e.preventDefault();

        const correo = formularioLogin.querySelector("#email").value.trim();
        const usuario = {email: correo};
        const usuarioComoTexto = JSON.stringify(usuario);

        sessionStorage.setItem("usuarioLogueado", usuarioComoTexto);

        sessionStorage.setItem("sesionIniciada", "true");

        window.location.href = "../index.html";
    });
}

const botonLogout = document.querySelector("#btn-logout");

if (botonLogout) {
    botonLogout.addEventListener("click", function (e) {
        e.preventDefault();

        sessionStorage.removeItem("usuarioLogueado");
        sessionStorage.removeItem("sesionIniciada");

        window.location.href = botonLogout.getAttribute("href");
    });
}