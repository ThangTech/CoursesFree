const lessonNames = {
  "html-lesson-1": "HTML: Tiêu đề & đoạn văn",
  "html-lesson-2": "HTML: Danh sách & liên kết",
  "html-lesson-3": "HTML: Hình ảnh",
  "css-lesson-1": "CSS: Màu sắc & Font",
  "css-lesson-2": "CSS: Box Model",
  "css-lesson-3": "CSS: Flexbox",
  "js-lesson-1": "JS: Hello World",
  "js-lesson-2": "JS: Tính tổng mảng",
  "js-lesson-3": "JS: Đảo ngược chuỗi",
  "js-lesson-4": "JS: Số chẵn lẻ",
  "html-quiz": "Quiz: HTML Cơ bản",
  "css-quiz": "Quiz: CSS Cơ bản",
  "js-quiz": "Quiz: JavaScript Cơ bản"
};

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
  alert('Vui lòng đăng nhập!');
  window.location.href = './login.html';
}


document.getElementById('user-name').textContent = currentUser.name;
document.getElementById('user-username').textContent = `@${currentUser.username}`;
document.getElementById('user-bio').textContent = currentUser.bio || 'Chưa có tiểu sử';


const contributions = currentUser.contributions || Array(365).fill(0);
const total = contributions.reduce((a, b) => a + b, 0);
document.querySelector('.graph-title span').textContent = `${total} hoạt động trong 12 tháng qua`;

const grid = document.getElementById('contribution-grid');
for (let i = 0; i < 365; i++) {
  const level = contributions[i] || 0;
  const day = document.createElement('div');
  day.className = `graph-day level-${Math.min(level, 4)}`;
  grid.appendChild(day);
}

const coursesContainer = document.getElementById('courses-container');
const completed = currentUser.completedLessons || [];

if (completed.length === 0) {
  coursesContainer.innerHTML = '<p>Chưa hoàn thành bài học nào.</p>';
} else {
  completed.forEach(id => {
    const name = lessonNames[id] || id;
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <div class="course-banner" style="background: linear-gradient(135deg, #10b981, #059669);"></div>
      <div class="course-content">
        <h3 class="course-title">${name}</h3>
        <span class="free-tag">Hoàn thành</span>
        <div class="course-meta">
          <span>Hoàn thành</span>
          <span>100%</span>
        </div>
      </div>
    `;
    coursesContainer.appendChild(card);
  });
}