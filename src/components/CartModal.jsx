import { formatPrice, precioFinal } from "../utils/precios.js";

// Modal del carrito: lista los ítems con su subtotal y permite quitarlos o vaciar todo.
function CartModal({ abierto, onClose, items, onRemove, onClear, total }) {
  // Cerrado no se monta nada en el DOM.
  if (!abierto) {
    return null;
  }

  return (
    <div className="cart-modal-backdrop" onClick={onClose}>
      {/* stopPropagation evita que un clic dentro del modal lo cierre */}
      <div className="cart-modal" onClick={(event) => event.stopPropagation()}>
        <div className="cart-modal-header">
          <h2 className="h5 mb-0">Tu carrito</h2>
          <button type="button" className="btn-close" aria-label="Cerrar" onClick={onClose}></button>
        </div>

        <div className="cart-modal-body">
          {/* Mensaje de carrito vacío o listado de ítems */}
          {items.length === 0 ? (
            <p className="text-secondary mb-0">Tu carrito está vacío.</p>
          ) : (
            <ul className="list-group mb-3">
              {items.map((item) => (
                <li
                  key={item.producto.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {item.producto.nombre} <span className="text-secondary">x{item.cantidad}</span>
                  </span>
                  <span className="d-flex align-items-center gap-2">
                    {formatPrice(precioFinal(item.producto) * item.cantidad)}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onRemove(item.producto.id)}
                    >
                      &times;
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <p className="text-end fs-5 mb-0">
              Total: <strong>{formatPrice(total)}</strong>
            </p>
          )}
        </div>

        <div className="cart-modal-footer">
          <button type="button" className="btn btn-outline-danger" onClick={onClear} disabled={items.length === 0}>
            Vaciar carrito
          </button>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
