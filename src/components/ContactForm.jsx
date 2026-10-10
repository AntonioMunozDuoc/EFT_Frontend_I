import { useState } from "react";
import { validarContacto } from "../utils/validaciones.js";

const VALORES_INICIALES = { nombre: "", email: "", mensaje: "" };
const MAX_MENSAJE = 500;

// Formulario de contacto controlado por estado: valida al enviar y vuelve a validar mientras se corrige.
function ContactForm() {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    const nuevosValores = { ...valores, [name]: value };
    setValores(nuevosValores);
    setEnviado(false);

    // Una vez que el usuario vio un error en el campo, se revalida en vivo para que lo vea desaparecer.
    if (errores[name]) {
      setErrores((prev) => {
        const siguiente = { ...prev };
        const revalidado = validarContacto(nuevosValores);
        if (revalidado[name]) {
          siguiente[name] = revalidado[name];
        } else {
          delete siguiente[name];
        }
        return siguiente;
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const erroresEncontrados = validarContacto(valores);
    setErrores(erroresEncontrados);

    if (Object.keys(erroresEncontrados).length > 0) {
      setEnviado(false);
      return;
    }

    // No hay backend: se simula el envío y se limpia el formulario.
    setEnviado(true);
    setValores(VALORES_INICIALES);
  }

  const claseCampo = (campo) => `form-control ${errores[campo] ? "is-invalid" : ""}`;

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {enviado && (
        <div className="alert alert-success" role="status">
          ¡Gracias! Tu mensaje fue enviado correctamente. Te responderemos pronto.
        </div>
      )}

      {Object.keys(errores).length > 0 && (
        <div className="alert alert-danger" role="alert">
          Revisa los campos marcados: falta información o está mal ingresada.
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="contacto-nombre" className="form-label">
          Nombre
        </label>
        <input
          id="contacto-nombre"
          name="nombre"
          type="text"
          className={claseCampo("nombre")}
          value={valores.nombre}
          onChange={handleChange}
          placeholder="Tu nombre"
          aria-describedby="contacto-nombre-error"
        />
        <div id="contacto-nombre-error" className="invalid-feedback">
          {errores.nombre}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="contacto-email" className="form-label">
          Correo electrónico
        </label>
        <input
          id="contacto-email"
          name="email"
          type="email"
          className={claseCampo("email")}
          value={valores.email}
          onChange={handleChange}
          placeholder="nombre@dominio.cl"
          aria-describedby="contacto-email-error"
        />
        <div id="contacto-email-error" className="invalid-feedback">
          {errores.email}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="contacto-mensaje" className="form-label">
          Mensaje
        </label>
        <textarea
          id="contacto-mensaje"
          name="mensaje"
          rows="4"
          className={claseCampo("mensaje")}
          value={valores.mensaje}
          onChange={handleChange}
          placeholder="Cuéntanos en qué podemos ayudarte"
          aria-describedby="contacto-mensaje-error"
        ></textarea>
        <div className="d-flex justify-content-between">
          <div id="contacto-mensaje-error" className="invalid-feedback d-block">
            {errores.mensaje}
          </div>
          <small className="text-secondary ms-auto">
            {valores.mensaje.length}/{MAX_MENSAJE}
          </small>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Enviar mensaje
      </button>
    </form>
  );
}

export default ContactForm;
