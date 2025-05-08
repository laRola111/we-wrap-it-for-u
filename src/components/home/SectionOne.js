'use client';
import '@/styles/sections/section1.css';

const SectionOne = ({ messages }) => {
  return (
    <section className="section section-one">
      <h1>{messages.sectionOne.title}</h1>
      <p>{messages.sectionOne.description}</p>
      <div className="cta-buttons">
        <a href="/cotizar" className="btn-quote">{messages.sectionOne.quoteButton}</a>
        <a href="https://wa.me/tuNumero" className="btn-whatsapp" aria-label="WhatsApp">
          {/* <img src="/images/whatsapp-logo.png" alt="WhatsApp" /> */}
        </a>
      </div>
    </section>
  );
};

export default SectionOne;

