function mostrarCarrito() {
    const contenedor = document.getElementById("carrito-productos");
    const totalElemento = document.getElementById("carrito-total");

    if (!contenedor || !totalElemento) {
        return;
    }

    const carrito = obtenerCarrito();

    contenedor.innerHTML = "";

    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <h3>Tu carrito está vacío</h3>
                <p>
                    Agregá tus fragancias favoritas para verlas acá.
                    Podes volver al catalogo con "Seguir comprando".
                </p>
            </div>
        `;

        totalElemento.textContent = "$0";
        return;
    }

    carrito.forEach(function (producto) {
        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        const articulo = document.createElement("article");

        articulo.className = "producto-card producto-carrito";

        articulo.innerHTML = `
            <div class="imagen-producto">
                <img>
            </div>

            <div class="carrito-detalle">
                <h3 class="carrito-nombre"></h3>

                <p class="carrito-descripcion"></p>
                <p class="carrito-precio"></p>
                <p class="carrito-cantidad"></p>
                <p class="carrito-subtotal precio-producto"></p>

                <div class="acciones-producto">
                    <button type="button" class="btn-eliminar">
                        Eliminar
                    </button>
                </div>
            </div>
        `;

        const imagen = articulo.querySelector("img");

        imagen.setAttribute("src", "../" + producto.imagen);
        imagen.setAttribute("alt", producto.nombre);

        articulo.querySelector(".carrito-nombre").textContent =
            producto.nombre;

        articulo.querySelector(".carrito-descripcion").textContent =
            producto.descripcion;

        articulo.querySelector(".carrito-precio").textContent =
            "Precio unitario: $" +
            producto.precio.toLocaleString("es-AR");

        articulo.querySelector(".carrito-cantidad").textContent =
            "Cantidad: " + producto.cantidad;

        articulo.querySelector(".carrito-subtotal").textContent =
            "Subtotal: $" + subtotal.toLocaleString("es-AR");

        const botonEliminar = articulo.querySelector(".btn-eliminar");

        botonEliminar.addEventListener("click", function () {
            eliminarDelCarrito(producto.id);
        });

        contenedor.appendChild(articulo);
    });

    totalElemento.textContent = "$" + total.toLocaleString("es-AR");
}

function eliminarDelCarrito(idProducto) {
    const carrito = obtenerCarrito();

    const carritoActualizado = carrito.filter(function (producto) {
        return producto.id !== idProducto;
    });

    guardarCarrito(carritoActualizado);

    mostrarCarrito();
}

mostrarCarrito();