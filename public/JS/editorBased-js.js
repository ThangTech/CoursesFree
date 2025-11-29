const DEFAULT_JS = `document.body.appendChild(button);`;

let editor;
let updateTimeout;

function initEditor() {
  const editorContainer = document.getElementById("editor");
  const previewFrame = document.getElementById("preview");

  const savedContent = localStorage.getItem("editorBasedContentJS");
  const initialContent = savedContent || DEFAULT_JS;

  editor = ace.edit(editorContainer);
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
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
    const code = editor.getValue();
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Consolas', 'Monaco', monospace;
      padding: 15px;
      background: #1e1e1e;
      color: #d4d4d4;
      font-size: 14px;
      margin: 0;
    }
    .output {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .log { color: #4EC9B0; }
    .error { color: #f48771; }
    .warn { color: #dcdcaa; }
  </style>
</head>
<body>
  <div class="output" id="output"></div>
  <script>
    const output = document.getElementById('output');
    console.log = function(...args) {
      const div = document.createElement('div');
      div.className = 'log';
      div.textContent = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      output.appendChild(div);
    };
    console.error = function(...args) {
      const div = document.createElement('div');
      div.className = 'error';
      div.textContent = '✖ ' + args.join(' ');
      output.appendChild(div);
    };
    console.warn = function(...args) {
      const div = document.createElement('div');
      div.className = 'warn';
      div.textContent = '⚠ ' + args.join(' ');
      output.appendChild(div);
    };
    try {
      ${code}
    } catch (err) {
      console.error(err.message);
    }
  </script>
</body>
</html>`;

    previewFrame.srcdoc = htmlContent;
  }

  editor.session.on("change", function () {
    clearTimeout(updateTimeout);

    updateTimeout = setTimeout(function () {
      updatePreview();

      try {
        localStorage.setItem("editorBasedContentJS", editor.getValue());
      } catch (err) {
        console.log("Cannot save to localStorage");
      }
    }, 500);
  });

  window.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      try {
        localStorage.setItem("editorBasedContentJS", editor.getValue());
        console.log("Saved!");
      } catch (err) {
        console.log("Cannot save!");
      }
    }
  });

  updatePreview();
}

if (typeof ace !== "undefined") {
  initEditor();
} else {
  window.addEventListener("load", initEditor);
}
