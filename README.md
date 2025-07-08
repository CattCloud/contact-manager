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
  - Correo
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

### Modal de Detalles del Contacto

- Al hacer clic sobre una tarjeta, se abre un **modal con el detalle completo del contacto**.
- El modal se controla desde el componente padre mediante un estado booleano (`isOpen`) y un estado con el contacto seleccionado.
- Se utiliza renderizado condicional para evitar errores al cargar datos vacíos.

### Navegación Circular de Contactos

- Desde el modal, se puede **navegar al contacto anterior o siguiente** usando botones dedicados.
- La navegación es **circular**: si se está en el último contacto y se presiona “Siguiente”, vuelve al primero.
- Esta funcionalidad también respeta el filtro activo (`todos` o `favoritos`) y solo navega entre la lista visible.

