// Pie de página con datos de contacto y enlaces.
function Footer() {
  return (
    <footer id="contacto" className="site-footer py-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h2 className="h5">Contacto</h2>
            <p>¿Tienes dudas sobre un producto o un pedido? Escríbenos.</p>
            <p className="mb-1">Av. Falsa 4321, Santiago</p>
            <p className="mb-1">contacto@juga2.cl</p>
            <p>+56 9 1234 5678</p>
          </div>

          <div className="col-md-4">
            <h2 className="h5">Navegación</h2>
            <ul className="list-unstyled">
              <li>
                <a href="#inicio">Inicio</a>
              </li>
              <li>
                <a href="#productos">Productos</a>
              </li>
              <li>
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h2 className="h5">Síguenos</h2>
            <ul className="list-unstyled">
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">X (Twitter)</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />
        <p className="text-center text-secondary mb-0">&copy; 2026 JUGA2. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
