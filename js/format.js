// Funciones para formato básico de texto (encabezados, negrita, itálica)

function formatHeaders(text) {
    // Convertir encabezados (h1, h2, h3, h4, h5, h6)
    let html = text;
    html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
    html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
    html = html.replace(/^##### (.+)$/gm, "<h5>$1</h5>");
    html = html.replace(/^###### (.+)$/gm, "<h6>$1</h6>");
    return html;
  }
  
  function formatEmphasis(text) {
    let html = text;
    // Convertir negrita: **texto** o __texto__ a <strong>texto</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");
    
    // Convertir itálica: *texto* o _texto_ a <em>texto</em>
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/_(.*?)_/g, "<em>$1</em>");
    
    return html;
  }
  
  function formatParagraphs(text) {
    // Convertir líneas simples a párrafos (excluyendo las ya procesadas)
    let html = text;
    html = html.replace(/^(?!<h|<ul|<ol|<li|<strong|<em|$)(.+)$/gm, "<p>$1</p>");
    
    // Agregar saltos de línea para mejor legibilidad
    html = html.replace(/<\/h(\d)>/g, "</h$1>\n");
    html = html.replace(/<\/p>/g, "</p>\n");
    
    return html;
  }