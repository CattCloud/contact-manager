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

### 👉 Filtro de Contactos

- Implementación de una barra de control (`ControlBar`) que permite al usuario alternar entre:
  - **Todos los contactos**
  - **Solo favoritos**
- El filtro es manejado con `useState`, y la vista se actualiza automáticamente sin duplicar datos.
- El botón activo se destaca visualmente según el filtro seleccionado.

### 👉 Tarjetas de Contacto (`ContactCard`)

- Cada contacto se renderiza como una tarjeta con:
  - Nombre
  - Teléfono
  - Relacion
  - Icono de favorito (`⭐` / `☆`)
- Las tarjetas reciben los datos y funciones a través de `props`.

### 👉 Botón de Favorito

- Cada tarjeta permite alternar el estado de favorito con un solo clic.
- El evento actualiza el estado principal (`estadoContactos`) usando una función pura con `.map()`.

### 👉 Mensaje “No hay favoritos”

- Si el usuario selecciona la vista de “Favoritos” y no existen contactos marcados, se muestra un mensaje amigable con ícono SVG.
- Esto se maneja mediante una condición ternaria y renderizado condicional reactivo.

### 👉 Contador de Favoritos

- Se muestra un contador al lado de los botones:  
  `X de Y contactos son favoritos`
- El número se recalcula automáticamente al agregar o quitar favoritos.


### 👉 Comunicación Bidireccional con Funciones como Props

- Se implementó la técnica de **pasar funciones como props** desde el componente padre (`App`) a los hijos (`ContactCard`, `ModalContact`, etc.) para habilitar la **comunicación inversa** (del hijo al padre).
- Las tarjetas y el modal no modifican el estado por sí mismos: en su lugar, disparan callbacks como `onFavorite`, `onClose`, `onSiguientContacto`, etc., que son definidos en el padre y actualizan el estado centralizado.


### 👉 Vista Detallada de Contacto Seleccionado
- Muestra la imagen, nombre, relación, teléfono y acciones en formato tarjeta.
- Cambia el layout dependiendo del tamaño de pantalla (responsive).
- Permite navegar entre contactos anteriores/siguientes desde la vista de detalle.


### 👉 Navegación Circular de Contactos

- Desde el detalle de contactos, se puede **navegar al contacto anterior o siguiente** usando botones dedicados.
- La navegación es **circular**: si se está en el último contacto y se presiona “Siguiente”, vuelve al primero.
- Esta funcionalidad también respeta el filtro activo (`todos` o `favoritos`) y solo navega entre la lista visible.

### 👉 Formulario Controlado para Agregar Contactos
- Inputs sincronizados con el estado mediante `useState`.
- Manejo de eventos `onChange` y `onSubmit` para capturar datos y procesarlos.
- Los nuevos contactos se agregan usando el operador spread para mantener la inmutabilidad.

### 👉 Validación de Datos
- Detección de campos vacíos (`nombre`, `teléfono`,`relacion`) y visualización de mensajes de error.
- Evita duplicados por nombre y número de teléfono, normalizando el texto (`trim` y `toLowerCase`).
- Los errores se muestran en tiempo real con feedback visual claro.

### 👉 Actualización Reactiva del Estado Global
- Al agregar un contacto, se actualiza la lista global y se selecciona automáticamente el nuevo contacto.
- Muestra una notificación temporal al completar la acción exitosamente.

### 👉 Campo de Búsqueda Inteligente
- Filtra por nombre, teléfono y relación en tiempo real mientras el usuario escribe.
- El texto coincidente se resalta en los resultados utilizando `highlighting` (`bg-yellow-200`, `font-semibold`).
- Mantiene compatibilidad con los filtros por favoritos.

### 👉 Búsqueda Inteligente Multicanal

- Campo de búsqueda (`SearchContactInput`) que permite filtrar contactos **por nombre, teléfono o relación** simultáneamente.
- Se actualiza en tiempo real a medida que el usuario escribe, sin necesidad de enviar formularios.
- Palabras coincidentes se resaltan en los resultados usando `highlighting` visual (`bg-yellow-200`, `font-semibold`) para mejor experiencia.

### 👉 Categorías con Etiquetas Visuales

- Cada contacto tiene un campo `relacion` que puede ser: **Familia**, **Amistad**, **Trabajo**, **Personal** u **Otro**.
- El componente `BadgeRelacion` muestra la categoría como una etiqueta de color que se adapta según el tipo.
- Mejora la lectura visual y la clasificación dentro de la interfaz.

### 👉 Persistencia con LocalStorage

- Uso de `localStorageManager` (`managerls`) para guardar la lista de contactos localmente entre sesiones.
- Al iniciar la app, se detecta si ya existen datos:  
  - Si no, se inicializa con datos precargados.
  - Si sí, se carga directamente sin perder cambios anteriores.
- Cada vez que se edita, elimina o agrega un contacto, se actualiza automáticamente el almacenamiento local.

### 👉 Modo Edición con Formulario Controlado

- Al presionar “Editar”, se abre el componente `ModalView` con el formulario (`ContactForm`) pre-poblado con los datos del contacto.
- Validaciones activas en tiempo real (nombre, teléfono, relación, formato de correo).
- Los errores se muestran debajo de cada campo con íconos visuales (`SVG` + texto).
- Al guardar, se actualiza el contacto en la lista sin duplicaciones ni recargas.

### 👉 Despliegue en Netlify

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

👉 Diseño Responsive Adaptativo
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

## URL
https://kontamanager.netlify.app/
![Uploading image.png…]()
 
