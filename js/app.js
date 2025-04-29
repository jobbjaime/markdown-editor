document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const previewButtons = document.querySelectorAll("[id^='preview-btn']");
  const contrastButtons = document.querySelectorAll("[id^='contrast-btn']");
  const editorArea = document.getElementById("editor-area");
  const previewArea = document.getElementById("preview-area");
  const counterElement = document.getElementById("counter");
  
  // Estado para el toggle de contraste
  let contrastActive = false;

  // Agregar área de texto editable al editor
  const textArea = document.createElement("textarea");
  textArea.className = "w-full h-full p-2 font-mono bg-gray-100 focus:outline-none";
  textArea.placeholder = "Escribe texto en formato Markdown aquí...";
  textArea.style.resize = "none";
  textArea.style.border = "none";

  // Limpiar el área del editor y agregar el textarea
  editorArea.innerHTML = "";
  editorArea.appendChild(textArea);

  // Función para actualizar el contador de palabras y caracteres
  function updateCounter() {
    const text = textArea.value;
    const charCount = text.length;
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    counterElement.textContent = `${wordCount} palabras, ${charCount} caracteres`;
  }

  // Función para convertir Markdown a HTML usando funciones de los otros módulos
  function convertMarkdownToHTML(markdown) {
    if (!markdown) return "";

    let html = markdown;

    // Aplicar formato básico de texto (de format.js)
    html = formatEmphasis(html);
    html = formatHeaders(html);
    
    // Aplicar formato de listas (de lists.js)
    html = formatUnorderedLists(html);
    html = formatOrderedLists(html);
    
    // Aplicar formato de bloques de código (de blocks.js)
    html = formatCodeBlocks(html);
    
    // Formatear párrafos (de format.js)
    html = formatParagraphs(html);

    return html;
  }

  // Función para actualizar la vista previa
  function updatePreview() {
    const markdown = textArea.value;
    const html = convertMarkdownToHTML(markdown);
    previewArea.innerHTML = html;
    
    // Si el contraste está activo, aplicarlo de nuevo
    if (contrastActive) {
      applyHeadingContrast();
    }
  }
  
  // Función para aplicar contraste a los encabezados
  function applyHeadingContrast() {
    // Seleccionar todos los encabezados en el área de preview
    const headings = previewArea.querySelectorAll("h1, h2, h3, h4, h5, h6");
    
    headings.forEach(heading => {
      // Asignar color según el tipo de encabezado
      switch(heading.tagName.toLowerCase()) {
        case 'h1':
          heading.style.color = '#FF5733'; // Naranja-rojizo
          heading.style.fontSize = '2.5em';
          heading.style.borderBottom = '2px solid #FF5733';
          break;
        case 'h2':
          heading.style.color = '#8E44AD'; // Púrpura
          heading.style.fontSize = '2.2em';
          heading.style.borderBottom = '1px solid #8E44AD';
          break;
        case 'h3':
          heading.style.color = '#2E86C1'; // Azul
          heading.style.fontSize = '1.9em';
          break;
        case 'h4':
          heading.style.color = '#28B463'; // Verde
          heading.style.fontSize = '1.6em';
          break;
        case 'h5':
          heading.style.color = '#D35400'; // Naranja
          heading.style.fontSize = '1.3em';
          break;
        case 'h6':
          heading.style.color = '#17202A'; // Negro azulado
          heading.style.fontSize = '1.1em';
          break;
      }
      
      heading.style.fontWeight = '700';
      heading.style.padding = '5px 0';
      heading.style.marginTop = '10px';
      heading.style.marginBottom = '5px';
    });
  }
  
  // Función para remover el contraste de los encabezados
  function removeHeadingContrast() {
    const headings = previewArea.querySelectorAll("h1, h2, h3, h4, h5, h6");
    
    headings.forEach(heading => {
      heading.style.color = '';
      heading.style.fontSize = '';
      heading.style.fontWeight = '';
      heading.style.padding = '';
      heading.style.margin = '';
      heading.style.borderBottom = '';
    });
  }
  
  // Función toggle para el contraste de encabezados
  function toggleHeadingContrast() {
    contrastActive = !contrastActive;
    
    if (contrastActive) {
      applyHeadingContrast();
      // Cambiar color de los botones de contraste para indicar que está activo
      contrastButtons.forEach(btn => {
        btn.classList.remove('bg-purple-500', 'hover:bg-purple-700');
        btn.classList.add('bg-green-500', 'hover:bg-green-700');
        btn.textContent = 'Quitar Contraste';
      });
    } else {
      removeHeadingContrast();
      // Revertir color de los botones
      contrastButtons.forEach(btn => {
        btn.classList.remove('bg-green-500', 'hover:bg-green-700');
        btn.classList.add('bg-purple-500', 'hover:bg-purple-700');
        btn.textContent = 'Contrastar Encabezados';
      });
    }
  }

  // Asignar el evento de clic a los botones de preview
  previewButtons.forEach((button) => {
    button.addEventListener("click", updatePreview);
  });
  
  // Asignar el evento de clic a los botones de contraste
  contrastButtons.forEach((button) => {
    button.addEventListener("click", toggleHeadingContrast);
  });
  
  // Actualizar contador al escribir
  textArea.addEventListener('input', function() {
    updateCounter();
    // Si quieres que la vista previa se actualice en tiempo real, descomenta:
    updatePreview();
  });

  // Inicializar con un ejemplo
  textArea.value = `# Bienvenido al Editor Markdown

## Encabezados
### Probando encabezados de nivel 3
#### Y también de nivel 4

## Formato de texto
Puedes usar **negrita** o __negrita alternativa__
También *itálica* o _itálica alternativa_
Incluso ***negrita e itálica*** combinadas

## Listas no ordenadas
* Ítem uno
* Ítem dos
* Ítem tres
* Sub-ítem 1
* Sub-ítem 2

## Listas ordenadas
1. Primer paso
2. Segundo paso
3. Tercer paso

## Bloques de código
\`\`\`javascript
function saludar() {
  console.log("Hola mundo!");
}
\`\`\`

Código en línea: \`const x = 42;\`

Esto es un párrafo normal. Escribe aquí tu contenido en formato Markdown y haz clic en "Generar Vista Previa" para ver el resultado.`;
  
  // Inicializar contador
  updateCounter();
});