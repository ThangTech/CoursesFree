// Default HTML template
const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Live Preview</title>
    <style>
      /* Add your CSS here */
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <h1>Hello from Ace HTML Editor</h1>
    <p>Edit this HTML and see the preview update live.</p>
    <script>
      console.log('Preview loaded');
    </script>
  </body>
</html>`;

let editor;
let updateTimeout;

// Khởi tạo Ace Editor
function initEditor() {
  const editorContainer = document.getElementById("editor");
  const previewFrame = document.getElementById("preview");

  // Lấy nội dung đã lưu hoặc dùng mặc định
  const savedContent = localStorage.getItem("editorBasedContent");
  const initialContent = savedContent || DEFAULT_HTML;

  // Tạo Ace Editor
  editor = ace.edit(editorContainer);
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/html");
  editor.setOptions({
    fontSize: "14px",
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showPrintMargin: false,
    wrap: true,
  });

  editor.setValue(initialContent, -1);

  function updatePreview() {
    const htmlCode = editor.getValue();
    previewFrame.srcdoc = htmlCode;
  }

  // Listen for content changes
  editor.session.on("change", function () {
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

  // Ctrl/Cmd + S để save
  window.addEventListener("keydown", function (e) {
    const isMac = navigator.platform.toUpperCase().includes("MAC");
    const modKey = isMac ? e.metaKey : e.ctrlKey;

    if (modKey && e.key.toLowerCase() === "s") {
      e.preventDefault();
      try {
        localStorage.setItem("editorBasedContent", editor.getValue());

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

  // Khởi chạy preview lần đầu
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
        editor.setValue(code, -1);
      }
    },
    clear: function () {
      localStorage.removeItem("editorBasedContent");
      editor.setValue(DEFAULT_HTML, -1);
    },
  };
}

// Đợi Ace Editor load xong
if (typeof ace !== "undefined") {
  initEditor();
} else {
  window.addEventListener("load", initEditor);
}
