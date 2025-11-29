const DEFAULT_PYTHON = `print("Hello World")`;

let editor;
let updateTimeout;
let pyodide = null;
let pyodideReady = false;

async function initPyodide() {
  try {
    updatePreviewWithMessage("⏳ Đang tải Python...", "white");

    pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
    });

    await pyodide.loadPackage(["numpy", "matplotlib"]);

    await pyodide.runPythonAsync(`
      import sys
      from io import StringIO
      sys.stdout = StringIO()
      sys.stderr = StringIO()
    `);

    pyodideReady = true;
    updatePreviewWithMessage(
      "✓ Python đã sẵn sàng!\nHãy viết code và nhấn Run",
      "#4EC9B0"
    );
  } catch (err) {
    updatePreviewWithMessage(
      "✗ Lỗi khi tải Python:\n" + err.message,
      "#f48771"
    );
  }
}

function initEditor() {
  const editorContainer = document.getElementById("editor");
  const previewFrame = document.getElementById("preview");

  const savedContent = localStorage.getItem("editorBasedContentPython");
  const initialContent = savedContent || DEFAULT_PYTHON;

  editor = ace.edit(editorContainer);
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/python");
  editor.setOptions({
    fontSize: "14px",
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showPrintMargin: false,
    wrap: true,
  });

  editor.setValue(initialContent, -1);

  async function updatePreview() {
    if (!pyodideReady) {
      updatePreviewWithMessage(
        "⏳ Python chưa sẵn sàng, vui lòng đợi...",
        "white"
      );
      return;
    }
    const code = editor.getValue();
    try {
      await pyodide.runPythonAsync(`
      sys.stdout = StringIO()
      sys.stderr = StringIO()
      `);
      await pyodide.runPythonAsync(code);
      const stdout = await pyodide.runPythonAsync("sys.stdout.getvalue()");
      const stderr = await pyodide.runPythonAsync("sys.stderr.getvalue()");
      if (stderr) {
        updatePreviewWithMessage("✗ Lỗi:\n\n" + stderr, "#f48771");
      } else if (stdout) {
        updatePreviewWithMessage("Output:\n\n" + stdout, "white");
      } else {
        updatePreviewWithMessage(
          "✓ Code chạy thành công (không có output)",
          "white"
        );
      }
    } catch (err) {
      updatePreviewWithMessage("✗ Lỗi:\n\n" + err.message, "#f48771");
    }
  }

  function updatePreviewWithMessage(message, color = "white") {
    const escapedMessage = message
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

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
      color: ${color};
      font-size: 14px;
      margin: 0;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  </style>
</head>
<body>${escapedMessage}</body>
</html>`;

    previewFrame.srcdoc = htmlContent;
  }

  editor.session.on("change", function () {
    clearTimeout(updateTimeout);

    updateTimeout = setTimeout(function () {
      try {
        localStorage.setItem("editorBasedContentPython", editor.getValue());
      } catch (err) {
        console.log("Cannot save to localStorage");
      }
    }, 300);
  });

  window.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      updatePreview();
    }
  });

  window.editorBased = {
    editor: editor,
    run: updatePreview,
    clear: function () {
      localStorage.removeItem("editorBasedContentPython");
      editor.setValue(DEFAULT_PYTHON, -1);
    },
  };
}

if (typeof ace !== "undefined") {
  initEditor();
  initPyodide();
} else {
  window.addEventListener("load", () => {
    initEditor();
    initPyodide();
  });
}
