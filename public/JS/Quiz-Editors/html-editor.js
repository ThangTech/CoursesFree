let editor;
let currentChallengeIndex = 0;

const challenges = [
  {
    id: "html-lesson-1",
    title: "Tiêu đề và đoạn văn đầu tiên",
    description: `
          <h3>Nhiệm vụ</h3>
          <p>Tạo một trang HTML đơn giản với:</p>
          <ul style="margin-left: 20px; line-height: 1.8;">
            <li>Một tiêu đề <code>&lt;h1&gt;</code> với nội dung "Chào mừng đến với HTML"</li>
            <li>Một đoạn văn <code>&lt;p&gt;</code> với nội dung "Đây là bài tập đầu tiên của tôi"</li>
          </ul>
          <div class="example-box">
            <strong>💡 Gợi ý:</strong><br>
            - Sử dụng thẻ &lt;h1&gt; cho tiêu đề<br>
            - Sử dụng thẻ &lt;p&gt; cho đoạn văn
          </div>
        `,
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Bài 1</title>
</head>
<body>
  <!-- Viết code của bạn ở đây -->
  
</body>
</html>`,
    requirements: [
      {
        name: "Có thẻ <h1>",
        check: (doc) => doc.querySelector("h1") !== null,
      },
      {
        name: "Tiêu đề có nội dung đúng",
        check: (doc) => {
          const h1 = doc.querySelector("h1");
          return h1 && h1.textContent.includes("Chào mừng đến với HTML");
        },
      },
      {
        name: "Có thẻ <p>",
        check: (doc) => doc.querySelector("p") !== null,
      },
      {
        name: "Đoạn văn có nội dung đúng",
        check: (doc) => {
          const p = doc.querySelector("p");
          return p && p.textContent.includes("Đây là bài tập đầu tiên của tôi");
        },
      },
    ],
  },
  {
    id: "html-lesson-2",
    title: "Danh sách và liên kết",
    description: `
          <h3>Nhiệm vụ</h3>
          <p>Tạo trang HTML với:</p>
          <ul style="margin-left: 20px; line-height: 1.8;">
            <li>Tiêu đề <code>&lt;h2&gt;</code>: "Các trang web yêu thích"</li>
            <li>Danh sách không thứ tự <code>&lt;ul&gt;</code> với 3 mục</li>
            <li>Mỗi mục chứa 1 liên kết <code>&lt;a&gt;</code></li>
          </ul>
          <div class="example-box">
            <strong>💡 Gợi ý:</strong><br>
            - Dùng &lt;ul&gt; và &lt;li&gt; cho danh sách<br>
            - Dùng &lt;a href="..."&gt; cho liên kết
          </div>
        `,
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Bài 2</title>
</head>
<body>
  <!-- Viết code của bạn ở đây -->
  
</body>
</html>`,
    requirements: [
      {
        name: "Có thẻ <h2>",
        check: (doc) => doc.querySelector("h2") !== null,
      },
      {
        name: "Có danh sách <ul>",
        check: (doc) => doc.querySelector("ul") !== null,
      },
      {
        name: "Có ít nhất 3 mục <li>",
        check: (doc) => doc.querySelectorAll("li").length >= 3,
      },
      {
        name: "Có ít nhất 3 liên kết <a>",
        check: (doc) => doc.querySelectorAll("a").length >= 3,
      },
    ],
  },
  {
    id: "html-lesson-3",
    title: "Hình ảnh và thuộc tính",
    description: `
          <h3>Nhiệm vụ</h3>
          <p>Tạo trang HTML với:</p>
          <ul style="margin-left: 20px; line-height: 1.8;">
            <li>Tiêu đề <code>&lt;h1&gt;</code>: "Album ảnh của tôi"</li>
            <li>Một hình ảnh <code>&lt;img&gt;</code> với thuộc tính <code>alt</code></li>
            <li>Một đoạn mô tả về hình ảnh</li>
          </ul>
          <div class="example-box">
            <strong>💡 Gợi ý:</strong><br>
            - Dùng &lt;img src="..." alt="..."&gt;<br>
            - Thuộc tính alt là bắt buộc cho hình ảnh
          </div>
        `,
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Bài 3</title>
</head>
<body>
  <!-- Viết code của bạn ở đây -->
  
</body>
</html>`,
    requirements: [
      {
        name: "Có thẻ <h1>",
        check: (doc) => doc.querySelector("h1") !== null,
      },
      {
        name: "Có thẻ <img>",
        check: (doc) => doc.querySelector("img") !== null,
      },
      {
        name: "Thẻ img có thuộc tính alt",
        check: (doc) => {
          const img = doc.querySelector("img");
          return img && img.hasAttribute("alt");
        },
      },
      {
        name: "Có đoạn văn mô tả",
        check: (doc) => doc.querySelector("p") !== null,
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
    editor.setValue(challenge.starterCode, -1);
    updatePreview();
  }
}

// Khởi tạo Ace Editor
function initEditor() {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/html");
  editor.setOptions({
    fontSize: "16px",
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showPrintMargin: false,
    wrap: true,
  });

  // Lắng nghe thay đổi
  editor.session.on("change", function () {
    updatePreview();
  });

  loadChallenge(0);
}

// Đợi Ace Editor load xong
if (typeof ace !== "undefined") {
  initEditor();
} else {
  window.addEventListener("load", initEditor);
}

function updatePreview() {
  const code = editor.getValue();
  const preview = document.getElementById("preview");
  const previewDoc = preview.contentDocument || preview.contentWindow.document;
  previewDoc.open();
  previewDoc.write(code);
  previewDoc.close();
}

function checkChallenge() {
  const code = editor.getValue();
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
    const lessonId = challenges[currentChallengeIndex].id;
    if (typeof saveLessonProgress === "function") {
      saveLessonProgress(lessonId);
    }

    if (currentChallengeIndex < challenges.length - 1) {
      nextBtn.style.display = "inline-block";
    } else {
      message.textContent =
        "🎊 Chúc mừng! Bạn đã hoàn thành tất cả bài tập HTML!";
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
