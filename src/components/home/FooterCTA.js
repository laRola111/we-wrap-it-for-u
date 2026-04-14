'use client';
import '@/styles/sections/footer.css';

export default function FooterCTA() {
  return (
    <>
      <section className="footer-cta-section">
        <div className="footer-content">
          <div className="cta-text">
            <h2 className="text-metallic">Hablemos de tu próximo gran activo</h2>
            <p>Deja de ser invisible. Envíanos los detalles de tu vehículo y te contactaremos para una auditoría de diseño.</p>
          </div>

          <form className="minimalist-form glass-panel" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input type="text" placeholder="Tu Nombre o Empresa" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Correo Electrónico" required />
            </div>
            <div className="form-group">
              <select required defaultValue="">
                <option value="" disabled>Tipo de Vehículo</option>
                <option value="sedan">Auto (Sedan/Hatchback)</option>
                <option value="suv">Camioneta (SUV/Pickup)</option>
                <option value="van">Van Comercial</option>
                <option value="foodtruck">Food Truck / Trailer</option>
              </select>
            </div>
            <button type="submit" className="form-submit-btn" data-hoverable="true">
              Solicitar Cotización 3D
            </button>
          </form>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} We Wrap It For U. All Rights Reserved.</p>
        </div>
      </section>

      {/* Sticky CTA - Floating button */}
      <a href="#audit" className="sticky-cta glass-panel" data-hoverable="true">
        <span className="dot"></span>
        Reservar Auditoría de Diseño
      </a>
    </>
  );
}
