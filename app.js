//carrito

const carritoContainer = document.getElementById("carrito")
const suPedido = []

//agregar producto al carrito
function agregarAlCarrito(producto) {
    suPedido.push(producto)
    actualizarCarrito()
}
//quitar producto
function quitarDelCarrito(index) {
    suPedido.splice(index, 1)
    actualizarCarrito()
}

function calcularPrecioTotal() {
    let precioTotal = 0

    suPedido.forEach((producto) => {
        precioTotal += producto.precio
    })

    return precioTotal
}


function actualizarCarrito() {
    carritoContainer.innerHTML = ''

    const carritoHeader = document.createElement("div")
    carritoHeader.innerHTML = '<h2>Mi Carrito</h2>'
    carritoContainer.appendChild(carritoHeader)

    suPedido.forEach((producto, index) => {
        const productoElement = document.createElement("div")
        productoElement.classList.add("producto")

        productoElement.innerHTML = `
            <span>${producto.nombre}</span>
            <button class="btn btn-danger" onclick="quitarDelCarrito(${index})">X</button>
        `
        carritoContainer.appendChild(productoElement)
    })

    const precioTotalElement = document.createElement("div")
    precioTotalElement.innerHTML = `
        <h4>Precio Total: $${calcularPrecioTotal()}</h4>
    `

    carritoContainer.appendChild(precioTotalElement)
}

const realizarPedidoButton = document.querySelector('.realizar__pedido button')

realizarPedidoButton.addEventListener('click', function () {
    if (suPedido.length === 0) {
    } else {
        localStorage.setItem('pedido', JSON.stringify(suPedido))
        Swal.fire({
            title: "Pedido creado con éxito",
            text: "",
            icon: "success"
        })
        suPedido.length = 0
        actualizarCarrito()
    }
})






// Hamburguesas
async function cargarHamburguesas() {
    try {
        const response = await fetch("./hamburguesa.json")
        const data = await response.json()

        const hamburguesas = data.Hamburguesas
        const hamburguesaContainer = document.getElementById("hamburguesaContainer")

        hamburguesas.forEach(c => {
            let column = document.createElement('div')
            column.classList.add('col-md-4')

            let burger = document.createElement("div")
            burger.innerHTML = `
            <div class="bg-black bg-opacity-10 m-3 p-3">
                <h3>${c.nombre}</h3>
                <h4><b>$${c.precio}</b></h4>
                <p>${c.descripcion}</p>
                <button class="btn btn-warning" data-hamburguesa-id="${c.id}">Seleccionar Hamburguesa</button>
            </div>
            `

            const botonSeleccionar = burger.querySelector("button")
            botonSeleccionar.addEventListener("click", function () {
                const hamburguesaId = parseInt(this.getAttribute("data-hamburguesa-id"))
                const hamburguesaSeleccionada = hamburguesas.find(h => h.id === hamburguesaId)
                if (hamburguesaSeleccionada) {
                    agregarAlCarrito(hamburguesaSeleccionada)
                }
            })

            column.appendChild(burger)
            hamburguesaContainer.appendChild(column)
        })
    } catch (error) {
        console.error("Error al cargar las hamburguesas:", error)
    }
}
cargarHamburguesas()

// Acompañamientos
async function cargarAcompaniamientos() {
    try {
        const response = await fetch("./acompaniamiento.json")
        const data = await response.json()

        const acompaniamientos = data.Acompaniamientos
        const acompaniamientosContainer = document.getElementById("acompaniamientosContainer")

        acompaniamientos.forEach(a => {
            let column = document.createElement('div')
            column.classList.add('col-md-4')

            let acompaniamiento = document.createElement("div")
            acompaniamiento.innerHTML = `
            <div class="bg-black bg-opacity-10 m-3 p-3">
                <h3>${a.nombre}</h3>
                <h4><b>$${a.precio}</b></h4>
                <p>${a.descripcion}</p>
                <button class="btn btn-warning" data-acompaniamiento-id="${a.id}">Seleccionar Acompañamiento</button>
            </div>
            `

            const botonSeleccionar = acompaniamiento.querySelector("button")
            botonSeleccionar.addEventListener("click", function () {
                const acompaniamientoId = parseInt(this.getAttribute("data-acompaniamiento-id"))
                const acompaniamientoSeleccionado = acompaniamientos.find(ac => ac.id === acompaniamientoId)
                if (acompaniamientoSeleccionado) {
                    agregarAlCarrito(acompaniamientoSeleccionado)
                }
            })

            column.appendChild(acompaniamiento)
            acompaniamientosContainer.appendChild(column)
        })
    } catch (error) {
        console.error("Error al cargar los acompañamientos:", error)
    }
}
cargarAcompaniamientos()

// Bebidas
async function cargarBebidas() {
    try {
        const response = await fetch("./bebidas.json")
        const data = await response.json()

        const bebidas = data.Bebidas
        const bebidaContainer = document.getElementById("bebidasContainer")

        bebidas.forEach(b => {
            let column = document.createElement('div')
            column.classList.add('col-md-4')

            let bebidaElement = document.createElement("div")
            bebidaElement.innerHTML = `
            <div class="bg-black bg-opacity-10 m-3 p-3">
                <h3>${b.nombre}</h3>
                <h4><b>$${b.precio}</b></h4>
                <button class="btn btn-warning" data-bebida-id="${b.id}">Seleccionar Bebida</button>
            </div>
            `

            const botonSeleccionar = bebidaElement.querySelector("button")
            botonSeleccionar.addEventListener("click", function () {
                const bebidaId = parseInt(this.getAttribute("data-bebida-id"))
                const bebidaSeleccionada = bebidas.find(b => b.id === bebidaId)
                if (bebidaSeleccionada) {
                    agregarAlCarrito(bebidaSeleccionada)
                }
            })

            column.appendChild(bebidaElement)
            bebidaContainer.appendChild(column)
        })
    } catch (error) {
        console.error("Error al cargar las bebidas:", error)
    }
}

cargarBebidas()