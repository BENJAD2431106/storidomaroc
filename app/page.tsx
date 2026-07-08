"use client";

import { useState } from "react";
import { ContactForm } from "../src/contactForm";
import { services } from "../data/services";

const stats = [
  { label: "Toiles", value: "Screen ou occultant" },
  { label: "Commandes", value: "Manuelle ou motorisee" },
  { label: "Pose", value: "Adaptee a chaque fenetre" }
];

const serviceNames = Object.keys(services);

export default function Home() {
  const [activeService, setActiveService] = useState(serviceNames[0]);
  const [openIndex, setOpenIndex] = useState(0);

  const currentService = services[activeService as keyof typeof services];

  function handleServiceChange(serviceName: string) {
    setActiveService(serviceName);
    setOpenIndex(0);
  }

  return (
    <main className="page-shell">
      <header className="site-header">
        <a className="brand-frame" aria-label="Storido Maroc" href="#">
          <div className="brand-lamps" aria-hidden="true">
            <span className="brand-lamp" />
            <span className="brand-lamp" />
          </div>
          <div className="brand-copy">
            <span className="brand-name">STORIDO</span>
            <span className="brand-subtitle">Maroc</span>
          </div>
        </a>

        <nav className="header-nav">
          <a href="#services">Produits</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Stores et moustiquaires sur mesure</span>
          <h1>Des stores plus doux pour chaque interieur.</h1>
          <p>
            Enrouleurs, stores jour et nuit, tringles techniques et moustiquaires
            prepares sur mesure pour controler la lumiere, l&apos;intimite et le
            confort sans alourdir la piece.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#contact">Demander un devis</a>
            <a className="button-secondary" href="#services">Voir les gammes</a>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="window-preview" aria-hidden="true">
            <span className="preview-rail" />
            <span className="preview-blind" />
            <span className="preview-light" />
          </div>
          <span className="panel-label">Configurations possibles</span>
          <div className="stats-grid">
            {stats.map((stat) => (
              <article className="stat-card" key={stat.label}>
                <span className="stat-label">{stat.label}</span>
                <strong>{stat.value}</strong>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="section" id="services">
        <div className="section-heading compact">
          <div>
            <span className="eyebrow">Catalogue</span>
            <h2>Explorer les types de stores</h2>
          </div>
          <p>
            Selectionne une famille puis compare les solutions selon le rendu,
            le confort d&apos;usage et le type d&apos;ouverture.
          </p>
        </div>

        <div className="filter-bar" role="tablist" aria-label="Filtres produits">
          {serviceNames.map((serviceName) => (
            <button
              key={serviceName}
              type="button"
              className={serviceName === activeService ? "filter-chip active" : "filter-chip"}
              onClick={() => handleServiceChange(serviceName)}
            >
              {serviceName}
            </button>
          ))}
        </div>

        <div className="catalog-layout">
          <aside className="catalog-sidebar">
            <span className="label">Selection</span>
            <h3>{activeService}</h3>
            <p>{currentService.intro}</p>
            <div className="sidebar-note">
              <strong>Conseil</strong>
              <span>Pour un devis plus precis, indique les dimensions approximatives et le nombre de fenetres.</span>
            </div>
          </aside>

          <div className="product-grid">
            {currentService.items.map((item, index) => {
              const isOpen = index === openIndex;

              return (
                <article className={isOpen ? "product-card open" : "product-card"} key={item.title}>
                  <div className="product-visual" aria-hidden="true">
                    <span className="visual-bar" />
                    <span className="visual-fabric" />
                    <span className="visual-pull" />
                  </div>
                  <button
                    type="button"
                    className="product-toggle"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.bestFor}</span>
                    </div>
                    <span className="detail-mark">{isOpen ? "-" : "+"}</span>
                  </button>

                  {isOpen ? (
                    <div className="product-body">
                      <p>{item.details}</p>
                      <ul className="option-list">
                        {item.options.map((option) => (
                          <li key={option}>{option}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
