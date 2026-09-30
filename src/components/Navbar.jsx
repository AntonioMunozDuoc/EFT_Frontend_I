import { useState } from "react";

// Categorías del filtro; "todos" desactiva el filtrado.
const CATEGORIAS = [
  { id: "todos", label: "Todos" },
  { id: "consolas", label: "Consolas" },
  { id: "videojuegos", label: "Videojuegos" },
  { id: "accesorios", label: "Accesorios" },
];

// Barra de navegación con filtro por categoría, buscador y acceso al carrito.
function Navbar({
  categoriaActiva,
  onCategoriaChange,
  searchTerm,
  onSearchChange,
  cartCount,
  onCartClick,
}) {
  // Controla el menú desplegable en pantallas pequeñas.
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio">
          <img src={`${import.meta.env.BASE_URL}img/juga2-logo.png`} alt="Logotipo de Juga2" height="40" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuAbierto((prev) => !prev)}
          aria-expanded={menuAbierto}
          aria-label="Abrir menú de navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#inicio">
                Inicio
              </a>
            </li>

            {CATEGORIAS.map((categoria) => (
              <li className="nav-item" key={categoria.id}>
                <button
                  type="button"
                  className={`nav-link category-link btn btn-link ${
                    categoriaActiva === categoria.id ? "active" : ""
                  }`}
                  onClick={() => onCategoriaChange(categoria.id)}
                >
                  {categoria.label}
                </button>
              </li>
            ))}

            <li className="nav-item">
              <a className="nav-link" href="#contacto">
                Contacto
              </a>
            </li>
          </ul>

          <form className="d-flex me-3 mb-2 mb-lg-0" role="search" onSubmit={(event) => event.preventDefault()}>
            <input
              className="form-control"
              type="search"
              placeholder="Buscar producto..."
              aria-label="Buscar producto"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </form>

          <button type="button" className="btn btn-primary position-relative" onClick={onCartClick}>
            Carrito
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
