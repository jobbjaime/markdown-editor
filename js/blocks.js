// Funciones para resaltado de bloques de código

function formatCodeBlocks(text) {
    let html = text;
    
    // Detectar bloques de código con triple backtick ```
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, function(match, language, code) {
      const formattedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<pre><code class="language-${language}">${formattedCode}</code></pre>`;
    });
    
    // Detectar código en línea con backtick simple `code`
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    return html;
  }