"use client";

import { useState } from "react";
import { ContactForm } from "../src/contactForm";
import { services } from "../data/services";

const stats = [
  { label: "Toiles", value: "Screen / Blackout" },
  { label: "Commandes", value: "Chainette / RTS / WT" },
  { label: "Pose", value: "Sur mesure" }
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
          <h1>Solutions propres. Commandes simples. Pose nette.</h1>
          <p>
            Enrouleurs, jour et nuit, tringles techniques et moustiquaires pour
            l&apos;interieur et l&apos;exterieur.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#contact">Demander un devis</a>
            <a className="button-secondary" href="#services">Voir les gammes</a>
          </div>
        </div>

        <aside className="hero-panel">
          <span className="panel-label">Configurations</span>
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
            <h2>Choisir une famille</h2>
          </div>
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
          </aside>

          <div className="catalog-list">
            {currentService.items.map((item, index) => {
              const isOpen = index === openIndex;

              return (
                <article className={isOpen ? "detail-card open" : "detail-card"} key={item.title}>
                  <button
                    type="button"
                    className="detail-toggle"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <div>
                      <span className="label">Produit</span>
                      <strong>{item.title}</strong>
                    </div>
                    <span className="detail-mark">{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen ? (
                    <div className="detail-body">
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
