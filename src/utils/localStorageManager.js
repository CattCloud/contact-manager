import { notyf } from "./notificacion";

const STORAGE_KEY = "contactos_app";

function localStorageManager() {
    function guardar(contactos) {
        try {
            const data = JSON.stringify(contactos);
            localStorage.setItem(STORAGE_KEY, data);
        } catch (error) {
            notyf.error("Error al guardar en localStorage:", error);
        }
    }

    function obtener() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            console.log("Contactos cargados correctamente");
            return data ? JSON.parse(data) : [];
        } catch (error) {
            notyf.error("Error al leer desde localStorage:", error);
            return [];
        }
    }

    function limpiar() {
        localStorage.removeItem(STORAGE_KEY);
    }

    function init() {
        const data_init = [
            {
                id: 1,
                nombre: "Lucía Márquez",
                telefono: "913245678",
                relacion: "Familia",
                correo: "lucia.marquez@example.com",
                direccion: "",
                favorite: true
            },
            {
                id: 2,
                nombre: "Jorge Torres",
                telefono: "945678123",
                relacion: "Trabajo",
                correo: "jorge.torres@empresa.com",
                direccion: "Calle Empresarial 456, San Isidro",
                favorite: false
            },
            {
                id: 3,
                nombre: "Xiomara Verde",
                telefono: "987654321",
                relacion: "Amistad",
                correo: "xiomara.v@gmail.com",
                favorite: true
            },
            {
                id: 4,
                nombre: "Carlos Rivas",
                telefono: "912998877",
                relacion: "Personal",
                correo: "",
                direccion: "",
                favorite: false
            },
            {
                id: 5,
                nombre: "Valentina López",
                telefono: "916112233",
                relacion: "Amistad",
                direccion: "Jr. Amor y Paz 678, Surco",
                favorite: false
            }
            
        ];
        const yaExiste = localStorage.getItem(STORAGE_KEY);
        if (!yaExiste) {
            guardar(data_init);
        }
    }
    init();
    return {
        guardar,
        obtener,
        limpiar
    }
};

export const managerls = localStorageManager();
//managerls = manager;

//localStorage.clear();


export function guardarContactosEnLocalStorage(contactos) {
  try {
    localStorage.setItem("misContactos", JSON.stringify(contactos));
    notyf.success("Contactos guardados en el LocalStorage");
  } catch (error) {
    notyf.error("Error al guardar contactos en el LocalStorage")
    console.log(error);
  }
}


export function cargarContactosDesdeLocalStorage() {
  try {
    const data = localStorage.getItem("misContactos");
    if (!data) {
      notyf.success("No se encontraron contactos guardados");
      return [];
    }
    const contactos = JSON.parse(data);
    notyf.success("Contactos cargados desde el navegador.");
    return contactos;
  } catch (error) {
    console.error("❌ Error al cargar contactos:", error);
    notyf.error("No se pudieron cargar los contactos.")
    return [];
  }
}
