// editorBased-python.js
const DEFAULT_PYTHON = `print("🎉 Hello from Python!")\n\n# Variables\nname = "World"\nage = 25\nprint(f"My name is {name} and I\'m {age} years old")\n`;

let pyodide = null;
let pyodideReady = false;
let editor;
let updateTimeout;

async function initPyodide() {
  try {
    if (typeof loadPyodide === "undefined") {
      throw new Error("Pyodide script chưa được load");
    }
    pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
    });
    await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
    `);
    pyodideReady = true;
    return true;
  } catch (err) {
    console.error("Failed to load Pyodide:", err);
    return false;
  }
}

function initEditor() {
  const editorContainer = document.getElementById("editor");
  const previewFrame = document.getElementById("preview");

  // Lấy nội dung đã lưu hoặc dùng mặc định
  const savedContent = localStorage.getItem("editorBasedContentPython");
  const initialContent = savedContent || DEFAULT_PYTHON;

  // Tạo Ace Editor
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
        "Python chưa sẵn sàng, vui lòng đợi...",
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
        updatePreviewWithMessage("Lỗi:\n\n" + stderr, "#f48771");
      } else if (stdout) {
        updatePreviewWithMessage("Output:\n\n" + stdout, "white");
      } else {
        updatePreviewWithMessage(
          "Code chạy thành công (không có output)",
          "white"
        );
      }
    } catch (err) {
      updatePreviewWithMessage("Lỗi:\n\n" + err.message, "#f48771");
    }
  }

  function updatePreviewWithMessage(message, color = "white") {
    const escapedMessage = message
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
    previewFrame.srcdoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Consolas', 'Courier New', monospace; 
      padding: 20px; 
      background: #1e1e1e; 
      color: ${color}; 
      margin: 0;
      line-height: 1.6;
    }
    pre { 
      white-space: pre-wrap; 
      word-wrap: break-word; 
      margin: 0;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <pre>${escapedMessage}</pre>
</body>
</html>`;
  }

  // Lắng nghe sự thay đổi nội dung
  editor.session.on("change", function () {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(function () {
      updatePreview();
      try {
        localStorage.setItem("editorBasedContentPython", editor.getValue());
      } catch (err) {
        console.log("Không thể lưu vào localStorage");
      }
    }, 300);
  });

  // Phím tắt Ctrl/Cmd + S
  window.addEventListener("keydown", function (e) {
    const isMac = navigator.platform.toUpperCase().includes("MAC");
    const modKey = isMac ? e.metaKey : e.ctrlKey;
    if (modKey && e.key.toLowerCase() === "s") {
      e.preventDefault();
      try {
        localStorage.setItem("editorBasedContentPython", editor.getValue());
        const originalShadow = previewFrame.style.boxShadow;
        previewFrame.style.boxShadow = "0 0 8px rgba(0,200,0,0.7)";
        setTimeout(function () {
          previewFrame.style.boxShadow = originalShadow;
        }, 300);
        if (pyodideReady) {
          updatePreview();
        }
      } catch (err) {
        console.log("Không thể lưu");
      }
    }
  });

  // Khởi chạy preview lần đầu
  updatePreviewWithMessage(
    "Đang tải Python interpreter...\nVui lòng đợi 5-10 giây...",
    "white"
  );
  initPyodide().then((loaded) => {
    if (loaded) {
      updatePreviewWithMessage(
        "Python đã sẵn sàng!\n\nNhập code và:\n- Đợi 1 giây → tự động chạy\n- Hoặc nhấn Ctrl+S để chạy ngay",
        "white"
      );
      setTimeout(() => updatePreview(), 500);
    } else {
      updatePreviewWithMessage(
        "Không thể tải Python interpreter\n\nVui lòng:\n1. Kiểm tra kết nối internet\n2. Refresh lại trang\n3. Thử browser khác",
        "#f48771"
      );
    }
  });

  window.editorBased = {
    editor,
    updatePreview,
    save: function () {
      try {
        localStorage.setItem("editorBasedContentPython", editor.getValue());
        return true;
      } catch (e) {
        return false;
      }
    },
    load: function () {
      const code = localStorage.getItem("editorBasedContentPython");
      if (code) {
        editor.setValue(code, -1);
      }
    },
    clear: function () {
      localStorage.removeItem("editorBasedContentPython");
      editor.setValue(DEFAULT_PYTHON, -1);
    },
  };
}

// Đợi Ace Editor load
if (typeof ace !== "undefined") {
  initEditor();
} else {
  window.addEventListener("load", initEditor);
}
