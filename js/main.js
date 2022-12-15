/*Array vacío para el carrito de compras del usuario*/
const carritoUsuario = [];

/*ordenar productor por precio*/
const ordenarMenorMayor = () => {
  maestroProductos.sort((a, b) => a.precio - b.precio);
  console.log(maestroProductos);
  mostrarListaOrdenada();
};

const ordenarMayorMenor = () => {
  maestroProductos.sort((a, b) => b.precio - a.precio);
  console.log(maestroProductos);
  mostrarListaOrdenada();
};

/*mostrar la lista de productos*/
const mostrarListaOrdenada = () => {
  const listaOrdenada = maestroProductos.map((producto) => "ID: " + producto.id + "  Producto:" + producto.nombre + "  Precio: $" + producto.precio);
  alert("Lista de precios:\n\n" + listaOrdenada.join("\n"));
  comprarProductos(listaOrdenada);
};

const comprarProductos = (listaDeProductos) => {
  let otroProducto = false;
  let productoId = "";
  let productoCantidad = 0;

  do {
    productoId = prompt("¿Qué producto desea comprar? Escriba el ID correspondiente" + "\n\n" + listaDeProductos.join("\n"));
    productoCantidad = parseInt(prompt("¿Que cantidad desea comprar?"));

    const producto = maestroProductos.find((producto) => producto.id.toLowerCase() === productoId.toLowerCase());

    if (producto) {
      agregarAlCarrito(producto, producto.id, productoCantidad);
    } else {
      alert("El ID ingresado no corresponde a un producto en el catálogo.");
    }

    otroProducto = confirm("¿Desea agregar otro producto al carrito?");
  } while (otroProducto);

  console.log(carritoUsuario);
};
 
const agregarAlCarrito = (producto, productoId, productoCantidad) => {
  const productoRepetido = carritoUsuario.find((producto) => producto.id.toLowerCase() === productoId.toLowerCase());
  if (productoRepetido) {
    productoRepetido.cantidad += productoCantidad;
  } else {
    producto.cantidad = 0 + productoCantidad;
    carritoUsuario.push(producto);
  }
};

ordenarMayorMenor();
