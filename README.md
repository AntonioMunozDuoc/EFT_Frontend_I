# JUGA2 - Tienda de Videojuegos (React)

**Alumno:** Antonio Muñoz
Desarrollo Frontend I (PFY2201) - Duoc UC

Versión en React del eCommerce JUGA2, migrada desde una base en HTML, Bootstrap y JavaScript. El catálogo se carga de forma asíncrona, el carrito persiste entre sesiones y la interfaz responde al estado de la aplicación con mensajes y estilos que cambian según el contexto.

## Enlaces

- **Repositorio:** https://github.com/AntonioMunozDuoc/Exp3_S8_Frontend_I
- **Sitio publicado:** https://antoniomunozduoc.github.io/Exp3_S8_Frontend_I/

## Tecnologías

- React 18 + Vite
- Bootstrap 5 (estilos y grid)
- Hooks de React (`useState`, `useEffect`, `useMemo`) y hooks propios (`useDebounce`, `useLocalStorage`)

## Estructura del proyecto

```
Exp3_S8_Frontend_I/
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
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── CartModal.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   └── precios.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── capturas/
```

## Funcionalidades

- El catálogo se obtiene desde `products.json` dentro de un `useEffect`, con estados de carga y error manejados con `useState`. Mientras se resuelve la petición se muestra un spinner, y si falla, un mensaje explicando lo ocurrido en vez de dejar la sección vacía.
- Cada producto recibido se valida antes de mostrarse: si le faltara un campo esperado (nombre, precio, imagen o categoría), se descarta en lugar de romper el renderizado.
- El carrito se gestiona con estado de React (`useLocalStorage`, que envuelve a `useState`) y guarda su contenido en `localStorage`, así que se mantiene igual si se recarga la página o se abre el sitio más tarde. El total y los subtotales consideran el precio de oferta cuando existe.
- El botón de cada producto cambia de "Agregar al carrito" a "En el carrito" apenas el producto ya tiene alguna unidad agregada, el modal del carrito avisa cuando está vacío y el listado avisa cuando ninguna búsqueda tiene resultados.
- El buscador filtra el catálogo mientras se escribe, con un pequeño retraso (debounce) para no recalcular la lista en cada tecla.
- El filtro por categoría y el modal del carrito se manejan completamente con estado de React.
- Algunos productos incluyen un precio de oferta, mostrado junto al precio normal tachado.

## Ejecutar en local

```
npm install
npm run dev
```

## Publicar en gh-pages

```
npm run deploy
```

Genera la build de producción y la publica en la rama `gh-pages` del repositorio, usando la ruta ya configurada en `vite.config.js`.

## Capturas

En la carpeta `capturas/` se documentan la carga dinámica del catálogo, el carrito en uso y ejemplos de renderizado condicional (carrito vacío, botón cambiando de estado y el mensaje de error).
