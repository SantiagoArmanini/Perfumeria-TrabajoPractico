const formularioRegistro = document.querySelector("#form-registro");

if (formularioRegistro) {
    formularioRegistro.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = formularioRegistro.querySelector("#nombre").value.trim();
        const apellido = formularioRegistro.querySelector("#apellido").value.trim();
        const correo = formularioRegistro.querySelector("#email").value.trim();
        const mensaje = formularioRegistro.querySelector("#mensaje-registro");

        mensaje.textContent = "";

        if (nombre === "" || apellido === "" || correo === "") {
            mensaje.textContent = "Completá tu nombre, apellido y correo electrónico.";
            return;
        }

        const usuario = {
            nombre: nombre,
            apellido: apellido,
            email: correo
        };

        const usuarioComoTexto = JSON.stringify(usuario);
        
        sessionStorage.setItem("usuarioLogueado", usuarioComoTexto);
        sessionStorage.setItem("sesionIniciada", "true");
        window.location.href = "../index.html";
    });
}