import type { FormEvent } from "react";
import { useState } from "react";

import { handleSubmit } from "./handleSubmit";

export function ContactForm() {
  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    const result = await handleSubmit(event);
    setStatus(result);
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">Contact</span>
          <h2>Demande rapide</h2>
        </div>
      </div>

      <div className="contact-shell">
        <article className="contact-intro">
          <span className="label">Devis</span>
          <h3>Parle-nous de ton projet</h3>
          <p>
            Indique le type de store, la ville, le nombre d&apos;ouvertures et les
            dimensions approximatives. Ces details aident a preparer une reponse
            claire et un devis plus juste.
          </p>
          <div className="notify-card">
            <span className="notify-dot" aria-hidden="true" />
            <div>
              <strong>Notification directe</strong>
              <p>La demande arrive directement avec les informations du formulaire.</p>
            </div>
          </div>
        </article>

        <form className="contact-form" onSubmit={onSubmit}>
          <div className="field-grid">
            <label className="field">
              <span>Nom</span>
              <input name="fullName" placeholder="Votre nom" required />
            </label>

            <label className="field">
              <span>Telephone</span>
              <input name="phone" placeholder="06..." required />
            </label>

            <label className="field">
              <span>Ville</span>
              <input name="city" placeholder="Agadir" />
            </label>

            <label className="field">
              <span>Produit</span>
              <select name="service" defaultValue="Enrouleurs a chainette">
                <option>Enrouleurs a chainette</option>
                <option>Enrouleurs motorises RTS</option>
                <option>Enrouleurs motorises WT</option>
                <option>Store jour et nuit</option>
                <option>Tringles a rideau motorisees</option>
                <option>Tringles a rideau a chainette</option>
                <option>Moustiquaires enroulables</option>
                <option>Moustiquaires coulisse</option>
                <option>Moustiquaires plissees</option>
              </select>
            </label>
          </div>

          <label className="field">
            <span>Message</span>
            <textarea
              name="message"
              placeholder="Dimensions, besoin, localisation, delai..."
              rows={5}
              required
            />
          </label>

          <div className="form-footer">
            <button className="button-primary submit-button" type="submit">
              Envoyer
            </button>
            <span className={status.type ? `form-status ${status.type}` : "form-status"}>
              {status.message || "Reponse apres reception de la demande"}
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
