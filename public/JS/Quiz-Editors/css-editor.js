let editor;
let currentChallengeIndex = 0;

const challenges = [
  {
    title: "Màu sắc và Font chữ cơ bản",
    description: `
          <h3>Nhiệm vụ</h3>
          <p>Tạo CSS để:</p>
          <ul style="margin-left: 20px; line-height: 1.8;">
            <li>Đổi màu chữ của <code>h1</code> thành màu xanh dương (#007acc)</li>
            <li>Đổi màu nền của <code>body</code> thành màu xám nhạt (#f5f5f5)</li>
            <li>Đổi font chữ của <code>p</code> thành Arial</li>
          </ul>
          <div class="example-box">
            <strong>💡 Gợi ý:</strong><br>
            - Dùng thuộc tính <code>color</code> để đổi màu chữ<br>
            - Dùng <code>background-color</code> cho màu nền<br>
            - Dùng <code>font-family</code> cho font chữ
          </div>
        `,
    starterCode: `/* Viết CSS của bạn ở đây */

`,
    htmlContent: `<h1>Tiêu đề chính</h1>
<p>Đây là một đoạn văn bản mẫu.</p>`,
    requirements: [
      {
        name: "h1 có màu xanh dương",
        check: (doc) => {
          const h1 = doc.querySelector("h1");
          if (!h1) return false;
          const color = window.getComputedStyle(h1).color;
          return color === "rgb(0, 122, 204)" || color.includes("0, 122, 204");
        },
      },
      {
        name: "body có màu nền xám nhạt",
        check: (doc) => {
          const body = doc.querySelector("body");
          if (!body) return false;
          const bg = window.getComputedStyle(body).backgroundColor;
          return bg === "rgb(245, 245, 245)" || bg.includes("245, 245, 245");
        },
      },
      {
        name: "p có font Arial",
        check: (doc) => {
          const p = doc.querySelector("p");
          if (!p) return false;
          const font = window.getComputedStyle(p).fontFamily.toLowerCase();
          return font.includes("arial");
        },
      },
    ],
  },
  {
    title: "Box Model - Padding và Margin",
    description: `
          <h3>Nhiệm vụ</h3>
          <p>Tạo CSS cho class <code>.box</code> với:</p>
          <ul style="margin-left: 20px; line-height: 1.8;">
            <li>Padding bên trong là 20px</li>
            <li>Margin xung quanh là 10px</li>
            <li>Border màu đen, độ dày 2px, kiểu solid</li>
            <li>Màu nền là màu vàng nhạt (#fff3cd)</li>
          </ul>
          <div class="example-box">
            <strong>💡 Gợi ý:</strong><br>
            - Dùng <code>padding</code> cho khoảng cách bên trong<br>
            - Dùng <code>margin</code> cho khoảng cách bên ngoài<br>
            - Dùng <code>border</code> cho viền
          </div>
        `,
    starterCode: `.box {
  /* Viết CSS của bạn ở đây */
  
}`,
    htmlContent: `<div class="box">
  <h2>Box Model</h2>
  <p>Đây là một hộp với padding, margin và border.</p>
</div>`,
    requirements: [
      {
        name: ".box có padding 20px",
        check: (doc) => {
          const box = doc.querySelector(".box");
          if (!box) return false;
          const padding = window.getComputedStyle(box).padding;
          return padding === "20px" || padding.includes("20px");
        },
      },
      {
        name: ".box có margin 10px",
        check: (doc) => {
          const box = doc.querySelector(".box");
          if (!box) return false;
          const margin = window.getComputedStyle(box).margin;
          return margin === "10px" || margin.includes("10px");
        },
      },
      {
        name: ".box có border 2px solid",
        check: (doc) => {
          const box = doc.querySelector(".box");
          if (!box) return false;
          const style = window.getComputedStyle(box);
          return style.borderWidth === "2px" && style.borderStyle === "solid";
        },
      },
      {
        name: ".box có màu nền vàng nhạt",
        check: (doc) => {
          const box = doc.querySelector(".box");
          if (!box) return false;
          const bg = window.getComputedStyle(box).backgroundColor;
          return bg === "rgb(255, 243, 205)" || bg.includes("255, 243, 205");
        },
      },
    ],
  },
  {
    title: "Flexbox Layout",
    description: `
          <h3>Nhiệm vụ</h3>
          <p>Tạo CSS cho class <code>.container</code> để:</p>
          <ul style="margin-left: 20px; line-height: 1.8;">
            <li>Sử dụng Flexbox layout</li>
            <li>Căn giữa các item theo cả 2 chiều</li>
            <li>Khoảng cách giữa các item là 20px</li>
            <li>Chiều cao tối thiểu là 300px</li>
          </ul>
          <div class="example-box">
            <strong>💡 Gợi ý:</strong><br>
            - Dùng <code>display: flex</code><br>
            - Dùng <code>justify-content</code> và <code>align-items</code><br>
            - Dùng <code>gap</code> cho khoảng cách
          </div>
        `,
    starterCode: `.container {
  /* Viết CSS của bạn ở đây */
  
}

.item {
  padding: 20px;
  background: #4ec9b0;
  color: white;
  border-radius: 8px;
}`,
    htmlContent: `<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>`,
    requirements: [
      {
        name: ".container có display: flex",
        check: (doc) => {
          const container = doc.querySelector(".container");
          if (!container) return false;
          return window.getComputedStyle(container).display === "flex";
        },
      },
      {
        name: ".container có justify-content: center",
        check: (doc) => {
          const container = doc.querySelector(".container");
          if (!container) return false;
          return window.getComputedStyle(container).justifyContent === "center";
        },
      },
      {
        name: ".container có align-items: center",
        check: (doc) => {
          const container = doc.querySelector(".container");
          if (!container) return false;
          return window.getComputedStyle(container).alignItems === "center";
        },
      },
      {
        name: ".container có gap 20px",
        check: (doc) => {
          const container = doc.querySelector(".container");
          if (!container) return false;
          const gap = window.getComputedStyle(container).gap;
          return gap === "20px" || gap.includes("20px");
        },
      },
      {
        name: ".container có min-height 300px",
        check: (doc) => {
          const container = doc.querySelector(".container");
          if (!container) return false;
          return window.getComputedStyle(container).minHeight === "300px";
        },
      },
    ],
  },
];

function loadChallenge(index) {
  if (index < 0 || index >= challenges.length) {
    index = 0;
  }

  currentChallengeIndex = index;
  const challenge = challenges[currentChallengeIndex];

  document.querySelector(".header h2").textContent = `${
    currentChallengeIndex + 1
  }. ${challenge.title}`;
  document.getElementById("challenge").innerHTML = challenge.description;

  if (editor) {
    editor.setValue(challenge.starterCode);
    updatePreview();
  }
}

require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs",
  },
});

require(["vs/editor/editor.main"], () => {
  editor = monaco.editor.create(document.getElementById("editor"), {
    value: "/* CSS */\n",
    language: "css",
    theme: "vs-dark",
    fontSize: 16,
    minimap: { enabled: false },
    automaticLayout: true,
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    autoIndent: "advanced",
  });

  editor.onDidChangeModelContent(() => {
    updatePreview();
  });

  loadChallenge(0);
});

function updatePreview() {
  const cssCode = editor.getValue();
  const challenge = challenges[currentChallengeIndex];
  const preview = document.getElementById("preview");
  const previewDoc = preview.contentDocument || preview.contentWindow.document;

  const fullHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { margin: 20px; font-family: Arial, sans-serif; }
            ${cssCode}
          </style>
        </head>
        <body>
          ${challenge.htmlContent}
        </body>
        </html>
      `;

  previewDoc.open();
  previewDoc.write(fullHTML);
  previewDoc.close();
}

function checkChallenge() {
  const preview = document.getElementById("preview");
  const previewDoc = preview.contentDocument || preview.contentWindow.document;

  const challenge = challenges[currentChallengeIndex];
  const results = challenge.requirements.map((req) => ({
    name: req.name,
    passed: req.check(previewDoc),
  }));

  const allPassed = results.every((r) => r.passed);
  showResult(allPassed, results);
}

function showResult(passed, results) {
  const overlay = document.getElementById("resultOverlay");
  const box = document.getElementById("resultBox");
  const icon = document.getElementById("resultIcon");
  const title = document.getElementById("resultTitle");
  const message = document.getElementById("resultMessage");
  const reqList = document.getElementById("requirementList");
  const nextBtn = document.getElementById("nextButton");

  if (passed) {
    box.classList.remove("failed");
    icon.textContent = "🎉";
    title.textContent = "Chính xác!";
    message.textContent = "Tuyệt vời! Bạn đã hoàn thành thử thách này.";

    if (currentChallengeIndex < challenges.length - 1) {
      nextBtn.style.display = "inline-block";
    } else {
      message.textContent =
        "🎊 Chúc mừng! Bạn đã hoàn thành tất cả bài tập CSS!";
      nextBtn.style.display = "none";
    }
  } else {
    box.classList.add("failed");
    icon.textContent = "❌";
    title.textContent = "Chưa đúng!";
    message.textContent = "Hãy xem lại các yêu cầu bên dưới:";
    nextBtn.style.display = "none";
  }

  reqList.innerHTML = results
    .map(
      (r) =>
        `<div class="requirement-item ${r.passed ? "pass" : "fail"}">
              ${r.passed ? "✓" : "✗"} ${r.name}
            </div>`
    )
    .join("");

  overlay.style.display = "flex";
}

function closeResult() {
  document.getElementById("resultOverlay").style.display = "none";
}

function nextChallenge() {
  closeResult();
  loadChallenge(currentChallengeIndex + 1);
}

setInterval(() => {
  if (editor) {
    updatePreview();
  }
}, 1000);
