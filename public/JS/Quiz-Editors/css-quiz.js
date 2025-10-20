const quizzes = [
  {
    title: "CSS cơ bản",
    questions: [
      {
        id: "q1",
        question: "Thuộc tính nào được sử dụng để thay đổi màu chữ?",
        options: ["font-color", "color", "text-color", "foreground-color"],
        correctAnswer: 1,
        explanation: "Thuộc tính 'color' được sử dụng để thay đổi màu chữ.",
      },
      {
        id: "q2",
        question: "Khoảng cách bên ngoài phần tử được gọi là gì?",
        options: ["padding", "margin", "border", "spacing"],
        correctAnswer: 1,
        explanation:
          "Margin là khoảng cách bên ngoài. Padding là khoảng cách bên trong.",
      },
      {
        id: "q3",
        question: "Thuộc tính nào để thay đổi kích thước font?",
        options: ["font-height", "font-size", "text-size", "size"],
        correctAnswer: 1,
        explanation: "Thuộc tính 'font-size' dùng để thay đổi kích thước chữ.",
      },
      {
        id: "q4",
        question: "Để làm cho text in đậm, dùng thuộc tính nào?",
        options: [
          "font-bold",
          "font-weight: bold",
          "text-weight: bold",
          "bold",
        ],
        correctAnswer: 1,
        explanation: "Sử dụng 'font-weight: bold' để làm cho text đậm.",
      },
      {
        id: "q5",
        question: "Thuộc tính nào dùng để căn chỉnh text?",
        options: ["vertical-align", "text-align", "align", "text-position"],
        correctAnswer: 1,
        explanation: "Thuộc tính 'text-align' dùng để căn chỉnh text.",
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
