require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs",
  },
});

let editor;
let executionTimeout;

require(["vs/editor/editor.main"], function () {
  // Tạo Monaco Editor
  editor = monaco.editor.create(document.getElementById("editor"), {
    value: `// Viết JavaScript code của bạn ở đây\n// Console.log sẽ hiển thị ở bên phải\n\nconsole.log("Xin chào từ JS Editor!");\n\n// Ví dụ: Tạo các phần tử HTML\nconst heading = document.createElement('h1');\nheading.textContent = 'Hello World!';\nheading.style.color = '#4CAF50';\ndocument.body.appendChild(heading);\n\nconst paragraph = document.createElement('p');\nparagraph.textContent = 'Đây là một đoạn văn được tạo bằng JavaScript.';\ndocument.body.appendChild(paragraph);\n\n// Ví dụ: Tạo button\nconst button = document.createElement('button');\nbutton.textContent = 'Click me!';\nbutton.style.padding = '10px 20px';\nbutton.style.margin = '10px 0';\nbutton.style.cursor = 'pointer';\nbutton.onclick = function() {\n  alert('Button được click!');\n};\ndocument.body.appendChild(button);`,
    language: "javascript",
    theme: "vs-dark",
    automaticLayout: true,
    fontSize: 14,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: "on",
  });

  // Lắng nghe sự thay đổi trong editor
  editor.onDidChangeModelContent(() => {
    clearTimeout(executionTimeout);
    executionTimeout = setTimeout(updatePreview, 500);
  });

  updatePreview();
});

function updatePreview() {
  const code = editor.getValue();
  const preview = document.getElementById("preview");

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
    
    // Override console để hiển thị kết quả
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

  preview.srcdoc = htmlContent;
}

window.addEventListener("error", function (e) {
  if (e.message.includes("monaco") || e.message.includes("vs/editor")) {
    console.error("Lỗi khi tải Monaco Editor:", e.message);
  }
});