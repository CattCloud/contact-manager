import { FetchError } from "../utils/FetchError";
import { procesarContactosAPI,enriquecerTelefono } from "../utils/normalizarTelefono";


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

    // Mapear datos básicos de la API
    const contactosBasicos = rawData.map(contactoApi => ({
      id: contactoApi.id,
      nombre: contactoApi.fullname,
      telefono: contactoApi.phonenumber, // Teléfono original de la API
      relacion: contactoApi.type,
      correo: contactoApi.email,
      direccion: contactoApi.company,
      fechaCumple: contactoApi.birthday,
      creado: contactoApi.createdAt,
      actualizado: contactoApi.updatedAt,
      favorito: false
    }));

    // Procesar y normalizar los teléfonos
    const contactosNormalizados = procesarContactosAPI(contactosBasicos);

    // Opcional: Log para debugging
    console.log('Contactos normalizados:', contactosNormalizados);

    return contactosNormalizados;

  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(`Error inesperado al obtener contactos: ${error.message}`);
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


    const contactoApi = await response.json();

    const contactofinal={
      id: contactoApi.id,
      nombre: contactoApi.fullname,
      telefono: contactoApi.phonenumber, // Teléfono original de la API
      relacion: contactoApi.type,
      correo: contactoApi.email,
      direccion: contactoApi.company,
      fechaCumple: contactoApi.birthday,
      creado: contactoApi.createdAt,
      actualizado: contactoApi.updatedAt,
      favorito: false
    }

    

    //console.log(enriquecerTelefono(contactofinal))
    return enriquecerTelefono(contactofinal);
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
      throw new FetchError({
        codigo: response.status.toString(),
        descripcion: erroresHTTP[response.status] || erroresHTTP.default
      });
    }

    console.log("Contacto eliminado exitosamente.");
    return true;

  }  catch (error) {
    if (!(error instanceof FetchError)) {
      throw new FetchError({
        codigo: "default",
        descripcion: erroresHTTP.default
      });
    }

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

    /*
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
    */

    return contactData;
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


export async function fetchContactById(id) {
  try {

    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new FetchError({
        codigo: response.status.toString(),
        descripcion: erroresHTTP[response.status] || erroresHTTP.default
      });
    }

    const contactoApi = await response.json();
    const contactoFinal = {
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
    }
    return enriquecerTelefono(contactoFinal);

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