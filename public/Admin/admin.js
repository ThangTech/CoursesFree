// === KIỂM TRA QUYỀN ADMIN ===
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser || currentUser.username !== "admin") {
  alert("Bạn không có quyền truy cập Admin Panel!");
  window.location.href = "../../index.html";
  return;
}

// === LOAD DỮ LIỆU ===
const users = JSON.parse(localStorage.getItem("users") || "[]");
const tbody = document.querySelector("#users-table tbody");

// Thống kê
let totalUsers = users.length;
let totalLessons = 0;
let totalContributions = 0;
users.forEach((user) => {
  totalLessons += user.completedLessons ? user.completedLessons.length : 0;
  const recentContributions = user.contributions
    ? user.contributions.slice(-7).reduce((a, b) => a + b, 0)
    : 0;
  totalContributions += recentContributions;
});
const avgProgress =
  totalUsers > 0 ? Math.round((totalLessons / totalUsers) * 10) / 10 : 0;

document.getElementById("total-users").textContent = totalUsers;
document.getElementById("total-lessons").textContent = totalLessons;
document.getElementById("avg-progress").textContent = `${avgProgress}%`;

// Hiển thị bảng
users.forEach((user) => {
  const row = document.createElement("tr");
  const completed = user.completedLessons ? user.completedLessons.length : 0;
  const recent = user.contributions
    ? user.contributions.slice(-7).reduce((a, b) => a + b, 0)
    : 0;
  const regDate = new Date().toLocaleDateString("vi-VN");

  row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${completed} bài</td>
        <td>${recent} hoạt động</td>
        <td>${regDate}</td>
        <td>
          <button class="action-btn delete-btn" onclick="deleteUser('${user.username}')">Xóa</button>
        </td>
      `;
  tbody.appendChild(row);
});

// === XÓA NGƯỜI DÙNG ===
window.deleteUser = function (username) {
  if (confirm(`Xóa người dùng ${username}?`)) {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users = users.filter((u) => u.username !== username);
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
  }
};
