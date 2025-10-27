const DEFAULT_PYTHON = `print("🎉 Hello from Python!")

# Variables
name = "World"
age = 25
print(f"My name is {name} and I'm {age} years old")
`;

let pyodide = null;
let pyodideReady = false;

require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs",
  },
});

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

require(["vs/editor/editor.main"], async function () {
  const editorContainer = document.getElementById("editor");
  const previewFrame = document.getElementById("preview");

  const editor = monaco.editor.create(editorContainer, {
    value: DEFAULT_PYTHON,
    language: "python",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14,
  });

  updatePreviewWithMessage(
    "⏳ Đang tải Python interpreter...\nVui lòng đợi 5-10 giây...",
    "white"
  );

  const pyodideLoaded = await initPyodide();

  if (pyodideLoaded) {
    updatePreviewWithMessage(
      "✅ Python đã sẵn sàng!\n\nNhập code và:\n- Đợi 1 giây → tự động chạy\n- Hoặc nhấn Ctrl+S để chạy ngay",
      "white"
    );
    setTimeout(() => updatePreview(), 500);
  } else {
    updatePreviewWithMessage(
      "❌ Không thể tải Python interpreter\n\nVui lòng:\n1. Kiểm tra kết nối internet\n2. Refresh lại trang\n3. Thử browser khác",
      "#f48771"
    );
  }

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

      // Run user code
      await pyodide.runPythonAsync(code);

      // Get output
      const stdout = await pyodide.runPythonAsync("sys.stdout.getvalue()");
      const stderr = await pyodide.runPythonAsync("sys.stderr.getvalue()");

      if (stderr) {
        updatePreviewWithMessage("❌ Lỗi:\n\n" + stderr, "#f48771");
      } else if (stdout) {
        updatePreviewWithMessage("✅ Output:\n\n" + stdout, "white");
      } else {
        updatePreviewWithMessage(
          "✅ Code chạy thành công (không có output)",
          "white"
        );
      }
    } catch (err) {
      updatePreviewWithMessage("❌ Lỗi:\n\n" + err.message, "#f48771");
    }
  }
  function updatePreviewWithMessage(message, color = "#white") {
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

  let timeout;
  editor.onDidChangeModelContent(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (pyodideReady) {
        updatePreview();
      }
    }, 1000); 
  });

  window.addEventListener("keydown", (e) => {
    const mod = navigator.platform.includes("Mac") ? e.metaKey : e.ctrlKey;
    if (mod && e.key === "s") {
      e.preventDefault();
      if (pyodideReady) {
        updatePreview();
        // Visual feedback
        const orig = previewFrame.style.boxShadow;
        previewFrame.style.boxShadow = "0 0 8px rgba(0,200,0,0.7)";
        setTimeout(() => (previewFrame.style.boxShadow = orig), 300);
      } else {
        updatePreviewWithMessage(
          "⏳ Python chưa sẵn sàng, vui lòng đợi...",
          "#4EC9B0"
        );
      }
    }
  });

  // Ctrl+Enter to run
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
    if (pyodideReady) {
      updatePreview();
    }
  });

  // --- Auto-completion for Python ---
  monaco.languages.registerCompletionItemProvider("python", {
    provideCompletionItems: () => ({
      suggestions: [
        {
          label: "print",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "print(${1:value})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "def",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "def ${1:name}(${2:params}):\n    ${3:pass}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "if",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "if ${1:condition}:\n    ${2:pass}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "elif",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "elif ${1:condition}:\n    ${2:pass}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "else",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "else:\n    ${1:pass}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "for",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "for ${1:item} in ${2:items}:\n    ${3:pass}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "while",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "while ${1:condition}:\n    ${2:pass}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "class",
          kind: monaco.languages.CompletionItemKind.Class,
          insertText:
            "class ${1:Name}:\n    def __init__(self):\n        ${2:pass}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "try",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText:
            "try:\n    ${1:pass}\nexcept ${2:Exception} as ${3:e}:\n    ${4:pass}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "import",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "import ${1:module}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "from",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "from ${1:module} import ${2:name}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "lambda",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "lambda ${1:x}: ${2:x}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "with",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "with ${1:expression} as ${2:variable}:\n    ${3:pass}",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
      ],
    }),
  });

  window.editorBased = {
    editor,
    updatePreview,
    getPyodide: () => pyodide,
    isReady: () => pyodideReady,
  };
});
