// Categorías del catálogo; las usan el filtro del Navbar y el formulario de alta de productos.
export const CATEGORIAS = [
  { id: "consolas", label: "Consolas" },
  { id: "videojuegos", label: "Videojuegos" },
  { id: "accesorios", label: "Accesorios" },
];

// Opción extra del filtro: "todos" desactiva el filtrado por categoría.
export const CATEGORIAS_FILTRO = [{ id: "todos", label: "Todos" }, ...CATEGORIAS];
