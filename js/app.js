// app.js - Funcionalidad para convertir Markdown a HTML

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const previewButtons = document.querySelectorAll('button');
    const editorArea = document.querySelector('section:first-of-type .bg-gray-100');
    const previewArea = document.querySelector('section:last-of-type .bg-white');
    
    // Agregar área de texto editable al editor
    const textArea = document.createElement('textarea');
    textArea.className = 'w-full h-full p-2 font-mono bg-gray-100 focus:outline-none';
    textArea.placeholder = 'Escribe texto en formato Markdown aquí...\n\n# Título h1\n## Título h2\n### Título h3\n\n* Elemento de lista 1\n* Elemento de lista 2\n  * Sublista 1\n  * Sublista 2\n\n1. Lista numerada 1\n2. Lista numerada 2';
    textArea.style.resize = 'none';
    textArea.style.border = 'none';
    
    // Limpiar el área del editor y agregar el textarea
    editorArea.innerHTML = '';
    editorArea.appendChild(textArea);
    
    // Función para convertir Markdown a HTML usando regex
    function convertMarkdownToHTML(markdown) {
      if (!markdown) return '';
      
      let html = markdown;
      
      // Convertir encabezados (h1, h2, h3, h4, h5, h6)
      html = html.replace(/^# (.+)$/gm, '<h1 class='text-6xl font-bold border-b'>$1</h1>');
      html = html.replace(/^## (.+)$/gm, '<h2 class='text-5xl font-bold border-b'>$1</h2>');
      html = html.replace(/^### (.+)$/gm, '<h3 class='text-4xl font-bold'>$1</h3>');
      html = html.replace(/^#### (.+)$/gm, '<h4 class='text-3xl font-bold'>$1</h4>');
      html = html.replace(/^##### (.+)$/gm, '<h5 class='text-2xl font-bold'>$1</h5>');
      html = html.replace(/^###### (.+)$/gm, '<h6 class='text-xl font-bold'>$1</h6>');
      
      // Convertir listas no ordenadas
      // Primero identificamos las líneas que comienzan con * o - y las envolvemos con <li>
      html = html.replace(/^[*-] (.+)$/gm, '<li>$1</li>');
      
      // Luego agrupamos los <li> consecutivos dentro de un <ul>
      html = html.replace(/<li>(.+?)<\/li>(\n<li>(.+?)<\/li>)*/g, '<ul>\n$&\n</ul>');
      
      // Convertir listas ordenadas
      // Identificamos las líneas que comienzan con número seguido de punto
      html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
      
      // Agrupamos los <li> consecutivos de listas ordenadas dentro de <ol>
      // Debemos asegurarnos de no mezclar con los ya convertidos a <ul>
      let olRegex = /<li>(.+?)<\/li>(\n<li>(.+?)<\/li>)*/g;
      let foundOls = [...html.matchAll(olRegex)];
      
      foundOls.forEach(match => {
        // Verificamos si este grupo de <li> no está ya dentro de un <ul>
        const matchText = match[0];
        // Si la cadena antes del match no tiene un <ul> reciente o hay un </ul> entre ellos,
        // entonces es una lista ordenada
        const matchStart = html.indexOf(matchText);
        const prevText = html.substring(0, matchStart);
        
        if (!prevText.includes('<ul>\n' + matchText.substring(0, 20)) && 
            (prevText.lastIndexOf('</ul>') > prevText.lastIndexOf('<ul>') || 
             prevText.lastIndexOf('<ul>') === -1)) {
          // Reemplazamos solo este grupo específico
          html = html.replace(matchText, '<ol>\n' + matchText + '\n</ol>');
        }
      });
      
      // Convertir párrafos (líneas que no son parte de otros elementos)
      // Buscamos líneas que no comiencen con <h o <ul o <ol o <li y que no estén vacías
      html = html.replace(/^(?!<h|<ul|<ol|<li|$)(.+)$/gm, '<p>$1</p>');
      
      // Agrupar líneas consecutivas dentro de bloques de elementos
      return html;
    }
    
    // Función para actualizar la vista previa
    function updatePreview() {
      const markdown = textArea.value;
      const html = convertMarkdownToHTML(markdown);
      previewArea.innerHTML = html;
    }
    
    // Asignar el evento de clic a ambos botones (desktop y móvil)
    previewButtons.forEach(button => {
      button.addEventListener('click', updatePreview);
    });
    
    // Opcional: Actualizar preview automáticamente al escribir
    textArea.addEventListener('input', function() {
      // Si deseas que la actualización sea automática, descomenta la siguiente línea
      // updatePreview();
    });
    
    // Inicializar con un ejemplo
    textArea.value = `# Bienvenido al Editor Markdown
  
  ## Encabezados
  ### Probando encabezados de nivel 3
  #### Y también de nivel 4
  
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
  
  Esto es un párrafo normal. Escribe aquí tu contenido en formato Markdown y haz clic en "Generar Vista Previa" para ver el resultado.`;
  });