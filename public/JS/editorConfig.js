const EditorConfig = {
  defaults: {
    theme: "ace/theme/monokai",
    fontSize: "14px",
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showPrintMargin: false,
    wrap: true,
    tabSize: 2,
  },

  modes: {
    html: "ace/mode/html",
    css: "ace/mode/css",
    javascript: "ace/mode/javascript",
    python: "ace/mode/python",
    sql: "ace/mode/sql",
    java: "ace/mode/java",
    php: "ace/mode/php",
  },

  templates: {
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Project</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <h1>Hello from HTML Editor</h1>
    <p>Start coding here...</p>
    
    <script>
      console.log('Page loaded');
    </script>
  </body>
</html>`,

    css: `body {
  width: 100%;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #04aa60;
  padding: 10px;
}

p {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 5px;
}`,

    javascript: `console.log('Hello from JavaScript!');

function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);

document.body.style.backgroundColor = '#1e1e1e';
document.body.style.color = '#d4d4d4';
document.body.innerHTML = '<h1>' + message + '</h1>';`,

    python: `print("Hello from Python!")

def greet(name):
    return f"Hello, {name}!"

name = input("Nhập tên của bạn: ")
age = input("Nhập tuổi của bạn: ")

print("\\n--- Kết quả ---")
print(greet(name))
print(f"Bạn {age} tuổi rồi nhỉ!")

age = int(age)
if age < 18:
    print("Bạn vẫn còn trẻ!")
elif age < 40:
    print("Bạn đang ở độ tuổi sung sức!")
else:
    print("Chúc bạn luôn khỏe mạnh!")`,
  },

  init: function (elementId, mode, customOptions = {}) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element #${elementId} not found`);
      return null;
    }

    const editor = ace.edit(element);
    editor.setTheme(this.defaults.theme);

    const aceMode = this.modes[mode] || this.modes.html;
    editor.session.setMode(aceMode);

    const options = { ...this.defaults, ...customOptions };
    editor.setOptions(options);

    return editor;
  },

  loadContent: function (storageKey, mode) {
    const saved = localStorage.getItem(storageKey);
    return saved || this.templates[mode] || "";
  },

  autoSave: function (editor, storageKey, callback = null, delay = 300) {
    let timeout;

    editor.session.on("change", function () {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        try {
          const content = editor.getValue();
          localStorage.setItem(storageKey, content);
          if (callback) callback(true);
        } catch (err) {
          console.error("Cannot save to localStorage:", err);
          if (callback) callback(false);
        }
      }, delay);
    });
  },

  setupShortcuts: function (editor, shortcuts = {}) {
    editor.commands.addCommand({
      name: "save",
      bindKey: { win: "Ctrl-S", mac: "Cmd-S" },
      exec: shortcuts.save || function () {
        console.log("Saved!");
      },
    });

    editor.commands.addCommand({
      name: "toggleComment",
      bindKey: { win: "Ctrl-/", mac: "Cmd-/" },
      exec: function (editor) {
        editor.toggleCommentLines();
      },
    });
  },

  showNotification: function (message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast-notification toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  },
};

window.EditorConfig = EditorConfig;
