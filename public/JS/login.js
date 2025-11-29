function switchTab(form) {
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document.querySelector(`.tab[data-form="${form}"]`).classList.add("active");
  document.getElementById("login-form").style.display =
    form === "login" ? "block" : "none";
  document.getElementById("register-form").style.display =
    form === "register" ? "block" : "none";
  document
    .querySelectorAll(".error, .success")
    .forEach((el) => (el.textContent = ""));
  document.getElementById("reg-success").style.display = "none";
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => switchTab(tab.getAttribute("data-form")));
});

document.getElementById("register-btn").addEventListener("click", () => {
  const name = document.getElementById("reg-name").value.trim();
  const username = document
    .getElementById("reg-username")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("reg-password").value;

  if (!name || !username || !password) {
    document.getElementById("reg-error").textContent =
      "Vui lòng điền đầy đủ thông tin";
    return;
  }
  if (password.length < 6) {
    document.getElementById("reg-error").textContent =
      "Mật khẩu phải ít nhất 6 ký tự";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find((u) => u.username === username)) {
    document.getElementById("reg-error").textContent =
      "Tên đăng nhập đã tồn tại";
    return;
  }

  users.push({
    name,
    username,
    password,
    bio: "Chào! Tôi đang học lập trình.",
    avatar: "../Storage/Images/melon-avatar.jpg",
    completedLessons: [],
    contributions: Array(365).fill(0),
  });
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("reg-error").textContent = "";
  const regSuccessEl = document.getElementById("reg-success");

  regSuccessEl.textContent = "Đăng ký thành công! Đang chuyển...";
  regSuccessEl.style.display = "block";
  regSuccessEl.style.opacity = "1";
  regSuccessEl.style.transition = "opacity 0.2s ease";
  
  regSuccessEl.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => switchTab("login"), 1500);
});

document.getElementById("login-btn").addEventListener("click", () => {
  const username = document
    .getElementById("login-username")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    document.getElementById("login-error").textContent =
      "Sai tên đăng nhập hoặc mật khẩu";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "../../index.html";
});

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const active = document
      .querySelector(".tab.active")
      .getAttribute("data-form");
    if (active === "login") document.getElementById("login-btn").click();
    if (active === "register") document.getElementById("register-btn").click();
  }
});
