// Funciones de validación puras: reciben los valores y devuelven un objeto { campo: "mensaje" }.
// Si el objeto vuelve vacío, el formulario es válido.

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'.-]+$/;

export function validarContacto({ nombre, email, mensaje }) {
  const errores = {};

  const nombreLimpio = nombre.trim();
  if (nombreLimpio === "") {
    errores.nombre = "El nombre es obligatorio.";
  } else if (nombreLimpio.length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  } else if (!REGEX_NOMBRE.test(nombreLimpio)) {
    errores.nombre = "El nombre solo puede contener letras y espacios.";
  }

  const emailLimpio = email.trim();
  if (emailLimpio === "") {
    errores.email = "El correo electrónico es obligatorio.";
  } else if (!REGEX_EMAIL.test(emailLimpio)) {
    errores.email = "Ingresa un correo válido, por ejemplo nombre@dominio.cl.";
  }

  const mensajeLimpio = mensaje.trim();
  if (mensajeLimpio === "") {
    errores.mensaje = "El mensaje es obligatorio.";
  } else if (mensajeLimpio.length < 10) {
    errores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
  } else if (mensajeLimpio.length > 500) {
    errores.mensaje = "El mensaje no puede superar los 500 caracteres.";
  }

  return errores;
}

export function validarProducto({ nombre, categoria, precio, descripcion }) {
  const errores = {};

  if (nombre.trim().length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  if (categoria === "") {
    errores.categoria = "Selecciona una categoría.";
  }

  const precioNumero = Number(precio);
  if (precio === "" || Number.isNaN(precioNumero)) {
    errores.precio = "Ingresa un precio numérico.";
  } else if (!Number.isInteger(precioNumero) || precioNumero <= 0) {
    errores.precio = "El precio debe ser un número entero mayor a 0.";
  }

  if (descripcion.trim().length < 10) {
    errores.descripcion = "La descripción debe tener al menos 10 caracteres.";
  }

  return errores;
}
