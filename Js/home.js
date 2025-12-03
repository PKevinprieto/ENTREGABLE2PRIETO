const productoElegido = document.querySelector("#objeto");
const colorElegido = document.querySelector("#color");
const cantidadElegida = document.querySelector("#cantidad");
const btnAgregar = document.querySelector("#btn");
const verCarrito = document.querySelector("#ver");
const contenedor = document.querySelector("#contenedorr");
const contenedorDeMsj = document.querySelector("#msj");
const mostrarTotal = document.querySelector("#total");

class Items {
  constructor(producto, color, cantidad, precioUnitario) {
    this.producto = producto;
    this.color = color;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
  }
}

const obtenerCarrito = () => {
  const carroJSON = localStorage.getItem("carrito");
  return carroJSON ? JSON.parse(carroJSON) : [];
};

const renderizarCarrito = () => {
  const carritoObjeto = obtenerCarrito();

  const precioTotal = carritoObjeto.reduce((acc, item) => {
    const calculo = item.precioUnitario * item.cantidad;
    return acc + calculo;
  }, 0);

  mostrarTotal.textContent = `Total a pagar $${precioTotal.toFixed(2)}`;

  contenedor.innerHTML = "";

  if (carritoObjeto.length > 0) {
    const divContenedor = document.createElement("div");

    divContenedor.classList.add("padre-items");

    carritoObjeto.forEach((item, index) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <hr>
        <h4>Artículo ${index + 1}</h4>
        <p><strong>Producto:</strong> ${item.producto}</p>
        <p><strong>Color:</strong> ${item.color}</p>
        <p><strong>Cantidad:</strong> ${item.cantidad}</p>
        <p><strong>Precio Unitario:</strong> $${item.precioUnitario}</p>
        <p><strong>Subtotal:</strong> $${(
          item.precioUnitario * item.cantidad
        ).toFixed(2)}</p>
        <button class="eliminar-btn" data-index="${index}">&#x2715;</button>
      `;
      div.classList.add("error");
      divContenedor.classList.add("padre");
      divContenedor.appendChild(div);
    });

    contenedor.appendChild(divContenedor);
  }
};

btnAgregar.addEventListener("click", () => {
  const producto = productoElegido.value.trim().toLowerCase();
  const color = colorElegido.value.trim();
  const cantidad = parseInt(cantidadElegida.value);

  contenedorDeMsj.innerHTML = "";

  let precioUnitario;
  if (producto === "samsung") {
    precioUnitario = 900;
  } else if (producto === "motorola") {
    precioUnitario = 500;
  } else if (producto === "iphone") {
    precioUnitario = 1500;
  } else if (producto === "xiaomi") {
    precioUnitario = 300;
  } else if (producto === "huawei") {
    precioUnitario = 250;
  } else {
    const pError = document.createElement("p");
    pError.textContent = `Error, el producto: ${producto} no existe.`;
    pError.style.color = "red";
    contenedorDeMsj.appendChild(pError);
    return;
  }

  if (!producto || !color || isNaN(cantidad) || cantidad <= 0) {
    const pError = document.createElement("p");
    pError.textContent = "Todos los campos deben estar completos.";
    pError.style.color = "red";
    contenedorDeMsj.appendChild(pError);
    return;
  }

  let carritoActual = obtenerCarrito();

  const itemExistente = carritoActual.find(
    (item) => item.producto === producto && item.color === color
  );

  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    const newItem = new Items(producto, color, cantidad, precioUnitario);
    carritoActual.push(newItem);
  }

  localStorage.setItem("carrito", JSON.stringify(carritoActual));

  renderizarCarrito();

  productoElegido.value = "";
  colorElegido.value = "";
  cantidadElegida.value = "";
  productoElegido.focus();
});

verCarrito.addEventListener("click", (e) => {
  renderizarCarrito();
});

contenedor.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminar-btn")) {
    const indexParaEliminar = parseInt(e.target.dataset.index);

    let carritoActual = obtenerCarrito();

    const nuevoCarrito = carritoActual.filter((item, index) => {
      return index !== indexParaEliminar;
    });

    if (nuevoCarrito.length === 0) {
      localStorage.removeItem("carrito");
    } else {
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    }

    renderizarCarrito();
  }
});
