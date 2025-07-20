import { FetchError } from "../utils/FetchError";
const API_URL = import.meta.env.VITE_API_URL;

export const erroresHTTP = {
  403: "Acceso denegado: permisos insuficientes.",
  404: "Contacto no encontrado en la base de datos.",
  500: "Fallo del servidor. Intenta más tarde.",
  default: "Error inesperado. Por favor, vuelve a intentarlo."
};


// GET - Obtener todos los contactos
export async function fetchContacts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new FetchError({
        codigo: response.status.toString(),
        descripcion: erroresHTTP[response.status] || erroresHTTP.default
      });
    }
    const rawData = await response.json();

    const contactos = rawData.map(contactoApi => ({
      id: contactoApi.id,
      nombre: contactoApi.fullname,
      telefono: contactoApi.phonenumber,
      relacion: contactoApi.type,
      correo: contactoApi.email,
      direccion: contactoApi.company, // o contactApi.address si existiera
      fechaCumple: contactoApi.birthday,
      creado: contactoApi.createdAt,
      actualizado: contactoApi.updatedAt,
      favorito: false // o true si lo vas a manejar desde localStorage
    }));
    return contactos;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error; //  ya está listo para ser capturado por el padre
    }
  }

}


// POST - Crear nuevo contacto
export async function createContact(contactData) {
  try {
    // Transformar los datos del frontend al formato que espera la API
    const payload = {
      fullname: contactData.nombre,
      phonenumber: contactData.telefono,
      email: contactData.correo || "", // opcional
      type: contactData.relacion,
      company: contactData.direccion || "", // opcional
      birthday: contactData.fechaCumple || null
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const nuevoContacto = await response.json();
    return nuevoContacto; // lo podés transformar de nuevo si querés usar tu esquema

  } catch (error) {
    console.error("❌ Error al crear contacto:", error);
    throw error;
  }
}


export async function deleteContact(id) {
  try {
    console.log(`🗑️ Eliminando contacto con ID: ${id}...`);

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      throw new Error(errorBody?.message || `Error ${response.status}`);
    }

    console.log("Contacto eliminado exitosamente.");
    return true;

  } catch (error) {
    console.error("❌ Error al eliminar contacto:", error);
    throw error;
  }
}


