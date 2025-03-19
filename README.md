# markdown-editor

# Desarrollo de mi Editor Markdown con Vista Previa

## Índice
- [Layout Responsivo](#layout-responsivo)
- [Conversor de Markdown a HTML](#conversor-de-markdown-a-html)
- [Funcionalidades Avanzadas](#funcionalidades-avanzadas)
  - [Contraste de Encabezados](#contraste-de-encabezados)
  - [Contador de Palabras y Caracteres](#contador-de-palabras-y-caracteres)
- [Estructura del Código](#estructura-del-código)
- [Aspectos Técnicos Destacables](#aspectos-técnicos-destacables)

## Layout Responsivo

Implementé una interfaz de usuario responsiva que se adapta a diferentes dispositivos:

- **En dispositivos de escritorio**: La barra de herramientas se ubica en la parte superior, y el editor y vista previa se muestran lado a lado (mitad y mitad).
- **En dispositivos móviles**: La barra de herramientas se mueve a la parte inferior, mientras que el editor y la vista previa se apilan verticalmente.

Características principales:
- Barras de herramientas fijas en ambas versiones
- Diseño fluido que aprovecha el espacio disponible
- Scroll independiente para cada panel
- Implementación con Tailwind CSS para manejo de responsividad

## Conversor de Markdown a HTML

Desarrollé un sistema de conversión que transforma texto en formato Markdown a HTML utilizando exclusivamente expresiones regulares y el método `.replace()`:

1. **Encabezados**: Transformación de `# Título` a `<h1>Título</h1>` (para H1-H6)
2. **Listas no ordenadas**: Transformación de líneas que comienzan con `*` o `-`
3. **Listas ordenadas**: Transformación de líneas que comienzan con números (`1.`, `2.`, etc.)
4. **Texto en negrita**: Conversión de `**texto**` o `__texto__` a `<strong>texto</strong>`
5. **Texto en itálica**: Conversión de `*texto*` o `_texto_` a `<em>texto</em>`
6. **Párrafos**: Conversión de líneas normales a elementos `<p>`

## Funcionalidades Avanzadas

### Contraste de Encabezados

Añadí un botón "Contrastar Encabezados" que:
- Selecciona todos los encabezados en la vista previa usando `querySelectorAll()`
- Aplica estilos específicos para cada nivel de encabezado (color, tamaño, bordes)
- Funciona como toggle: al hacer clic nuevamente, elimina los estilos aplicados
- Cambia visualmente para indicar el estado actual (activo/inactivo)

### Contador de Palabras y Caracteres

Incorporé un contador dinámico que:
- Muestra el número actual de palabras y caracteres
- Se actualiza en tiempo real mientras escribo
- Funciona mediante el evento `input` del textarea

## Estructura del Código

Organicé mi proyecto en:

1. **HTML**: Define la estructura responsiva y los elementos de la interfaz
2. **JavaScript**: Implementa:
   - Conversión de Markdown a HTML
   - Manipulación del DOM para la vista previa
   - Aplicación dinámica de estilos
   - Lógica para eventos de usuario

## Aspectos Técnicos Destacables

- **Uso exclusivo de regex**: Toda la transformación Markdown-HTML se realiza mediante expresiones regulares
- **JavaScript puro**: No utilicé bibliotecas adicionales para el procesamiento
- **Diseño responsive**: Adaptación completa a diferentes tamaños de pantalla
- **Manipulación dinámica del DOM**: Para aplicar y remover estilos de forma programática

Este proyecto demuestra mi implementación de un editor Markdown completo utilizando tecnologías web estándar, sin dependencias externas para el procesamiento de texto.