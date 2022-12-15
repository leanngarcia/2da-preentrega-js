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

const filtrarLista = (tipoFiltro, filtro) => {
  const listaOrdenada = maestroProductos.filter((producto) => producto[tipoFiltro] == filtro);
  console.log(listaOrdenada);
};

//filtrarLista();

/*mostrar la lista de productos*/
const mostrarListaOrdenada = () => {
  const listaOrdenada = maestroProductos.map((producto) => "ID: " + producto.id + "  Producto:" + producto.nombre + "  Precio: $" + producto.precio);
  alert("Lista de precios:\n\n" + listaOrdenada.join("\n"));
  comprarProductos(listaOrdenada);
};

/*solicita producto a comprar, verifica si existe en el catalogo*/
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

  confirmarCompra();
};

/*agrega producto al carrito y verifica si esta repetido*/
const agregarAlCarrito = (producto, productoId, productoCantidad) => {
  const productoRepetido = carritoUsuario.find((producto) => producto.id.toLowerCase() === productoId.toLowerCase());
  if (productoRepetido) {
    productoRepetido.cantidad += productoCantidad;
  } else {
    producto.cantidad = 0 + productoCantidad;
    carritoUsuario.push(producto);
  }
};

const confirmarCompra = () => {
  const resumenPedido = carritoUsuario.map((producto) => "- " + producto.nombre + " | Cantidad: " + producto.cantidad);

  const confirmarCompra = confirm("Resumen de pedido:" + "\n\n" + resumenPedido.join("\n")) + "\n\n" + 'Para confirmar su pedido presione "Aceptar". Si desea modificar su pedido presione cancelar';

  if (confirmarCompra) {
    finalizarCompra(resumenPedido);
  } else {
    const productoAEliminar = prompt("Ingrese el ID del producto que desea eliminar");
    eliminarProducto(productoAEliminar);
  }
};

const eliminarProducto = (productoId) => {
  carritoUsuario.forEach((producto, index) => {
    if (producto.id.toLowerCase() === productoId.toLowerCase()) {
      if (producto.cantidad > 1) {
        producto.cantidad--;
      } else {
        carritoUsuario.splice(index, 1);
      }
    }
  });
  confirmarCompra();
};

const finalizarCompra = (listaDeProductos) => {
  const cantidadTotal = carritoUsuario.reduce((acc, item) => acc + item.cantidad, 0);
  const precioTotal = carritoUsuario.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  alert("Detalle de compra:\n\n" + listaDeProductos.join("\n") + "\n\nTotal de productos: " + cantidadTotal + "\n\n¨Precio total: $" + precioTotal + "\n\n¡Gracias por su compra!");
};

const comprar = () => {
  const ordenar = confirm('¿Desea ordenar o filtrar los productos?.Presione "Cancelar" si desea visualizar todos los productos a la vez.');
  if (ordenar) {
    let opcionOrden = prompt('Si desea ordenar por precio ingrese "1" o si desea filtrar por categoría o talle ingrese "2"');

    if (opcionOrden == 1) {
      let productosBaratos = confirm('Si desea ver los productos mas baratos primero presione "Aceptar"');
      if (productosBaratos == true) {
        ordenarMenorMayor();
      } else {
        ordenarMayorMenor();
      }
    }
    if (opcionOrden == 2) {
      const tipoFiltro = prompt("Ingrese 1 si desea filtrar por categoría o ingrese 2 si desea filtrar por talle");
      if (tipoFiltro == 1) {
        const filtro = prompt("Seleccione que tipo de bicicleta desea filtrar (MTB, Hibrida, Kids o Road)");
        filtrarLista(tipoFiltro, filtro);
      }
      if (tipoFiltro == 2) {
        const filtro = prompt("Seleccione que talle desea filtrar (XS,S,M,L o XL)");
        filtrarLista(tipoFiltro, filtro);
      }
    }
  } else {
    mostrarListaOrdenada();
  }
};

comprar();
