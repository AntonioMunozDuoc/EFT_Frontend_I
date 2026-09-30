import { formatPrice, tieneOferta } from "../utils/precios.js";

// Tarjeta de un producto; `enCarrito` define el estilo y el texto del botón.
function ProductCard({ product, enCarrito, onAgregar }) {
  const enOferta = tieneOferta(product);

  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div className="card product-card">
        {enOferta && <span className="badge-oferta">Oferta</span>}

        <img src={`${import.meta.env.BASE_URL}${product.imagen}`} alt={`Imagen de ${product.nombre}`} />

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

          <button
            type="button"
            className={`btn btn-sm ${enCarrito ? "btn-outline-success" : "btn-primary"}`}
            onClick={() => onAgregar(product)}
          >
            {enCarrito ? "En el carrito ✓" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
