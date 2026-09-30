import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ProductList from "./components/ProductList.jsx";
import CartModal from "./components/CartModal.jsx";
import Footer from "./components/Footer.jsx";
import useDebounce from "./hooks/useDebounce.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { precioFinal } from "./utils/precios.js";

// Duración mínima del estado de carga, para que el spinner no parpadee con respuestas instantáneas.
const RETRASO_SIMULADO_MS = 600;

// Descarta registros incompletos del JSON para que no rompan el renderizado.
function productoEsValido(item) {
  return (
    item &&
    typeof item.id !== "undefined" &&
    typeof item.nombre === "string" &&
    typeof item.precio === "number" &&
    typeof item.imagen === "string" &&
    typeof item.categoria === "string"
  );
}

function App() {
  const [productos, setProductos] = useState([]);
  // Estado de la petición: loading | success | error
  const [estadoCarga, setEstadoCarga] = useState("loading");
  const [errorMensaje, setErrorMensaje] = useState("");

  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const busquedaDebounced = useDebounce(busqueda, 400);

  // Cada ítem del carrito tiene la forma { producto, cantidad } y se conserva entre visitas.
  const [carrito, setCarrito] = useLocalStorage("juga2-cart", []);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  // Carga el catálogo una sola vez al montar; la limpieza evita actualizar el estado si el componente se desmonta.
  useEffect(() => {
    const controller = new AbortController();
    let activo = true;

    async function cargarProductos() {
      setEstadoCarga("loading");
      setErrorMensaje("");

      try {
        const inicio = Date.now();
        const respuesta = await fetch(`${import.meta.env.BASE_URL}data/products.json`, {
          signal: controller.signal,
        });

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
          throw new Error("El archivo de productos no tiene el formato esperado.");
        }

        const validos = datos.filter(productoEsValido);

        const transcurrido = Date.now() - inicio;
        if (transcurrido < RETRASO_SIMULADO_MS) {
          await new Promise((resolve) => setTimeout(resolve, RETRASO_SIMULADO_MS - transcurrido));
        }

        if (activo) {
          setProductos(validos);
          setEstadoCarga("success");
        }
      } catch (error) {
        if (activo && error.name !== "AbortError") {
          console.error("No se pudieron cargar los productos:", error);
          setErrorMensaje("No se pudieron cargar los productos en este momento. Intenta nuevamente más tarde.");
          setEstadoCarga("error");
        }
      }
    }

    cargarProductos();

    return () => {
      activo = false;
      controller.abort();
    };
  }, []);

  // Aplica categoría y búsqueda (ya con debounce) sobre el catálogo completo.
  const productosFiltrados = useMemo(() => {
    const termino = busquedaDebounced.trim().toLowerCase();

    return productos.filter((producto) => {
      const coincideCategoria = categoriaActiva === "todos" || producto.categoria === categoriaActiva;
      const coincideBusqueda = termino === "" || producto.nombre.toLowerCase().includes(termino);
      return coincideCategoria && coincideBusqueda;
    });
  }, [productos, categoriaActiva, busquedaDebounced]);

  // Ids presentes en el carrito, para consultar rápido si un producto ya fue agregado.
  const cartIds = useMemo(() => new Set(carrito.map((item) => item.producto.id)), [carrito]);

  const total = useMemo(
    () => carrito.reduce((suma, item) => suma + precioFinal(item.producto) * item.cantidad, 0),
    [carrito]
  );

  const totalItems = useMemo(() => carrito.reduce((suma, item) => suma + item.cantidad, 0), [carrito]);

  // Si el producto ya está en el carrito suma una unidad; si no, lo agrega con cantidad 1.
  function agregarAlCarrito(producto) {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.producto.id === producto.id);

      if (existente) {
        return prev.map((item) =>
          item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [...prev, { producto, cantidad: 1 }];
    });
  }

  function quitarDelCarrito(id) {
    setCarrito((prev) => prev.filter((item) => item.producto.id !== id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  return (
    <>
      <Navbar
        categoriaActiva={categoriaActiva}
        onCategoriaChange={setCategoriaActiva}
        searchTerm={busqueda}
        onSearchChange={setBusqueda}
        cartCount={totalItems}
        onCartClick={() => setCarritoAbierto(true)}
      />

      <main>
        <Hero />

        <section id="productos" className="py-5">
          <div className="container">
            <h2>Productos destacados</h2>
            <p className="text-secondary mb-4">
              Una selección de los títulos favoritos de nuestra comunidad esta semana.
            </p>

            <ProductList
              products={productosFiltrados}
              cartIds={cartIds}
              onAgregar={agregarAlCarrito}
              status={estadoCarga}
              errorMessage={errorMensaje}
            />
          </div>
        </section>
      </main>

      <Footer />

      <CartModal
        abierto={carritoAbierto}
        onClose={() => setCarritoAbierto(false)}
        items={carrito}
        onRemove={quitarDelCarrito}
        onClear={vaciarCarrito}
        total={total}
      />
    </>
  );
}

export default App;
