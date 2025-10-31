const quizzes = [
  {
    title: "JavaScript cơ bản",
    questions: [
      {
        id: "q1",
        question: "Cách nào để khai báo một biến trong JavaScript?",
        options: ["var", "let", "const", "Tất cả đều đúng"],
        correctAnswer: 3,
        explanation:
          "var, let, const đều có thể khai báo biến. let và const là cách hiện đại.",
      },
      {
        id: "q2",
        question: "Hàm nào để chuyển string thành number?",
        options: ["String()", "Number()", "parseInt()", "Cả B và C"],
        correctAnswer: 3,
        explanation:
          "Number() và parseInt() đều có thể chuyển string thành number.",
      },
      {
        id: "q3",
        question: "Toán tử nào để so sánh nghiêm ngặt?",
        options: ["==", "===", "=", "!=="],
        correctAnswer: 1,
        explanation: "=== so sánh cả giá trị và kiểu dữ liệu (nghiêm ngặt).",
      },
      {
        id: "q4",
        question: "Phương thức nào để thêm phần tử vào cuối array?",
        options: ["add()", "push()", "insert()", "append()"],
        correctAnswer: 1,
        explanation: "push() được dùng để thêm phần tử vào cuối array.",
      },
      {
        id: "q5",
        question: "typeof undefined trả về gì?",
        options: ["'object'", "'undefined'", "'null'", "'empty'"],
        correctAnswer: 1,
        explanation: "typeof undefined trả về 'undefined'.",
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

  if (correctCount >= total * 0.8) {
    const quizId = window.location.pathname.includes('html-quiz') ? 'html-quiz' :
                   window.location.pathname.includes('css-quiz') ? 'css-quiz' : 'js-quiz';
    saveLessonProgress(quizId);
  }
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
