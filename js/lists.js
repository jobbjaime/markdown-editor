// Funciones para transformar listas Markdown en HTML

function formatUnorderedLists(text) {
    let html = text;
    // Identificar bloques de lista no ordenada
    const ulBlocks = html.match(/(?:^[*-] .+$\n?)+/gm);
    if (ulBlocks) {
      ulBlocks.forEach((block) => {
        // Convertir cada línea de la lista a elemento <li>
        const listItems = block.replace(/^[*-] (.+)$/gm, "<li>$1</li>");
        // Envolver en <ul>
        const ulBlock = `<ul>\n${listItems}\n</ul>`;
        // Reemplazar el bloque original
        html = html.replace(block, ulBlock);
      });
    }
    return html;
  }
  
  function formatOrderedLists(text) {
    let html = text;
    // Identificar bloques de lista ordenada
    const olBlocks = html.match(/(?:^\d+\. .+$\n?)+/gm);
    if (olBlocks) {
      olBlocks.forEach((block) => {
        // Convertir cada línea de la lista a elemento <li>
        const listItems = block.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");
        // Envolver en <ol>
        const olBlock = `<ol>\n${listItems}\n</ol>`;
        // Reemplazar el bloque original
        html = html.replace(block, olBlock);
      });
    }
    
    // Agregar saltos de línea para mejor legibilidad
    html = html.replace(/<\/ul>/g, "</ul>\n");
    html = html.replace(/<\/ol>/g, "</ol>\n");
    
    return html;
  }