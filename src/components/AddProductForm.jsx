import { useState } from "react";
import { CATEGORIAS } from "../utils/categorias.js";
import { validarProducto } from "../utils/validaciones.js";

const VALORES_INICIALES = { nombre: "", categoria: "", precio: "", descripcion: "", imagen: "" };

// Formulario para agregar un videojuego: valida y entrega el producto al padre mediante la prop `onAgregar`.
function AddProductForm({ onAgregar }) {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [agregado, setAgregado] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setValores((prev) => ({ ...prev, [name]: value }));
    setAgregado("");
    if (errores[name]) {
      setErrores((prev) => {
        const siguiente = { ...prev };
        delete siguiente[name];
        return siguiente;
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const erroresEncontrados = validarProducto(valores);
    setErrores(erroresEncontrados);

    if (Object.keys(erroresEncontrados).length > 0) {
      return;
    }

    onAgregar({
      nombre: valores.nombre.trim(),
      categoria: valores.categoria,
      precio: Number(valores.precio),
      descripcion: valores.descripcion.trim(),
      // Si no se indica imagen, la tarjeta usa el logo de la tienda como respaldo.
      imagen: valores.imagen.trim() || "img/juga2-logo.png",
    });

    setAgregado(valores.nombre.trim());
    setValores(VALORES_INICIALES);
  }

  const claseCampo = (campo) => `form-control ${errores[campo] ? "is-invalid" : ""}`;

  return (
    <form className="admin-form" onSubmit={handleSubmit} noValidate>
      {agregado && (
        <div className="alert alert-success form-grid-full" role="status">
          «{agregado}» se agregó al catálogo.
        </div>
      )}

      <div>
        <label htmlFor="prod-nombre" className="form-label">
          Nombre
        </label>
        <input
          id="prod-nombre"
          name="nombre"
          type="text"
          className={claseCampo("nombre")}
          value={valores.nombre}
          onChange={handleChange}
          placeholder="Ej: God of War Ragnarök"
        />
        <div className="invalid-feedback">{errores.nombre}</div>
      </div>

      <div>
        <label htmlFor="prod-categoria" className="form-label">
          Categoría
        </label>
        <select
          id="prod-categoria"
          name="categoria"
          className={`form-select ${errores.categoria ? "is-invalid" : ""}`}
          value={valores.categoria}
          onChange={handleChange}
        >
          <option value="">Selecciona...</option>
          {CATEGORIAS.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.label}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{errores.categoria}</div>
      </div>

      <div>
        <label htmlFor="prod-precio" className="form-label">
          Precio (CLP)
        </label>
        <input
          id="prod-precio"
          name="precio"
          type="number"
          min="1"
          className={claseCampo("precio")}
          value={valores.precio}
          onChange={handleChange}
          placeholder="Ej: 39990"
        />
        <div className="invalid-feedback">{errores.precio}</div>
      </div>

      <div>
        <label htmlFor="prod-imagen" className="form-label">
          Imagen (opcional)
        </label>
        <input
          id="prod-imagen"
          name="imagen"
          type="text"
          className="form-control"
          value={valores.imagen}
          onChange={handleChange}
          placeholder="URL o ruta, ej: img/game-elden-ring.jpg"
        />
      </div>

      <div className="form-grid-full">
        <label htmlFor="prod-descripcion" className="form-label">
          Descripción
        </label>
        <textarea
          id="prod-descripcion"
          name="descripcion"
          rows="3"
          className={claseCampo("descripcion")}
          value={valores.descripcion}
          onChange={handleChange}
          placeholder="Describe brevemente el producto"
        ></textarea>
        <div className="invalid-feedback">{errores.descripcion}</div>
      </div>

      <div className="form-grid-full">
        <button type="submit" className="btn btn-primary">
          Agregar al catálogo
        </button>
      </div>
    </form>
  );
}

export default AddProductForm;
