// Devuelve la URL final de una imagen: las rutas absolutas se respetan y las relativas se resuelven con la base del sitio.
export function urlImagen(ruta) {
  if (/^(https?:)?\/\//.test(ruta) || ruta.startsWith("data:")) {
    return ruta;
  }
  return `${import.meta.env.BASE_URL}${ruta.replace(/^\//, "")}`;
}
