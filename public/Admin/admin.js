// === KIỂM TRA QUYỀN ADMIN ===
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser || currentUser.username !== "admin") {
  alert("Bạn không có quyền truy cập Admin Panel!");
  window.location.href = "../../index.html";
} else {
  // === LOAD DỮ LIỆU ===
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const tbody = document.querySelector("#users-table tbody");

  console.log("Loaded users:", users); 

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

 
  const totalAvailableLessons = 10; 
  const avgProgress =
    totalUsers > 0
      ? Math.round(
          (totalLessons / (totalUsers * totalAvailableLessons)) * 1000
        ) / 10
      : 0;

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

    const regDate = user.registrationDate
      ? new Date(user.registrationDate).toLocaleDateString("vi-VN")
      : new Date().toLocaleDateString("vi-VN");

    const deleteButton =
      user.username === "admin"
        ? '<span style="color: #666; font-style: italic;">Không thể xóa</span>'
        : `<button class="action-btn delete-btn" onclick="deleteUser('${user.username}')">Xóa</button>`;

    row.innerHTML = `
      <td>${user.name || "N/A"}</td>
      <td>${user.username}${
      user.username === "admin"
        ? ' <span style="color: #ff6b6b; font-weight: bold;">(Admin)</span>'
        : ""
    }</td>
      <td>${completed} bài</td>
      <td>${recent} hoạt động</td>
      <td>${regDate}</td>
      <td>
        ${deleteButton}
      </td>
    `;
    tbody.appendChild(row);
  });

  // === XÓA NGƯỜI DÙNG ===
  window.deleteUser = function (username) {
    // Bảo vệ tài khoản admin
    if (username === "admin") {
      alert("Không thể xóa tài khoản Admin!");
      return;
    }

    if (confirm(`Xóa người dùng ${username}?`)) {
      let users = JSON.parse(localStorage.getItem("users") || "[]");
      users = users.filter((u) => u.username !== username);
      localStorage.setItem("users", JSON.stringify(users));
      location.reload();
    }
  };
}
