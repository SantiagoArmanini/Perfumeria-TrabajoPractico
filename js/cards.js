const productos = [
    {
        id: 1,
        nombre: "Perfume Hombre 1",
        descripcion: "Descripción del perfume 2 por completar.",
        precio: null,
        imagen: "img/perfume-hombre1.jpg"
    },
    {
        id: 2,
        nombre: "Perfume Hombre 2",
        descripcion: "Descripción del perfume 2 por completar.",
        precio: null,
        imagen: "img/perfume-hombre2.jpg"
    },
    {
        id: 3,
        nombre: "Perfume Hombre 3",
        descripcion: "Descripción del perfume 3 por completar.",
        precio: null,
        imagen: "img/perfume-hombre4.jpg"
    },
    {
        id: 4,
        nombre: "Perfume Hombre 4",
        descripcion: "Descripción del perfume 4 por completar.",
        precio: null,
        imagen: "img/perfume-hombre4.jpg"
    }
];

const catalogos = {
    hombre: productos,

    mujer: [
        {
            id: 5,
            nombre: "Perfume Mujer 1",
            descripcion: "Descripción del perfume.",
            precio: null,
            imagen: "img/perfume-mujer1.jpg"
        },
        {
            id: 6,
            nombre: "Perfume Mujer 2",
            descripcion: "Descripción del perfume.",
            precio: null,
            imagen: "img/perfume-mujer2.jpg"
        },
        {
            id: 7,
            nombre: "Perfume Mujer 3",
            descripcion: "Descripción del perfume.",
            precio: null,
            imagen: "img/perfume-mujer1.jpg"
        },
        {
            id: 8,
            nombre: "Perfume Mujer 4",
            descripcion: "Descripción del perfume.",
            precio: null,
            imagen: "img/perfume-mujer2.jpg"
        }
    ],

    unisex: [
        {
            id: 9,
            nombre: "Perfume Unisex 1",
            descripcion: "Descripción del perfume.",
            precio: null,
            imagen: "img/perfume-hombre1.jpg"
        },
        {
            id: 10,
            nombre: "Perfume Unisex 2",
            descripcion: "Descripción del perfume.",
            precio: null,
            imagen: "img/perfume-mujer1.jpg"
        },
        {
            id: 11,
            nombre: "Perfume Unisex 3",
            descripcion: "Descripción del perfume.",
            precio: null,
            imagen: "img/perfume-hombre2.jpg"
        },
        {
            id: 12,
            nombre: "Perfume Unisex 4",
            descripcion: "Descripción del perfume.",
            precio: null,
            imagen: "img/perfume-mujer2.jpg"
        }

    ],

    ofertas: [
        {
            id: 13,
            nombre: "Perfume en oferta 1",
            descripcion: "Descripción del perfume.",
            precio: null,
            imagen: "img/perfume-hombre1.jpg"
        },
        {
            id: 14,
            nombre: "Perfume en oferta 2",
            descripcion: "Descripción del perfume.",
            precio: null,
            imagen: "img/perfume-hombre2.jpg"
        },
        {
            id: 15,
            nombre: "Perfume en oferta 3",
            descripcion: "Descripción del perfume.",
            precio: null,
            imagen: "img/perfume-mujer1.jpg"
        },
        {
            id: 16,
            nombre: "Perfume en oferta 4",
            descripcion: "Descripción del perfume.",
            precio: null,
            imagen: "img/perfume-mujer2.jpg"
        }
    ]
};

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
        <p class="precio-producto">
            <p class="precio-producto">${textoPrecio}</p>
        </p>
        <div class="control-cantidad">
            <button type="button" class="btn-restar">-</button>
            <span class="cantidad">1</span>
            <button type="button" class="btn-sumar">+</button>
        </div>
        <div class="acciones-producto">
            <span class="enlace-pendiente"
                title="Detalle de producto pendiente">
                Ver producto
            </span>
            
            <button type="button">Comprar</button>
        </div>
    </article>
    `;
    return card;
}

function renderizarCards() {
    const contenedor = document.getElementById("cards-generadas");

    if(!contenedor) {
        return;
    }

    const base = contenedor.dataset.base || "";
    const categoria = contenedor.dataset.categoria;
    const productosPagina = catalogos[categoria] || [];
    let tarjetas = "";

    productosPagina.forEach(function(producto){
        tarjetas += crearCard(producto, base);
    });

    contenedor.innerHTML = tarjetas;

    const cards = contenedor.querySelectorAll(".producto-card");

    cards.forEach(function(card) {
        const botonSumar = card.querySelector(".btn-sumar");
        const botonRestar = card.querySelector(".btn-restar");
        const contador = card.querySelector(".cantidad");

        let cantidad = 1;

        botonSumar.addEventListener("click", function() {
            cantidad += 1;
            contador.textContent = cantidad;
        });

        botonRestar.addEventListener("click", function() {
            if(cantidad > 1)    {
                cantidad -= 1;
                contador.textContent = cantidad;
            }
        });
    });
}

renderizarCards();