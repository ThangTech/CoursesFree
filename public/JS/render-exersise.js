const exercisesList = [
  {
    id: 'html-editor',
    title: 'HTML - Bài tập Code',
    description: 'Thực hành viết code HTML',
    url: './public/pages/exercises/html-editor.html'
  },
  {
    id: 'html-quiz',
    title: 'HTML - Trắc nghiệm',
    description: 'Kiểm tra kiến thức HTML',
    url: './public/pages/exercises/html-quiz.html'
  },
  {
    id: 'css-editor',
    title: 'CSS - Bài tập Code',
    description: 'Thực hành viết code CSS',
    url: './public/pages/exercises/css-editor.html'
  },
  {
    id: 'css-quiz',
    title: 'CSS - Trắc nghiệm',
    description: 'Kiểm tra kiến thức CSS',
    url: './public/pages/exercises/css-quiz.html'
  },
  {
    id: 'js-editor',
    title: 'JavaScript - Bài tập Code',
    description: 'Thực hành viết code JavaScript',
    url: './public/pages/exercises/js-editor.html'
  },
  {
    id: 'js-quiz',
    title: 'JavaScript - Trắc nghiệm',
    description: 'Kiểm tra kiến thức JavaScript',
    url: './public/pages/exercises/js-quiz.html'
  }
];

function renderExercisesList() {
  const list = document.getElementById('exercises-list');
  list.innerHTML = '';

  exercisesList.forEach(exercise => {
    const link = document.createElement('a');
    link.className = 'exercise-link';
    link.href = exercise.url;
    link.target = '_blank';
    link.style.margin = '20px';
    link.innerHTML = `
      <div class="exercise-link-title">${exercise.title}</div>
      <div class="exercise-link-desc">${exercise.description}</div>
    `;
    list.appendChild(link);
  });
}

function setupExercisesButton() {
  const exercisesBtn = document.getElementById('excercises-btn');
  const exercisesContainer = document.getElementById('exercises-container-id');
  const closeBtn = document.getElementById('exercises-close-btn');

  if (exercisesBtn && exercisesContainer) {
    exercisesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      exercisesContainer.classList.toggle('nested-navigation-hidden');
      renderExercisesList();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        exercisesContainer.classList.add('nested-navigation-hidden');
      });
    }

    document.addEventListener('click', (e) => {
      if (!exercisesContainer.contains(e.target) && !exercisesBtn.contains(e.target)) {
        exercisesContainer.classList.add('nested-navigation-hidden');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', setupExercisesButton);