const exercisesList = [
  {
    id: "html-editor",
    title: "HTML - Bài tập Code",
    description: "Thực hành viết code HTML",
    url: "./public/Pages/Exercises/html-editor.html",
  },
  {
    id: "html-quiz",
    title: "HTML - Trắc nghiệm",
    description: "Kiểm tra kiến thức HTML",
    url: "./public/Pages/Exercises/html-quiz.html",
  },
  {
    id: "css-editor",
    title: "CSS - Bài tập Code",
    description: "Thực hành viết code CSS",
    url: "./public/Pages/Exercises/css-editor.html",
  },
  {
    id: "css-quiz",
    title: "CSS - Trắc nghiệm",
    description: "Kiểm tra kiến thức CSS",
    url: "./public/Pages/Exercises/css-quiz.html",
  },
  {
    id: "js-editor",
    title: "JavaScript - Bài tập Code",
    description: "Thực hành viết code JavaScript",
    url: "./public/Pages/Exercises/js-editor.html",
  },
  {
    id: "js-quiz",
    title: "JavaScript - Trắc nghiệm",
    description: "Kiểm tra kiến thức JavaScript",
    url: "./public/Pages/Exercises/js-quiz.html",
  },
];

function renderExercisesList() {
  const list = document.getElementById("exercises-list");
  if (!list) return;

  list.innerHTML = "";

  exercisesList.forEach((exercise) => {
    const link = document.createElement("a");
    link.className = "exercise-link";
    link.href = exercise.url;
    link.target = "_blank";
    link.style.margin = "20px";

    // Tạo key dịch duy nhất
    const titleKey = `exercise_${exercise.id}_title`;
    const descKey = `exercise_${exercise.id}_desc`;

    link.innerHTML = `
      <div class="exercise-link-title" data-translate="${titleKey}">${exercise.title}</div>
      <div class="exercise-link-desc" data-translate="${descKey}">${exercise.description}</div>
    `;
    list.appendChild(link);
  });
  if (typeof translatePage === "function") {
    setTimeout(() => translatePage(window.currentLang), 0);
  }
}

function setupExercisesButton() {
  const exercisesBtn = document.getElementById("excercises-btn");
  const exercisesContainer = document.getElementById("exercises-container-id");
  const closeBtn = document.getElementById("exercises-close-btn");

  if (exercisesBtn && exercisesContainer) {
    exercisesBtn.addEventListener("click", (e) => {
      e.preventDefault();
      exercisesContainer.classList.toggle("nested-navigation-hidden");

      // Render và dịch khi mở
      if (!exercisesContainer.classList.contains("nested-navigation-hidden")) {
        renderExercisesList();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        exercisesContainer.classList.add("nested-navigation-hidden");
      });
    }

    document.addEventListener("click", (e) => {
      if (
        !exercisesContainer.contains(e.target) &&
        !exercisesBtn.contains(e.target)
      ) {
        exercisesContainer.classList.add("nested-navigation-hidden");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", setupExercisesButton);
