## Descripción del Proyecto

**Contact Manager** es una aplicación desarrollada en React que permite gestionar contactos personales de forma interactiva, con enfoque en experiencia de usuario y estructura de componentes. El objetivo principal es practicar y afianzar conceptos fundamentales como:

- Manejo de estado dinámico con `useState`
- Comunicación entre componentes a través de `props`
- Renderizado condicional y reactivo
- Buenas prácticas en el diseño de UI (accesibilidad, jerarquía visual y estados interactivos)

El proyecto simula un entorno real de administración de contactos, con funcionalidades como:
- Marcar o desmarcar contactos como favoritos
- Filtrar la vista entre todos los contactos y solo favoritos
- Mostrar mensajes útiles cuando no hay resultados
- Visualizar el total de contactos destacados

## Funcionalidades Implementadas

Esta versión del Contact Manager incluye diversas funcionalidades diseñadas para reforzar el manejo de `state`, `props` y eventos en React:

###  Gestión de Contactos

* **Tarjetas Interactivas (ContactCard):**

  * Visualiza nombre, teléfono, relación y favorito.
  * Soporte para edición y eliminación.
  * Comunicación hijo→padre mediante funciones callback.

* **Vista Detallada de Contacto:**

  * Ruta dinámica: `/contacto/:id`, carga individual desde API (`fetchContactById()`).
  * Visualización enriquecida con diseño responsive.
  * Navegación circular entre contactos visibles (respetando filtros activos).
  * Soporte para navegación programática tras creación o edición.

* **Formulario Controlado para Crear y Editar:**

  * Validación en tiempo real: campos vacíos, duplicados, email.
  * Campos sincronizados con estado (`useState`).
  * Edición precargada con `useEffect`.
  * Navegación automática tras guardar: redirige a `/contacto/:id` con mensaje visual.



* **Validacion de datos**
  * Detección de campos vacíos (`nombre`, `teléfono`,`relacion`) y visualización de mensajes de error.
  * Evita duplicados por nombre y número de teléfono, normalizando el texto (`trim` y `toLowerCase`).
  * Los errores se muestran en tiempo real con feedback visual claro.


* **Eliminación Segura de Contactos:**

  * Botón 🗑️ por contacto.
  * Diálogo de confirmación previo a eliminar.
  * Actualización reactiva del listado al eliminar.


###  Lógica Reactiva y Estado Global

* **Filtros Dinámicos y Contador:**

  * Ver todos o solo favoritos.
  * Muestra cuántos contactos son favoritos.
  * Mantiene consistencia entre vista, estado y localStorage/API.

* **Búsqueda Inteligente:**

  * Filtrado en tiempo real por nombre, teléfono o relación.
  * Resaltado del texto coincidente en resultados.
  * Compatible con el filtro actual (Todos/Favoritos).

* **Etiquetas de Relación Visuales:**

  * Clasificación por Familia, Trabajo, Amistad, Personal, Otro.
  * `BadgeRelacion` con color distintivo por categoría.


###  Integración con API REST

* **Service Layer Centralizado (`contactService.js`):**

  * Funciones CRUD: `fetchContacts`, `createContact`, `updateContact`, `deleteContact`, `fetchContactById`.
  * Manejo de errores con `try/catch` y validaciones `response.ok`.

* **Operaciones CRUD Complejas:**

  * `GET`: Carga todos los contactos.
  * `GET /:id`: Detalle de contacto.
  * `POST`: Crear nuevo.
  * `PUT /:id`: Editar existente.
  * `DELETE /:id`: Eliminar.


###  Navegación y Routing Profesional

* **Routing con React Router:**

  * Rutas principales:

    * `/` → Página de bienvenida
    * `/contactos` → Gestión de contactos
    * `/contacto/:id` → Detalle del contacto
    * `/sobremi` → Información del autor/proyecto

* **Navegación Programática (`useNavigate`):**

  * Redirección automática tras creación/edición.
  * Botones de regreso (`← Atrás`) o cancelación de formularios.
  * Soporte para mensajes contextuales usando `location.state`.

* **ID Dinámico Validado:**

  * Control de errores si el ID no es válido.
  * Manejo visual de errores y estado `loading`.

* **Navegación Circular Secuencial:**

  * Desde la vista de detalle puedes navegar a contacto anterior o siguiente.


###  Interfaz y Experiencia de Usuario

* **Diseño Modular y Responsivo:**

  * Interfaz con Tailwind CSS.
  * Layout adaptativo en móvil, tablet y desktop.

* **Animaciones y Estadísticas Interactivas:**

  * SplashScreen durante carga, ErrorScreen ante fallos.

* **Navegación Contextual :**

  * Botones "Ver Contactos", "Crear Otro", "Regresar" según flujo.
  * Estado activo de navegación y menús responsivos.


###  Despliegue en Netlify

- Proyecto compilado con `Vite` usando `npm run build` y carpeta `dist` como `publish directory`.
- App publicada en línea con una URL funcional: accesible para revisión, demostración o portafolio.


## Tecnologías y Librerías Utilizadas

- ⚛️ React (Hooks: `useState`, `useEffect`)
- 💨 TailwindCSS para estilos responsivos y visuales
- ⚡ Vite como entorno de desarrollo
- 🧩 Notyf para notificaciones interactivas
- 🤖 GitHub como repositorio
- 🎮 Modali , para mensajes de confirmacion
- ☁  Netlify, como herramienta deploy 
     
## Screenshots de la aplicación

### Pagina Principal
<img width="1351" height="680" alt="image" src="https://github.com/user-attachments/assets/0c93bbee-b305-4790-ac00-5a6e0b42fac7" />


### Modal Nuevo y Editar Contacto
<img width="1365" height="645" alt="image" src="https://github.com/user-attachments/assets/c699b6f5-2940-46e9-8550-6dac242faeb4" />

### Pagina Lista de Contactos
<img width="1352" height="677" alt="image" src="https://github.com/user-attachments/assets/fead75bb-2216-4914-b318-2618ea8c6a18" />

### Pagina Detalle de Contacto
<img width="1362" height="679" alt="image" src="https://github.com/user-attachments/assets/b9eff7df-d350-4054-8707-ff11cce29503" />

### Pagina About Me
<img width="1350" height="680" alt="image" src="https://github.com/user-attachments/assets/eb199f5a-c299-407f-925b-70ff5986b638" />


### Splash Screen
<img width="1365" height="678" alt="image" src="https://github.com/user-attachments/assets/e3ccd682-a549-43b9-86fe-9f819651a3e7" />


## ⚙️ Decisiones Técnicas y Patrones Aplicados

### 👉 Diseño Modular de Componentes

- Cada funcionalidad está separada en componentes bien definidos: `Header`, `Footer`, `ControlBar`, `ListContacts`, `ContactoDetalle`, `ModalView`, etc.
- Facilita el mantenimiento, la reutilización y la escalabilidad del proyecto.

### 👉 Manejo Centralizado del Estado

- El componente principal (`App`) actúa como **orquestador del estado global**, gestionando:
  - Lista de contactos (`estadoContactos`)
  - Contacto seleccionado (`contactoElegido`)
  - Filtros (`estadoFiltro`, `searchEstado`)
  - Modal de formulario (`estadoModal`, `modoModal`)
- Evita duplicaciones y mantiene un flujo predecible de datos.

### 👉 Comunicación Bidireccional con Props

- Los componentes hijos reciben datos y funciones desde el padre a través de `props`.
- Las funciones como `onFavorite`, `onEditarContacto`, `onEliminarContacto`, permiten que los hijos **notifiquen al padre** sin romper el encapsulamiento.

### 👉 Pattern de Renderizado Condicional

- Uso de ternarios e indicadores visuales para mostrar:
  - Mensajes cuando no hay contactos visibles
  - Detalles sólo cuando hay contacto seleccionado
  - Modal sólo si `isOpen === true`

### 👉 Separación de Lógica Visual y Funcional

- Utilización de utilidades como `localStorageManager` (`managerls`) para desacoplar la persistencia del flujo UI.
- Las funciones de validación (`validarTelefono`, `validarCorreo`, `validaRequerido`) están aisladas dentro del formulario.

### 👉 Hook `useEffect` para Sincronización Reactiva

- Sincroniza el `contactoElegido` con los contactos visibles al aplicar búsqueda o filtro.
- Evita renderizados infinitos usando dependencias controladas.

### 👉 Pattern de Render Prop para Componentes Flexibles

- `ModalConfirmaccion` recibe `triggerButton` como función → permite renderizar el botón de apertura desde el padre con total libertad visual.
- Excelente ejemplo de **desacoplamiento visual** con control funcional integrado.

### 👉 Patrones UX:

- Modales (`Modali`) para confirmaciones con feedback destructivo.
- Notificaciones (`Notyf`) para acciones exitosas o errores.
- Transiciones suaves, estados visuales, iconografía SVG para mejorar la experiencia del usuario.

### 👉 Diseño Responsive Adaptativo
- Toda la interfaz está construida usando TailwindCSS con breakpoints que permiten adaptar el layout según el tamaño de pantalla.
- El main utiliza una estructura de grilla dinámica (md:grid-cols-[73%_25%] en desktop y grid-cols-1 en móviles) que reorganiza los paneles de forma intuitiva.
- Componentes como ContactoDetalle y ListContacts ajustan su distribución en pantallas medianas o pequeñas, apilando el contenido y manteniendo legibilidad.
- Inputs, botones y modales se escalan correctamente sin romper el diseño, respetando márgenes, paddings y visual hierarchy.
- Animaciones y estados de interacción (hover, focus, scale) fueron calibrados para funcionar tanto en táctiles como en escritorio.


## ✅ Historias de Usuario implementadas
###  Historia de Usuario 01: Gestión Internacional de Teléfonos con Detección y Validación Inteligente

**Como** usuario que guarda contactos de distintos países,
**quiero** poder seleccionar el país y validar el número telefónico correctamente,
**para** asegurarme de que todos mis contactos estén bien escritos, sean válidos y saber de qué país proviene cada uno.


#### 👉 Criterios de Aceptación

1. **Selector claro de país con prefijo automático:**

   * Al registrar o editar un contacto, quiero poder elegir el país desde un menú con nombre, bandera y código telefónico (como +51 para Perú).
   * Quiero que el número se inicie automáticamente con ese código y que no pueda borrarlo por error.

2. **Validación en tiempo real del número:**

   * Mientras escribo el número, quiero que la app me diga si es válido o no.
   * Si ingreso un número incorrecto, espero un mensaje claro que me explique por qué no es válido.

3. **Vista enriquecida del teléfono:**

   * Quiero ver el teléfono de mis contactos bien formateado, con información como:

     * Bandera del país
     * Código de país
     * Si es móvil o fijo
     * Formato nacional correcto
   * No quiero adivinar si un número es válido ni de qué país es.

4. **Enriquecimiento automático de contactos existentes:**

   * Al abrir la app, quiero que incluso los contactos traídos desde la API ya tengan su información telefónica formateada y completa, sin que yo tenga que corregir nada.

#### 👉 Aspectos Técnicos Clave:

* Se creó una función `normalizarTelefono()` que:
  * Limpia y formatea el número
  * Determina el país (ISO, nombre, bandera, dialCode)
  * Evalúa si es válido, móvil o fijo
  * Genera una descripción basada en metadatos (por ejemplo: "Móvil en España, formato nacional: 612 34 56 78").
* Se usa `parsePhoneNumberWithError` y `isValidPhoneNumber` de `libphonenumber-js/max` para detección y validación precisa.
* Se creó `procesarContactosAPI()` para enriquecer automáticamente todos los teléfonos traídos desde la API antes de mostrarlos.
* El selector de país reutiliza `country-list-with-dial-code-and-flag` filtrando duplicados y destacando los países principales por código.
* El sistema es **escalable y mantenible**, permitiendo añadir nuevas reglas o excepciones sin romper la funcionalidad base.
* Todo el flujo respeta los principios de React: estado controlado con `useState`, memorias con `useMemo`, efectos secundarios con `useEffect`, y referencias DOM con `useRef`.

#### 👉 Resultado para el Usuario

> Cuando agrego un nuevo contacto, la app me guía para seleccionar el país y me ayuda a escribir el número correctamente. Además, al ver mi lista, todos los teléfonos están bien escritos, con su bandera y código. Sé que están correctos y a qué país pertenecen.

---
###  Historia de Usuario 02: Búsqueda Rápida de Contactos desde Cualquier Parte de la App

**Como** usuario que necesita encontrar contactos con frecuencia,
**quiero** tener una barra de búsqueda accesible desde cualquier página,
**para** poder encontrar rápidamente a una persona sin tener que navegar por toda la app.


#### 👉 Criterios de Aceptación

1. **Buscador visible en todas las páginas:**

   * Quiero tener acceso a un campo de búsqueda desde la cabecera sin importar en qué parte de la aplicación me encuentre (inicio, contactos, sobre mí, etc.).

2. **Resultados en tiempo real:**

   * Mientras escribo, quiero que la app me muestre coincidencias en tiempo real, tanto por nombre como por número.

3. **Acceso directo al detalle:**

   * Si encuentro al contacto que busco, quiero poder hacer clic en él y que me lleve directamente a su ficha, sin tener que pasar por la lista completa.

4. **Diseño accesible y claro:**

   * Quiero que el buscador funcione bien en celular y computadora, que sea fácil de usar y que se cierre automáticamente cuando hago clic fuera de él.
   * Si no hay coincidencias, quiero un mensaje amable que me diga que no se encontró nada.

5. **Siempre actualizado:**

   * Espero que los datos que se buscan estén siempre actualizados con los últimos contactos cargados desde la API.

#### 👉 Justificación Técnica:

* Se creó un componente reutilizable `SearchHeader` que recibe la lista de contactos como prop y muestra resultados filtrados en tiempo real.
* Se utiliza `useState`, `useEffect`, `useRef` y `useNavigate` para manejar el estado del input, el renderizado de sugerencias y la navegación.
* Se aplicaron principios de UX modernos:

  * **Autocompletado**
  * **Acciones contextuales**
  * **Desempeño reactivo**
* El diseño es completamente responsivo, adaptado a escritorio y móvil con Tailwind CSS.
* La búsqueda es **tolerante a errores** y **case-insensitive**, permitiendo buscar por nombre parcial o número sin importar el formato.


#### 👉 Resultado para el Usuario

> Ahora puedo buscar un contacto desde cualquier página. Solo escribo su nombre o teléfono, y enseguida lo encuentro. Un clic y estoy viendo toda su información, sin pasos innecesarios.


---

###  Historia de Usuario 03: Visualización clara y confiable del estado de la app

**Como** usuario de la Agenda de Contactos
**Quiero** que la aplicación me informe claramente cuándo está cargando información o si ocurre algún error
**Para** sentir confianza en que el sistema funciona correctamente y saber qué hacer si algo falla.


#### 👉 Criterios de Aceptación

1. **Carga inicial clara y visualmente amigable:**

   * Cuando abro la app o una página dentro de ella, quiero ver una pantalla que me indique que la información se está cargando (pantalla completa de "cargando") en lugar de una pantalla en blanco.
   * Esta pantalla debe ser visualmente agradable, transmitir que todo está en marcha y desaparecer cuando se hayan cargado los datos.

2. **Interacciones individuales con retroalimentación clara:**

   * Si estoy creando, editando o eliminando un contacto, quiero saber que la app está procesando la acción (mediante animaciones tipo "skeleton" que reemplazan temporalmente la lista).
   * No quiero que la interfaz se congele o me deje preguntándome si algo se hizo o no.

3. **Manejo de errores confiable y comprensible:**

   * Si ocurre un error, quiero ver una pantalla amigable que me explique lo que pasó (por ejemplo, "No se pudo cargar la lista de contactos").
   * Quiero que el mensaje me dé una posible solución, como volver a intentar con un botón.
   * El mensaje debe estar redactado en un lenguaje que yo entienda, sin tecnicismos ni códigos crípticos.

4. **Consistencia en toda la app:**

   * Espero que todas las páginas de la app (inicio, contactos, detalle de contacto, sobre mí) manejen la carga y errores de la misma forma.
   * Si algo falla, no quiero quedarme atrapado en un estado intermedio ni ver pantallas rotas.

#### 👉 Justificación Técnica:

* Se implementó una pantalla `ErrorScreen` reutilizable, con diseño propio, imagen SVG, y estilos suaves que guían al usuario con empatía.
* Se definió una clase `FetchError` personalizada para capturar errores del `service layer` con estructura uniforme.
* El estado `loading` se controla en cada componente clave (como `ContactList`, `ContactDetailPage`, etc.) y se representa visualmente mediante:
  * Skeletons en lugar de loaders genéricos
  * Pantalla completa para la carga inicial
* El enfoque sigue el patrón **load → success → error**, reforzando la confianza del usuario con **retroalimentación constante**.
* La gestión de errores se encapsula dentro de los servicios (`try/catch`) y se comunica hacia los componentes de forma controlada para renderizar la UI adecuada.


#### 👉 Resultado para el Usuario:

> Ya no me quedo viendo una pantalla vacía o confundido cuando algo tarda. Si hay un problema, la app me lo dice con claridad y me da opciones para solucionarlo.


## 📌 Cómo ejecutar

```bash
git clone https://github.com/CattCloud/contact-manager
cd contact-manager
npm install
npm run dev
```

## URL
https://kontamanager.netlify.app
 
