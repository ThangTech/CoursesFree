let editor;
let currentChallengeIndex = 0;

const challenges = [
  {
    id: "js-lesson-1",
    title: "Hello World",
    description: `
      <h3>Nhiệm vụ</h3>
      <p>Viết một hàm <code>sayHello(name)</code> trả về chuỗi chào mừng.</p>
      
      <div class="example-box">
        <strong>Ví dụ:</strong><br>
        sayHello("Minh") → "Xin chào, Minh!"<br>
        sayHello("An") → "Xin chào, An!"
      </div>
      
      <p>💡 <strong>Gợi ý:</strong> Sử dụng template string với dấu backtick \`\`.</p>
    `,
    starterCode: `function sayHello(name) {
  // Viết code của bạn ở đây
  
}

// Test thử
console.log(sayHello("Minh"));
console.log(sayHello("An"));`,
    tests: [
      { input: "Minh", expected: "Xin chào, Minh!" },
      { input: "An", expected: "Xin chào, An!" },
      { input: "Hùng", expected: "Xin chào, Hùng!" },
    ],
  },
  {
    id: "js-lesson-2",
    title: "Tính tổng mảng",
    description: `
      <h3>Nhiệm vụ</h3>
      <p>Viết hàm <code>sumArray(arr)</code> tính tổng các số trong mảng.</p>
      
      <div class="example-box">
        <strong>Ví dụ:</strong><br>
        sumArray([1, 2, 3]) → 6<br>
        sumArray([10, 20, 30]) → 60<br>
        sumArray([]) → 0
      </div>
      
      <p>💡 <strong>Gợi ý:</strong> Dùng vòng lặp for hoặc phương thức reduce().</p>
    `,
    starterCode: `function sumArray(arr) {
  // Viết code của bạn ở đây
  
}

// Test thử
console.log(sumArray([1, 2, 3]));
console.log(sumArray([10, 20, 30]));
console.log(sumArray([]));`,
    tests: [
      { input: [1, 2, 3], expected: 6 },
      { input: [10, 20, 30], expected: 60 },
      { input: [5], expected: 5 },
      { input: [], expected: 0 },
    ],
  },
  {
    id: "js-lesson-3",
    title: "Đảo ngược chuỗi",
    description: `
      <h3>Nhiệm vụ</h3>
      <p>Viết hàm <code>reverseString(str)</code> đảo ngược một chuỗi.</p>
      
      <div class="example-box">
        <strong>Ví dụ:</strong><br>
        reverseString("hello") → "olleh"<br>
        reverseString("world") → "dlrow"
      </div>
      
      <p>💡 <strong>Gợi ý:</strong> Chuyển string thành array rồi dùng reverse().</p>
    `,
    starterCode: `function reverseString(str) {
  // Viết code của bạn ở đây
  
}

// Test thử
console.log(reverseString("hello"));
console.log(reverseString("world"));`,
    tests: [
      { input: "hello", expected: "olleh" },
      { input: "world", expected: "dlrow" },
      { input: "JavaScript", expected: "tpircSavaJ" },
    ],
  },
  {
    id: "js-lesson-4",
    title: "Số chẵn lẻ",
    description: `
      <h3>Nhiệm vụ</h3>
      <p>Viết hàm <code>isEven(num)</code> kiểm tra số chẵn. Trả về true nếu chẵn, false nếu lẻ.</p>
      
      <div class="example-box">
        <strong>Ví dụ:</strong><br>
        isEven(4) → true<br>
        isEven(7) → false<br>
        isEven(0) → true
      </div>
      
      <p>💡 <strong>Gợi ý:</strong> Dùng toán tử % (chia lấy dư).</p>
    `,
    starterCode: `function isEven(num) {
  // Viết code của bạn ở đây
  
}

// Test thử
console.log(isEven(4));
console.log(isEven(7));
console.log(isEven(0));`,
    tests: [
      { input: 4, expected: true },
      { input: 7, expected: false },
      { input: 0, expected: true },
      { input: 100, expected: true },
      { input: 99, expected: false },
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
  }

  // Clear output
  document.getElementById("output").innerHTML = "";
}

// Khởi tạo Ace Editor
function initEditor() {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
  editor.setOptions({
    fontSize: "16px",
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showPrintMargin: false,
    wrap: true,
    tabSize: 2,
  });

  loadChallenge(0);
}

// Đợi Ace Editor load xong
if (typeof ace !== "undefined") {
  initEditor();
} else {
  window.addEventListener("load", initEditor);
}

function runCode() {
  const code = editor.getValue();
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";

  const logs = [];
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  console.log = (...args) => {
    logs.push({ type: "log", content: args.map(formatOutput).join(" ") });
    originalLog.apply(console, args);
  };

  console.error = (...args) => {
    logs.push({ type: "error", content: args.map(formatOutput).join(" ") });
    originalError.apply(console, args);
  };

  console.warn = (...args) => {
    logs.push({ type: "warn", content: args.map(formatOutput).join(" ") });
    originalWarn.apply(console, args);
  };

  try {
    eval(code);

    if (logs.length > 0) {
      logs.forEach((log) => {
        const div = document.createElement("div");
        div.className = `output-item output-${log.type}`;
        div.textContent = log.content;
        outputDiv.appendChild(div);
      });
    }

    // Run tests
    runTests(code);
  } catch (error) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "output-item output-error";
    errorDiv.textContent = `❌ Lỗi: ${error.message}`;
    outputDiv.appendChild(errorDiv);
  } finally {
    // Restore console
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  }
}

function runTests(code) {
  const outputDiv = document.getElementById("output");
  const challenge = challenges[currentChallengeIndex];

  try {
    eval(code);

    const funcName = challenge.starterCode.match(/function\s+(\w+)/)?.[1];
    if (!funcName) return;

    const func = eval(funcName);
    if (typeof func !== "function") return;

    const testResults = challenge.tests.map((test, idx) => {
      try {
        const result = func(test.input);
        const passed = JSON.stringify(result) === JSON.stringify(test.expected);

        return {
          passed,
          input: test.input,
          expected: test.expected,
          actual: result,
          index: idx + 1,
        };
      } catch (e) {
        return {
          passed: false,
          error: e.message,
          index: idx + 1,
        };
      }
    });

    const passedCount = testResults.filter((r) => r.passed).length;
    const totalCount = testResults.length;
    const allPassed = passedCount === totalCount;

    // Display test results
    const testDiv = document.createElement("div");
    testDiv.className = `test-result ${
      allPassed ? "test-passed" : "test-failed"
    }`;

    if (allPassed) {
      testDiv.innerHTML = `
        <div> Hoàn thành! Tất cả test cases đã pass! (${passedCount}/${totalCount})</div>
        <div class="test-info">Tuyệt vời! Bạn đã giải quyết thử thách này.</div>
      `;
      const lessonId = challenges[currentChallengeIndex].id;
      if (typeof saveLessonProgress === "function") {
        saveLessonProgress(lessonId);
      }

      if (currentChallengeIndex < challenges.length - 1) {
        const nextBtn = document.createElement("button");
        nextBtn.className = "next-button";
        nextBtn.textContent = "➜ Bài tiếp theo";
        nextBtn.onclick = () => {
          loadChallenge(currentChallengeIndex + 1);
        };
        testDiv.appendChild(nextBtn);
      } else {
        const completeMsg = document.createElement("div");
        completeMsg.className = "test-info";
        completeMsg.style.marginTop = "10px";
        completeMsg.style.color = "#4ec9b0";
        completeMsg.innerHTML =
          " Chúc mừng! Bạn đã hoàn thành tất cả bài tập!";
        testDiv.appendChild(completeMsg);
      }
    } else {
      testDiv.innerHTML = `
        <div>⚠️ Test Cases: ${passedCount}/${totalCount} passed</div>
        <div class="test-info">
          ${testResults
            .map((r) => {
              if (r.passed) {
                return `<span style="color: #4ec9b0;"> Test ${r.index}: Pass</span>`;
              } else if (r.error) {
                return `<span style="color: #f48771;"> Test ${r.index}: Error - ${r.error}</span>`;
              } else {
                return `<span style="color: #f48771;"> Test ${
                  r.index
                }: Fail</span><br>
                        &nbsp;&nbsp;&nbsp;Expected: ${JSON.stringify(
                          r.expected
                        )}<br>
                        &nbsp;&nbsp;&nbsp;Got: ${JSON.stringify(r.actual)}`;
              }
            })
            .join("<br>")}
        </div>
      `;
    }

    outputDiv.appendChild(testDiv);
  } catch (e) {

  }
}

function formatOutput(value) {
  if (typeof value === "object" && value !== null) {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    runCode();
  }
});
