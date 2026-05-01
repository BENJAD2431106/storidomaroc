import type { FormEvent } from "react";

const ntfyEndpoint = process.env.NEXT_PUBLIC_NTFY_TOPIC_URL || "";

export async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event.currentTarget;

  const formData = new FormData(form);
  const fullName = formData.get("fullName")?.toString().trim() || "";
  const phone = formData.get("phone")?.toString().trim() || "";
  const city = formData.get("city")?.toString().trim() || "";
  const service = formData.get("service")?.toString().trim() || "";
  const message = formData.get("message")?.toString().trim() || "";

  if (!ntfyEndpoint) {
    return {
      type: "error",
      message: "Ajoute NEXT_PUBLIC_NTFY_TOPIC_URL pour activer l'envoi."
    };
  }

  const payload = [
    "Nouvelle demande Storido",
    `Nom: ${fullName}`,
    `Telephone: ${phone}`,
    `Ville: ${city}`,
    `Service: ${service}`,
    "",
    message
  ].join("\n");

  try {
    const response = await fetch(ntfyEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Title: "Demande site Storido",
        Priority: "default",
        Tags: "email,house"
      },
      body: payload
    });

    if (!response.ok) {
      throw new Error("Envoi impossible");
    }

    form.reset();

    return {
      type: "success",
      message: "Demande envoyee."
    };
  } catch {
    return {
      type: "error",
      message: "Echec de l'envoi."
    };
  }
}
