
function crearCard(producto, base) {
    let textoPrecio = "Precio a definir";

    if (producto.precio !== null) {
        textoPrecio = "$" + producto.precio.toLocaleString("es-AR");
    }
    const card = `
    <article class="producto-card">
        <div class="imagen-producto">
            <img src="${base}${producto.imagen}"
                alt="${producto.nombre}">
        </div>
        
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="precio-producto">${textoPrecio}</p>
        <div class="control-cantidad">
            <button type="button" class="btn-restar">-</button>
            <span class="cantidad">1</span>
            <button type="button" class="btn-sumar">+</button>
        </div>
        <div class="acciones-producto">
            <button type="button" class="btn-agregar">
                Añadir al carrito
            </button>
        </div>
        <p class="mensaje-carrito" aria-live="polite"></p>
    </article>
    `;
    return card;
}

async function renderizarCards() {
    const contenedores = document.querySelectorAll(
        ".productos-grid[data-categoria]"
    );

    if (contenedores.length === 0) {
        return;
    }

    const base = contenedores[0].dataset.base || "./";

    contenedores.forEach(function (contenedor) {
        contenedor.textContent = "Cargando productos...";
    });

    try {
        const respuesta = await fetch(base + "datos/productos.json");

        if (!respuesta.ok) {
            throw new Error(
                "No se pudo cargar el catálogo: " + respuesta.status
            );
        }

        const productos = await respuesta.json();

        contenedores.forEach(function (contenedor) {
            const baseImagen = contenedor.dataset.base || "./";
            const categoria = contenedor.dataset.categoria;
            const limite = Number(contenedor.dataset.limite || 0);

            let productosPagina = productos.filter(function (producto) {
                if (categoria === "ofertas") {
                    return producto.oferta === true;
                }

                return producto.categoria === categoria;
            });

            if (limite > 0) {
                productosPagina = productosPagina.slice(0, limite);
            }

            let tarjetas = "";

            productosPagina.forEach(function (producto) {
                tarjetas += crearCard(producto, baseImagen);
            });

            contenedor.innerHTML =
                tarjetas || "<p>No hay productos disponibles.</p>";

            const cards = contenedor.querySelectorAll(".producto-card");

            cards.forEach(function (card, indice) {
                const producto = productosPagina[indice];

                const botonSumar = card.querySelector(".btn-sumar");
                const botonRestar = card.querySelector(".btn-restar");
                const botonAgregar = card.querySelector(".btn-agregar");

                const contador = card.querySelector(".cantidad");
                const mensaje = card.querySelector(".mensaje-carrito");

                let cantidad = 1;

                botonSumar.addEventListener("click", function () {
                    cantidad += 1;
                    contador.textContent = cantidad;
                });

                botonRestar.addEventListener("click", function () {
                    if (cantidad > 1) {
                        cantidad -= 1;
                        contador.textContent = cantidad;
                    }
                });

                botonAgregar.addEventListener("click", function () {
                    agregarAlCarrito(producto, cantidad);

                    mensaje.textContent =
                        "Agregado al carrito: " +
                        producto.nombre +
                        " (cantidad: " +
                        cantidad +
                        ").";
                });
            });
        });
    } catch (error) {
        console.error(error);

        contenedores.forEach(function (contenedor) {
            contenedor.textContent =
                "No se pudieron cargar los productos. Intentá nuevamente.";
        });
    }
}

renderizarCards();