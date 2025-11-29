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
  "js-quiz": "Quiz: JavaScript Cơ bản",
};

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  alert("Vui lòng đăng nhập!");
  window.location.href = "./login.html";
}


function displayUserInfo() {
  document.getElementById("user-name").textContent = currentUser.name;
  document.getElementById(
    "user-username"
  ).textContent = `@${currentUser.username}`;
  document.getElementById("user-bio").textContent =
    currentUser.bio || "Chưa có tiểu sử";


  const avatarImg = document.getElementById("user-avatar");
  if (currentUser.avatar) {
    avatarImg.src = currentUser.avatar;
  }
}

displayUserInfo();


const contributions = currentUser.contributions || Array(365).fill(0);
const total = contributions.reduce((a, b) => a + b, 0);
document.querySelector(
  ".graph-title span"
).textContent = `${total} hoạt động trong 12 tháng qua`;

const grid = document.getElementById("contribution-grid");
for (let i = 0; i < 365; i++) {
  const level = contributions[i] || 0;
  const day = document.createElement("div");
  day.className = `graph-day level-${Math.min(level, 4)}`;
  grid.appendChild(day);
}


const coursesContainer = document.getElementById("courses-container");
const completed = currentUser.completedLessons || [];

if (completed.length === 0) {
  coursesContainer.innerHTML = "<p>Chưa hoàn thành bài học nào.</p>";
} else {
  completed.forEach((id) => {
    const name = lessonNames[id] || id;
    const card = document.createElement("div");
    card.className = "course-card";
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


function openEditModal() {
  const modal = document.getElementById("edit-modal");
  document.getElementById("edit-name").value = currentUser.name;
  document.getElementById("edit-bio").value = currentUser.bio || "";


  const avatarPreview = document.getElementById("avatar-preview");
  if (currentUser.avatar) {
    avatarPreview.src = currentUser.avatar;
    avatarPreview.style.display = "block";
  } else {
    avatarPreview.style.display = "none";
  }

  modal.style.display = "block";
}


function closeModal() {
  const modal = document.getElementById("edit-modal");
  modal.style.display = "none";
  document.getElementById("edit-avatar").value = ""; 
}


window.onclick = function (event) {
  const modal = document.getElementById("edit-modal");
  if (event.target == modal) {
    closeModal();
  }
};


function previewAvatar(event) {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert("Ảnh quá lớn! Vui lòng chọn ảnh dưới 2MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const avatarPreview = document.getElementById("avatar-preview");
      avatarPreview.src = e.target.result;
      avatarPreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}


function saveProfile() {
  const newName = document.getElementById("edit-name").value.trim();
  const newBio = document.getElementById("edit-bio").value.trim();
  const fileInput = document.getElementById("edit-avatar");


  if (!newName) {
    alert("Vui lòng nhập tên hiển thị!");
    return;
  }

  currentUser.name = newName;
  currentUser.bio = newBio;


  function updateBothStorages() {

    localStorage.setItem("currentUser", JSON.stringify(currentUser));


    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(
      (u) => u.username === currentUser.username
    );

    if (userIndex !== -1) {

      users[userIndex] = { ...users[userIndex], ...currentUser };
      localStorage.setItem("users", JSON.stringify(users));
    }

    closeModal();
    alert("Đã lưu thay đổi thành công!");
    location.reload();
  }

  if (fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      currentUser.avatar = e.target.result; 
      updateBothStorages();
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {

    updateBothStorages();
  }
}
