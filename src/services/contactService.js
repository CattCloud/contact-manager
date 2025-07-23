import { FetchError } from "../utils/FetchError";
const API_URL = import.meta.env.VITE_API_URL;

export const erroresHTTP = {
  400: "Datos enviados incorrectos.",
  403: "Acceso denegado: permisos insuficientes.",
  404: "Ruta no encontrada en el servidor.",
  500: "Error interno del servidor. Intenta más tarde.",
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
      favorito: false
    }));
    return contactos;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error; //  ya está listo para ser capturado por el padre
    }
  }

}

export async function createContact(contactData) {
  try {
    const payload = {
      fullname: contactData.nombre,
      phonenumber: contactData.telefono,
      email: contactData.correo ?? "", // más conciso
      type: contactData.relacion,
      company: contactData.direccion ?? "",
      birthday: contactData.fechaCumple ?? null
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new FetchError({
        codigo: response.status.toString(),
        descripcion: erroresHTTP[response.status] || erroresHTTP.default
      });
    }

    //const data = await response.json();


    const nuevoContacto = await response.json();
    return nuevoContacto;
  } catch (error) {
    console.error("❌ Error al crear contacto:", error);

    // Enviar error estandarizado si no es FetchError
    if (!(error instanceof FetchError)) {
      throw new FetchError({
        codigo: "default",
        descripcion: erroresHTTP.default
      });
    }

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



export async function updateContact(contactData) {
  try {
    const payload = {
      fullname: contactData.nombre,
      phonenumber: contactData.telefono,
      email: contactData.correo ?? "",
      type: contactData.relacion,
      company: contactData.direccion ?? "",
      birthday: contactData.fechaCumple ?? null
    };

    const response = await fetch(`${API_URL}/${contactData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new FetchError({
        codigo: response.status.toString(),
        descripcion: erroresHTTP[response.status] || erroresHTTP.default
      });
    }

    const contactoActualizado = await response.json();
        // Transformar si la API devuelve campos con otros nombres
    const contactoFinal = {
      id: contactoActualizado.id,
      nombre: contactoActualizado.fullname,
      telefono: contactoActualizado.phonenumber,
      relacion: contactoActualizado.type,
      correo: contactoActualizado.email,
      //direccion: contactoActualizado.company,
      //fechaCumple: contactoActualizado.birthday,
      favorito: contactoActualizado.favorite
    };

    return contactoFinal;
  } catch (error) {
    if (!(error instanceof FetchError)) {
      throw new FetchError({
        codigo: "default",
        descripcion: erroresHTTP.default
      });
    }

    throw error;
  }
}