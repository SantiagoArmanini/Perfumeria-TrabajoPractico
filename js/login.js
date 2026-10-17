const formularioLogin  = document.querySelector('#form-login');

if(formularioLogin) {
    formularioLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        sessionStorage.setItem('sesionIniciada', 'true');
        window.location.href = '../index.html';
    });
}

const botonLogout = document.querySelector('#btn-logout');
if(botonLogout) {
    botonLogout.addEventListener('click', function (e) {
        e.preventDefault();
        sessionStorage.removeItem('sesionIniciada');
        window.location.href = botonLogout.href;
    });
}