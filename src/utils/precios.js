// Utilidades de precios compartidas por el catálogo y el carrito.

export function formatPrice(value) {
  return "$" + value.toLocaleString("es-CL");
}

// Un producto está en oferta solo si el precio de oferta es válido y menor al normal.
export function tieneOferta(producto) {
  return typeof producto.precioOferta === "number" && producto.precioOferta < producto.precio;
}

// Precio que realmente se cobra: el de oferta cuando existe, si no el normal.
export function precioFinal(producto) {
  return tieneOferta(producto) ? producto.precioOferta : producto.precio;
}
