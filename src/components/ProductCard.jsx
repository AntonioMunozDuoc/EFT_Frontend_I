import { formatPrice, tieneOferta } from "../utils/precios.js";
import { urlImagen } from "../utils/imagenes.js";

// Tarjeta de un producto; `enCarrito` define el estilo y el texto del botón y `onEliminar` lo quita del catálogo.
function ProductCard({ product, enCarrito, onAgregar, onEliminar }) {
  const enOferta = tieneOferta(product);

  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <article className="card product-card">
        {enOferta && <span className="badge-oferta">Oferta</span>}

        <img src={urlImagen(product.imagen)} alt={`Imagen de ${product.nombre}`} loading="lazy" />

        <div className="card-body">
          <span className="badge badge-categoria mb-2">{product.categoria}</span>
          <h3 className="h6">{product.nombre}</h3>
          <p className="small text-secondary flex-grow-1">{product.descripcion}</p>

          {enOferta ? (
            <p className="product-price">
              <span className="precio-anterior">{formatPrice(product.precio)}</span>{" "}
              <span className="precio-oferta">{formatPrice(product.precioOferta)}</span>
            </p>
          ) : (
            <p className="product-price">{formatPrice(product.precio)}</p>
          )}

          <div className="d-flex gap-2">
            <button
              type="button"
              className={`btn btn-sm flex-grow-1 ${enCarrito ? "btn-outline-success" : "btn-primary"}`}
              onClick={() => onAgregar(product)}
            >
              {enCarrito ? "En el carrito ✓" : "Agregar al carrito"}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => onEliminar(product.id)}
              aria-label={`Eliminar ${product.nombre} del catálogo`}
              title="Eliminar del catálogo"
            >
              &times;
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ProductCard;
