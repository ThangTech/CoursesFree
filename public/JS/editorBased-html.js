// Default HTML template
const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Live Preview</title>
    <style>
      /* Add your CSS here */
    </style>
  </head>
  <body>
    <h1>Hello from Monaco HTML Editor</h1>
    <p>Edit this HTML and see the preview update live.</p>
    <script>
      console.log('Preview loaded');
    </script>
  </body>
</html>`;

// Configure Monaco Editor CDN path
require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs",
  },
});

require(["vs/editor/editor.main"], function () {
  
  // Get HTML elements
  const editorContainer = document.getElementById("editor");
  const previewFrame = document.getElementById("preview");
  
  const savedContent = localStorage.getItem("editorBasedContent");
  const initialContent = savedContent || DEFAULT_HTML;

  const editor = monaco.editor.create(editorContainer, {
    value: initialContent,
    language: "html",
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14,
  });

  // Function to update preview iframe
  function updatePreview() {
    const htmlCode = editor.getValue();
    previewFrame.srcdoc = htmlCode;
  }
  let updateTimeout;

  // Listen for content changes
  editor.onDidChangeModelContent(function () {
    // Clear previous timeout
    clearTimeout(updateTimeout);
    
    updateTimeout = setTimeout(function () {
      updatePreview();
      
      // Save to localStorage
      try {
        localStorage.setItem("editorBasedContent", editor.getValue());
      } catch (err) {
        console.log("Cannot save to localStorage");
      }
    }, 300);
  });

  window.addEventListener("keydown", function (e) {
    const isMac = navigator.platform.toUpperCase().includes("MAC");
    const modKey = isMac ? e.metaKey : e.ctrlKey;
    
    if (modKey && e.key.toLowerCase() === "s") {
      e.preventDefault(); // Prevent browser's save dialog
      try {
        localStorage.setItem("editorBasedContent", editor.getValue());
        
        // Show green flash effect on save
        const originalShadow = previewFrame.style.boxShadow;
        previewFrame.style.boxShadow = "0 0 8px rgba(0,200,0,0.7)";
        setTimeout(function () {
          previewFrame.style.boxShadow = originalShadow;
        }, 300);
        
      } catch (err) {
        console.log("Cannot save");
      }
    }
  });

  monaco.languages.registerCompletionItemProvider("css", {
    provideCompletionItems: function () {
      const suggestions = [
        {
          label: "display: flex",
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: "display: flex;",
          detail: "Create flex container",
        },
        {
          label: "justify-content: center",
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: "justify-content: center;",
          detail: "Center horizontally",
        },
        {
          label: "align-items: center",
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: "align-items: center;",
          detail: "Center vertically",
        },
        {
          label: "margin: auto",
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: "margin: auto;",
          detail: "Auto margin",
        },
        {
          label: "padding: 1rem",
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: "padding: 1rem;",
          detail: "Add padding",
        },
        {
          label: "border-radius: 8px",
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: "border-radius: 8px;",
          detail: "Round corners",
        },
        {
          label: "@media (max-width: 600px)",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "@media (max-width: 600px) {\n\t\n}",
          detail: "Mobile media query",
        },
      ];
      
      return { suggestions: suggestions };
    },
  });

  updatePreview();
  window.editorBased = {
    editor: editor,
    updatePreview: updatePreview,
    save: function () {
      try {
        localStorage.setItem("editorBasedContent", editor.getValue());
        return true;
      } catch (e) {
        return false;
      }
    },
    load: function () {
      const code = localStorage.getItem("editorBasedContent");
      if (code) {
        editor.setValue(code);
      }
    },
    clear: function () {
      localStorage.removeItem("editorBasedContent");
      editor.setValue(DEFAULT_HTML);
    },
  };
});