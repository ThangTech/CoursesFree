// editorBased-js.js
const DEFAULT_JS = `// Viết JavaScript code của bạn ở đây\n// Console.log sẽ hiển thị ở bên phải\n\nconsole.log("Xin chào từ JS Editor!");\n\n// Ví dụ: Tạo các phần tử HTML\nconst heading = document.createElement('h1');\nheading.textContent = 'Hello World!';\nheading.style.color = '#4CAF50';\ndocument.body.appendChild(heading);\n\nconst paragraph = document.createElement('p');\nparagraph.textContent = 'Đây là một đoạn văn được tạo bằng JavaScript.';\ndocument.body.appendChild(paragraph);\n\n// Ví dụ: Tạo button\nconst button = document.createElement('button');\nbutton.textContent = 'Click me!';\nbutton.style.padding = '10px 20px';\nbutton.style.margin = '10px 0';\nbutton.style.cursor = 'pointer';\nbutton.onclick = function() {\n  alert('Button được click!');\n};\ndocument.body.appendChild(button);`;

let editor;
let updateTimeout;

function initEditor() {
  const editorContainer = document.getElementById("editor");
  const previewFrame = document.getElementById("preview");

  // Lấy nội dung đã lưu hoặc dùng mặc định
  const savedContent = localStorage.getItem("editorBasedContentJS");
  const initialContent = savedContent || DEFAULT_JS;

  // Tạo Ace Editor
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
    } catch (error) {
      console.error(error.message);
    }
  </script>
</body>
</html>
    `;
    previewFrame.srcdoc = htmlContent;
  }

  // Lắng nghe sự thay đổi nội dung
  editor.session.on("change", function () {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(function () {
      updatePreview();
      try {
        localStorage.setItem("editorBasedContentJS", editor.getValue());
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
        localStorage.setItem("editorBasedContentJS", editor.getValue());
        const originalShadow = previewFrame.style.boxShadow;
        previewFrame.style.boxShadow = "0 0 8px rgba(0,200,0,0.7)";
        setTimeout(function () {
          previewFrame.style.boxShadow = originalShadow;
        }, 300);
        updatePreview();
      } catch (err) {
        console.log("Không thể lưu");
      }
    }
  });

  // Khởi chạy preview lần đầu
  updatePreview();

  window.editorBased = {
    editor,
    updatePreview,
    save: function () {
      try {
        localStorage.setItem("editorBasedContentJS", editor.getValue());
        return true;
      } catch (e) {
        return false;
      }
    },
    load: function () {
      const code = localStorage.getItem("editorBasedContentJS");
      if (code) {
        editor.setValue(code, -1);
      }
    },
    clear: function () {
      localStorage.removeItem("editorBasedContentJS");
      editor.setValue(DEFAULT_JS, -1);
    },
  };
}

// Đợi Ace Editor load
if (typeof ace !== "undefined") {
  initEditor();
} else {
  window.addEventListener("load", initEditor);
}
