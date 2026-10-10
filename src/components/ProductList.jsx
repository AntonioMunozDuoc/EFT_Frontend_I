import ProductCard from "./ProductCard.jsx";

// Elige qué mostrar según el estado: carga, error, sin resultados o la grilla de productos.
function ProductList({ products, cartIds, onAgregar, onEliminar, status, errorMessage }) {
  if (status === "loading") {
    return (
      <div className="loading-state text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-secondary mt-3 mb-0">Cargando catálogo...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="no-results">No se encontraron productos que coincidan con tu búsqueda.</p>;
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          enCarrito={cartIds.has(product.id)}
          onAgregar={onAgregar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}

export default ProductList;
