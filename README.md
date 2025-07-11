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

### Filtro de Contactos

- Implementación de una barra de control (`ControlBar`) que permite al usuario alternar entre:
  - **Todos los contactos**
  - **Solo favoritos**
- El filtro es manejado con `useState`, y la vista se actualiza automáticamente sin duplicar datos.
- El botón activo se destaca visualmente según el filtro seleccionado.

### Tarjetas de Contacto (`ContactCard`)

- Cada contacto se renderiza como una tarjeta con:
  - Nombre
  - Teléfono
  - Relacion
  - Icono de favorito (`⭐` / `☆`)
- Las tarjetas reciben los datos y funciones a través de `props`.

### Botón de Favorito

- Cada tarjeta permite alternar el estado de favorito con un solo clic.
- El evento actualiza el estado principal (`estadoContactos`) usando una función pura con `.map()`.

### Mensaje “No hay favoritos”

- Si el usuario selecciona la vista de “Favoritos” y no existen contactos marcados, se muestra un mensaje amigable con ícono SVG.
- Esto se maneja mediante una condición ternaria y renderizado condicional reactivo.

### Contador de Favoritos

- Se muestra un contador al lado de los botones:  
  `X de Y contactos son favoritos`
- El número se recalcula automáticamente al agregar o quitar favoritos.


### Comunicación Bidireccional con Funciones como Props

- Se implementó la técnica de **pasar funciones como props** desde el componente padre (`App`) a los hijos (`ContactCard`, `ModalContact`, etc.) para habilitar la **comunicación inversa** (del hijo al padre).
- Las tarjetas y el modal no modifican el estado por sí mismos: en su lugar, disparan callbacks como `onFavorite`, `onClose`, `onSiguientContacto`, etc., que son definidos en el padre y actualizan el estado centralizado.


### 📇 Vista Detallada de Contacto Seleccionado
- Muestra la imagen, nombre, relación, teléfono y acciones en formato tarjeta.
- Cambia el layout dependiendo del tamaño de pantalla (responsive).
- Permite navegar entre contactos anteriores/siguientes desde la vista de detalle.


### Navegación Circular de Contactos

- Desde el detalle de contactos, se puede **navegar al contacto anterior o siguiente** usando botones dedicados.
- La navegación es **circular**: si se está en el último contacto y se presiona “Siguiente”, vuelve al primero.
- Esta funcionalidad también respeta el filtro activo (`todos` o `favoritos`) y solo navega entre la lista visible.

### Formulario Controlado para Agregar Contactos
- Inputs sincronizados con el estado mediante `useState`.
- Manejo de eventos `onChange` y `onSubmit` para capturar datos y procesarlos.
- Los nuevos contactos se agregan usando el operador spread para mantener la inmutabilidad.

### Validación de Datos
- Detección de campos vacíos (`nombre`, `teléfono`,`relacion`) y visualización de mensajes de error.
- Evita duplicados por nombre y número de teléfono, normalizando el texto (`trim` y `toLowerCase`).
- Los errores se muestran en tiempo real con feedback visual claro.

### Actualización Reactiva del Estado Global
- Al agregar un contacto, se actualiza la lista global y se selecciona automáticamente el nuevo contacto.
- Muestra una notificación temporal al completar la acción exitosamente.

### Campo de Búsqueda Inteligente
- Filtra por nombre, teléfono y relación en tiempo real mientras el usuario escribe.
- El texto coincidente se resalta en los resultados utilizando `highlighting` (`bg-yellow-200`, `font-semibold`).
- Mantiene compatibilidad con los filtros por favoritos.


## Tecnologías y Librerías Utilizadas

- ⚛️ React (Hooks: `useState`, `useEffect`)
- 💨 TailwindCSS para estilos responsivos y visuales
- ⚡ Vite como entorno de desarrollo
- 🧩 Notyf para notificaciones interactivas
- 🤖 GitHub como repositorio



## 📌 Cómo ejecutar

```bash
git clone [https://github.com/tu-usuario/contact-manager.git](https://github.com/CattCloud/contact-manager)
cd contact-manager
npm install
npm run dev
