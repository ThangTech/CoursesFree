const quizzes = [
  {
    title: "HTML cơ bản",
    questions: [
      {
        id: "q1",
        question: "Thẻ nào được sử dụng để tạo một đoạn văn?",
        options: [
          "&lt;p&gt;",
          "&lt;paragraph&gt;",
          "&lt;text&gt;",
          "&lt;div&gt;",
        ],
        correctAnswer: 0,
        explanation:
          "Thẻ &lt;p&gt; được sử dụng để tạo một đoạn văn. Nó là viết tắt của 'paragraph'.",
      },
      {
        id: "q2",
        question: "Thẻ nào được sử dụng để tạo một liên kết?",
        options: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;url&gt;"],
        correctAnswer: 1,
        explanation:
          "Thẻ &lt;a&gt; được sử dụng để tạo một liên kết. &lt;a&gt; là viết tắt của 'anchor'.",
      },
      {
        id: "q3",
        question: "Thẻ nào được sử dụng để chèn một hình ảnh?",
        options: [
          "&lt;picture&gt;",
          "&lt;img&gt;",
          "&lt;image&gt;",
          "&lt;photo&gt;",
        ],
        correctAnswer: 1,
        explanation:
          "Thẻ &lt;img&gt; được sử dụng để chèn một hình ảnh. &lt;img&gt; là viết tắt của 'image'.",
      },
      {
        id: "q4",
        question: "DOCTYPE được sử dụng để làm gì?",
        options: [
          "Khai báo tập lệnh",
          "Khai báo kiểu tài liệu",
          "Khai báo hàm",
          "Khai báo biến",
        ],
        correctAnswer: 1,
        explanation:
          "DOCTYPE được sử dụng để khai báo kiểu tài liệu. Nó phải là dòng đầu tiên trong tài liệu HTML.",
      },
      {
        id: "q5",
        question: "Thẻ nào được sử dụng để tạo tiêu đề lớn nhất?",
        options: ["&lt;h6&gt;", "&lt;h1&gt;", "&lt;h3&gt;", "&lt;header&gt;"],
        correctAnswer: 1,
        explanation:
          "Thẻ &lt;h1&gt; được sử dụng để tạo tiêu đề lớn nhất. &lt;h1&gt; đến &lt;h6&gt; được dùng cho các tiêu đề có kích thước khác nhau.",
      },
    ],
  },
];

let currentQuizIndex = 0;
let answers = {};
let submitted = false;

function renderQuiz() {
  const quiz = quizzes[currentQuizIndex];
  const container = document.getElementById("quiz-container");

  let html = `<h2>${quiz.title}</h2>`;

  quiz.questions.forEach((q, idx) => {
    html += `
          <div class="question-container" id="question-${q.id}">
            <div class="question-number">Câu ${idx + 1}/${
      quiz.questions.length
    }</div>
            <div class="question-text">${q.question}</div>
            <div class="options">
              ${q.options
                .map(
                  (option, optIdx) => `
                <div class="option">
                  <input type="radio" id="q${q.id}-${optIdx}" name="q${
                    q.id
                  }" value="${optIdx}" ${submitted ? "disabled" : ""}>
                  <label for="q${q.id}-${optIdx}">${option}</label>
                </div>
              `
                )
                .join("")}
            </div>
            <div class="result" id="result-${q.id}"></div>
          </div>
        `;
  });

  container.innerHTML = html;
  document.getElementById("score").textContent = `0/${quiz.questions.length}`;
  document.getElementById("progressFill").style.width = "0%";
}

function submitQuiz() {
  const quiz = quizzes[currentQuizIndex];
  const total = quiz.questions.length;
  let answered = 0;
  let correctCount = 0;

  quiz.questions.forEach((q) => {
    const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
    const resultDiv = document.getElementById(`result-${q.id}`);

    if (selected) {
      answered++;
      answers[q.id] = parseInt(selected.value);
      const isCorrect = parseInt(selected.value) === q.correctAnswer;

      resultDiv.classList.add("show");
      if (isCorrect) {
        resultDiv.className = "result show correct";
        resultDiv.innerHTML = `
                <div class="result-text">✓ Đúng rồi!</div>
                <div class="result-explanation">${q.explanation}</div>
              `;
        correctCount++;
      } else {
        resultDiv.className = "result show incorrect";
        resultDiv.innerHTML = `
                <div class="result-text">✗ Sai rồi!</div>
                <div class="result-explanation">${q.explanation}</div>
              `;
      }

      const radios = document.querySelectorAll(`input[name="q${q.id}"]`);
      radios.forEach((radio) => (radio.disabled = true));
    }
  });

  if (answered < total) {
    alert(`Vui lòng trả lời tất cả câu hỏi! (${answered}/${total})`);
    return;
  }

  submitted = true;
  const percentage = Math.round((correctCount / total) * 100);
  alert(
    `Quiz đã hoàn thành!\n\nKết quả: ${correctCount}/${total} (${percentage}%)`
  );

  document.getElementById("score").textContent = `${correctCount}/${total}`;
  document.getElementById("progressFill").style.width = `${
    (correctCount / total) * 100
  }%`;
}

function resetQuiz() {
  if (confirm("Bạn có chắc muốn làm lại bài kiểm tra?")) {
    answers = {};
    submitted = false;
    renderQuiz();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuiz();
});
