function obtenerCarrito() {
    const datosGuardados = localStorage.getItem("carrito");

    if(datosGuardados === null) {
        return [];
    }

    const carrito = JSON.parse(datosGuardados);
    return carrito;
}

function guardarCarrito(carrito) {
    const carritoComoTexto = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoComoTexto);
    /* carrito es la clave */
}

function agregarAlCarrito(producto, cantidad) {
    const carrito = obtenerCarrito();

    let productoExistente = null;

    carrito.forEach(function (item) {
        if (item.id === producto.id) {
            productoExistente = item;
        }
    });

    if(productoExistente !== null) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            categoria: producto.categoria,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }
    guardarCarrito(carrito);
}