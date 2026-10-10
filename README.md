# JUGA2 - Tienda de Videojuegos (EFT Frontend I)

**Alumno:** Antonio Muñoz
**Asignatura:** Desarrollo Frontend I (PFY2201) - Duoc UC
**Evaluación:** Evaluación Final Transversal (EFT), Semana 9

Sitio web de una tienda online de videojuegos, consolas y accesorios. Está construido con **HTML 5, CSS 3, JavaScript, Bootstrap 5 y React**, y evolucionó desde la entrega anterior (Exp3_S8) incorporando un formulario de contacto con validación y la gestión del catálogo (agregar y eliminar productos).

## Enlaces

- **Repositorio:** https://github.com/AntonioMunozDuoc/EFT_Frontend_I
- **Sitio publicado:** https://antoniomunozduoc.github.io/Exp3_S8_Frontend_I/

## Tecnologías

| Tecnología | Uso en el proyecto |
| --- | --- |
| HTML 5 | Estructura semántica: `header`, `nav`, `main`, `section`, `article`, `footer`, `form`, `label`. |
| CSS 3 | Estilos personalizados con variables CSS, **Flexbox** (tarjetas, carrito, navbar) y **CSS Grid** (formulario de alta de productos). |
| Bootstrap 5 | Navbar responsiva, grilla (`row`/`col-*`), tarjetas (`card`), formularios con estados `is-invalid`, alertas, badges y spinner. |
| JavaScript (ES6+) | Catálogo como arreglo de objetos, `fetch` asíncrono, filtros con `filter`/`reduce`, validaciones con expresiones regulares y `localStorage`. |
| React 18 + Vite | Componentes, `state`, `props`, hooks (`useState`, `useEffect`, `useMemo`) y hooks propios. |

## Cumplimiento de los requerimientos

| Requerimiento del caso | Dónde se implementa |
| --- | --- |
| Página principal con productos en tarjetas (imagen, nombre, precio y descripción) | `ProductList.jsx` y `ProductCard.jsx`; los datos vienen de `public/data/products.json`. |
| Objeto JavaScript con la información de los videojuegos (nombre, categoría, precio, descripción, imagen) | `public/data/products.json` se carga con `fetch` y se convierte en un arreglo de objetos que vive en el estado de `App.jsx`. |
| Generación dinámica de las tarjetas | `ProductList.jsx` recorre el arreglo con `map` y renderiza un `ProductCard` por producto. |
| Filtrado por categoría | Botones de categoría en `Navbar.jsx`; `App.jsx` calcula `productosFiltrados` con `useMemo`. También hay buscador por nombre con *debounce*. |
| Barra de navegación entre secciones | `Navbar.jsx` con enlaces a Inicio, Productos, Agregar producto y Contacto. |
| Formulario de contacto (nombre, email y mensaje) con validación | `ContactForm.jsx` y `utils/validaciones.js`; muestra un mensaje de error por campo y una confirmación al enviar. |
| React: componentes, state y props | Ver "Estructura de componentes". |
| Agregar y eliminar videojuegos de la lista | `AddProductForm.jsx` (alta) y botón `×` en cada `ProductCard` (baja); ambos actualizan el estado `productos` de `App.jsx`. |
| Sitio responsivo | Grilla de Bootstrap (`col-12 col-sm-6 col-lg-3`), navbar colapsable y formulario en una o dos columnas según el ancho. |
| Repositorio en GitHub y README | Este archivo y el historial de commits del repositorio. |

## Estructura del proyecto

```
EFT_Frontend_I/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── data/products.json
│   └── img/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductCard.jsx
│   │   ├── AddProductForm.jsx
│   │   ├── ContactForm.jsx
│   │   ├── CartModal.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   ├── categorias.js
│   │   ├── imagenes.js
│   │   ├── precios.js
│   │   └── validaciones.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── capturas/
```

## Estructura de componentes (state y props)

`App.jsx` concentra el estado compartido y lo reparte a los componentes hijos mediante props:

- **Estado en `App`:** `productos`, `estadoCarga`, `categoriaActiva`, `busqueda`, `carrito` y `carritoAbierto`.
- **`Navbar`** recibe la categoría activa, el término de búsqueda, la cantidad del carrito y las funciones para modificarlos.
- **`ProductList`** recibe los productos ya filtrados, el estado de la carga y los *callbacks* `onAgregar` y `onEliminar`; decide si muestra el spinner, el error, "sin resultados" o la grilla.
- **`ProductCard`** muestra un producto y avisa al padre cuando se agrega al carrito o se elimina del catálogo.
- **`AddProductForm`** mantiene su propio estado de formulario y, si los datos son válidos, entrega el producto nuevo a `App` con `onAgregar`.
- **`ContactForm`** maneja sus valores, errores y mensaje de éxito con `useState`.
- **`CartModal`** recibe los ítems y el total calculado.

## Funcionalidades

- **Catálogo dinámico:** se obtiene con `fetch` dentro de un `useEffect`, con `AbortController`, validación de cada registro, spinner de carga y mensaje de error.
- **Filtros:** por categoría y por nombre (con *debounce* de 400 ms).
- **Agregar videojuegos:** formulario con validación (nombre, categoría, precio entero positivo y descripción). El producto nuevo aparece al inicio del catálogo. La imagen es opcional y, si no se indica, se usa el logo de la tienda.
- **Eliminar videojuegos:** botón `×` en cada tarjeta; si el producto estaba en el carrito, también se retira de él.
- **Formulario de contacto:** valida que el nombre tenga al menos 3 letras, que el correo tenga un formato válido y que el mensaje tenga entre 10 y 500 caracteres. Muestra errores por campo y una alerta general; si todo es correcto, confirma el envío y limpia el formulario.
- **Carrito:** persiste en `localStorage` mediante el hook `useLocalStorage`, con subtotales y total que consideran el precio de oferta.
- **Ofertas:** los productos con `precioOferta` muestran el precio anterior tachado y una etiqueta "Oferta".

> Los cambios al catálogo (agregar o eliminar) viven en el estado de React: al recargar la página se vuelve a cargar el catálogo original desde `products.json`. El carrito sí se conserva.

## Instalación y uso

Requisitos: **Node.js 18 o superior** y **npm**.

1. Clonar el repositorio:

   ```
   git clone https://github.com/AntonioMunozDuoc/EFT_Frontend_I.git
   cd EFT_Frontend_I
   ```

2. Instalar las dependencias:

   ```
   npm install
   ```

3. Levantar el servidor de desarrollo:

   ```
   npm run dev
   ```

   Abrir la dirección que muestra la terminal (normalmente `http://localhost:5173/EFT_Frontend_I/`).

4. Generar la versión de producción (opcional):

   ```
   npm run build
   npm run preview
   ```

### Cómo probar el sitio

1. **Filtro:** pulsar "Consolas", "Videojuegos" o "Accesorios" en la barra de navegación; "Todos" quita el filtro. También se puede escribir en el buscador.
2. **Carrito:** pulsar "Agregar al carrito" en una tarjeta y abrir "Carrito" para ver el detalle.
3. **Agregar producto:** ir a "Agregar producto", dejar campos vacíos y enviar para ver los errores; luego completar el formulario y confirmar que la tarjeta aparece en el catálogo.
4. **Eliminar producto:** pulsar `×` en una tarjeta y confirmar que desaparece.
5. **Contacto:** enviar el formulario vacío, con un correo inválido (`algo@`) y finalmente con datos correctos.
6. **Responsividad:** reducir el ancho de la ventana (o usar las herramientas de desarrollo) y comprobar que el menú se colapsa y las tarjetas pasan de cuatro a una columna.

## Publicar en gh-pages

```
npm run deploy
```

Genera la build de producción y la publica en la rama `gh-pages`, usando la ruta configurada en `vite.config.js` (`base: "/EFT_Frontend_I/"`).

## Capturas

La carpeta `capturas/` reúne imágenes del sitio funcionando:

| Archivo | Contenido |
| --- | --- |
| `01-catalogo-escritorio.png`, `01-catalogo-tablet.png`, `01-catalogo-movil.png` | Catálogo en 4, 2 y 1 columnas según el ancho de pantalla. |
| `02-menu-movil.png` | Navbar colapsada y desplegada en móvil. |
| `03-filtro-consolas.png` | Filtro por categoría aplicado. |
| `04-carrito.png` | Carrito con un producto. |
| `05-contacto-errores.png`, `06-contacto-exito.png` | Formulario de contacto con errores de validación y con envío exitoso. |
| `07-agregar-errores.png`, `08-producto-agregado.png` | Alta de un videojuego: validación y resultado en el catálogo. |
| `09-error-carga.png` | Mensaje de error cuando falla la carga del catálogo. |

## Calidad y accesibilidad

- Revisado con axe-core (reglas WCAG 2 A/AA y buenas prácticas) en escritorio y móvil, incluyendo formularios con errores y el carrito abierto: sin violaciones.
- Sin desbordamiento horizontal en 375 px, 768 px y 1366 px.
- Los formularios usan `label` asociado a cada campo, `aria-describedby` y `role="alert"`/`role="status"` en los mensajes; el carrito es un diálogo (`role="dialog"`).
