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
  
     
## Screenshots de la aplicación

### Interfaz principal
<img width="1365" height="643" alt="image" src="https://github.com/user-attachments/assets/d0e62c61-4b49-4ab2-a4c2-522725c8b0a3" />

### Modal Nuevo Contacto
<img width="1365" height="645" alt="image" src="https://github.com/user-attachments/assets/c699b6f5-2940-46e9-8550-6dac242faeb4" />

### Modal Editar Contacto
<img width="1365" height="645" alt="image" src="https://github.com/user-attachments/assets/5a605d72-11be-4da6-a02c-ee2174834bd8" />


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


## 📌 Cómo ejecutar

```bash
git clone https://github.com/CattCloud/contact-manager
cd contact-manager
npm install
npm run dev
```

## URL
https://kontamanager.netlify.app
 
