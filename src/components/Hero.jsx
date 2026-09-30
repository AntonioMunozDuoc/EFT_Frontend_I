// Portada con el mensaje principal y acceso al catálogo.
function Hero() {
  return (
    <section id="inicio" className="hero text-center">
      <div className="container">
        <p className="eyebrow">Nueva temporada</p>
        <h1>Tu próxima partida empieza aquí</h1>
        <p className="hero-description mx-auto">
          En JUGA2 encuentras todo lo necesario para tu setup: desde consolas de última generación
          hasta los títulos más esperados del año. Envíos a todo el país y retiro en tienda.
        </p>
        <a href="#productos" className="btn btn-primary btn-lg">
          Ver productos destacados
        </a>
      </div>
    </section>
  );
}

export default Hero;
