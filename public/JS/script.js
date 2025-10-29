// ===== MOBILE MENU =====
const menuBtnMobile = document.getElementById("menu-btn-Mobile");
const mobileMenuNav = document.getElementById("mobile-menu-nav");
const mobileNavClose = document.getElementById("mobile-nav-close");
let isMobileMenuOpen = false;

menuBtnMobile.addEventListener("click", () => {
  isMobileMenuOpen ? closeMobileMenu() : openMobileMenu();
});

mobileNavClose.addEventListener("click", closeMobileMenu);

function openMobileMenu() {
  mobileMenuNav.classList.add("mobile-menu-nav-hidden");
  isMobileMenuOpen = true;
}

function closeMobileMenu() {
  mobileMenuNav.classList.remove("mobile-menu-nav-hidden");
  isMobileMenuOpen = false;
}

// ===== NESTED NAVIGATION (HƯỚNG DẪN) =====
const tutorialBtn = document.getElementById("tutorial-btn");
const nestedNav = document.getElementById("nested-navigation-container-id");
const nestedCloseBtn = document.getElementById("nested-nav-close-btn");

if (tutorialBtn && nestedNav) {
  tutorialBtn.addEventListener("click", (e) => {
    e.preventDefault();
    nestedNav.classList.toggle("nested-navigation-hidden");

    // Dịch lại khi mở menu
    if (
      !nestedNav.classList.contains("nested-navigation-hidden") &&
      typeof translatePage === "function"
    ) {
      const currentLang = window.currentLang || window.getSavedLanguage();
      setTimeout(() => translatePage(currentLang), 100);
    }
  });

  nestedCloseBtn.addEventListener("click", () => {
    nestedNav.classList.add("nested-navigation-hidden");
  });

  // Đóng nested nav khi click ngoài
  document.addEventListener("click", (e) => {
    if (!nestedNav.contains(e.target) && !tutorialBtn.contains(e.target)) {
      nestedNav.classList.add("nested-navigation-hidden");
    }
  });
}

// ===== CODE EDITORS (HIỂN THỊ CODE) =====
const codeExamples = {
  vi: {
    html: `<!DOCTYPE html>
<html>
<title>Hướng dẫn HTML</title>
<body>
  <h1>Đây là thẻ H1</h1>
  <p>Đây là thẻ paragraph</p>
</body>
</html>`,
    css: `body {
  width: 100%;
  font-family: 'Roboto', sans-serif;
}

h1 {
  padding: 10px;
}

p {
  background-color: red;
  color: white;
}`,
    javascript: `<button onclick="changeText()">Bấm vào tôi</button>

<script>
function changeText() {
  let textElement = document.getElementById("text");
  textElement.innerHTML = "Nội dung đã thay đổi!";
  textElement.style.color = "blue";
}
</script>`,
    python: `ten = input("Nhập tên của bạn: ")
tuoi = input("Nhập tuổi của bạn: ")
print("\\n--- Kết quả ---")
print(f"Xin chào {ten}")
print(f"Bạn {tuoi} tuổi rồi nhỉ!")

tuoi = int(tuoi)
if tuoi < 18:
  print("Bạn vẫn còn trẻ, hãy chăm học nhé!")
elif tuoi < 40:
  print("Bạn đang ở độ tuổi sung sức nhất!")
else:
  print("Chúc bạn luôn mạnh khỏe và hạnh phúc!")`,
    sql: `CREATE TABLE SinhVien (
  ID INT PRIMARY KEY,
  Ten NVARCHAR(100),
  Tuoi INT,
  Lop NVARCHAR(50)
);

SELECT * FROM SinhVien;`,
  },
  en: {
    html: `<!DOCTYPE html>
<html>
<title>HTML Tutorial</title>
<body>
  <h1>This is H1 tag</h1>
  <p>This is paragraph tag</p>
</body>
</html>`,
    css: `body {
  width: 100%;
  font-family: 'Roboto', sans-serif;
}

h1 {
  padding: 10px;
}

p {
  background-color: red;
  color: white;
}`,
    javascript: `<button onclick="changeText()">Click me</button>

<script>
function changeText() {
  let textElement = document.getElementById("text");
  textElement.innerHTML = "Content has changed!";
  textElement.style.color = "blue";
}
</script>`,
    python: `name = input("Enter your name: ")
age = input("Enter your age: ")
print("\\n--- Result ---")
print(f"Hello {name}")
print(f"You are {age} years old!")

age = int(age)
if age < 18:
  print("You are still young, study hard!")
elif age < 40:
  print("You are in your prime!")
else:
  print("Wish you good health and happiness!")`,
    sql: `CREATE TABLE Students (
  ID INT PRIMARY KEY,
  Name NVARCHAR(100),
  Age INT,
  Class NVARCHAR(50)
);

SELECT * FROM Students;`,
  },
  zh: {
    html: `<!DOCTYPE html>
<html>
<title>HTML教程</title>
<body>
  <h1>这是H1标签</h1>
  <p>这是段落标签</p>
</body>
</html>`,
    css: `body {
  width: 100%;
  font-family: 'Roboto', sans-serif;
}

h1 {
  padding: 10px;
}

p {
  background-color: red;
  color: white;
}`,
    javascript: `<button onclick="changeText()">点击我</button>

<script>
function changeText() {
  let textElement = document.getElementById("text");
  textElement.innerHTML = "内容已更改！";
  textElement.style.color = "blue";
}
</script>`,
    python: `name = input("输入你的名字: ")
age = input("输入你的年龄: ")
print("\\n--- 结果 ---")
print(f"你好 {name}")
print(f"你 {age} 岁了!")

age = int(age)
if age < 18:
  print("你还年轻，好好学习!")
elif age < 40:
  print("你正处于黄金年龄!")
else:
  print("祝你健康幸福!")`,
    sql: `CREATE TABLE Students (
  ID INT PRIMARY KEY,
  Name NVARCHAR(100),
  Age INT,
  Class NVARCHAR(50)
);

SELECT * FROM Students;`,
  },
};

// Hàm render code vào editor
function renderCodeExample(elementId, code) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerText = code;
  }
}

// Hàm cập nhật code examples theo ngôn ngữ
function updateCodeExamples(lang) {
  const examples = codeExamples[lang] || codeExamples.vi;

  renderCodeExample("html-code", examples.html);
  renderCodeExample("css-code", examples.css);
  renderCodeExample("java-code", examples.javascript);
  renderCodeExample("python-code", examples.python);
  renderCodeExample("sql-code", examples.sql);
}

// Render code ban đầu
const initialLang = window.currentLang || "vi";
updateCodeExamples(initialLang);

// Lắng nghe sự thay đổi ngôn ngữ để cập nhật code
window.addEventListener("languageChange", (e) => {
  updateCodeExamples(e.detail.lang);
});

// ===== SLIDESHOW (HOW TO SECTION) =====
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(
    ".howtosection-item:not(.background)"
  );
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  let currentSlide = 0;

  const showSlide = (index) => {
    slides.forEach((slide) => slide.classList.remove("active"));

    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    slides[currentSlide].classList.add("active");
  };

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide++;
      showSlide(currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide--;
      showSlide(currentSlide);
    });
  }

  // Auto slide mỗi 5 giây
  setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
  }, 5000);

  showSlide(0);
});

// ===== LIKE POPUP =====
const likeBtn = document.getElementById("likeBtn");
const likePopup = document.getElementById("likePopup");
const closePopup = document.getElementById("closePopup");

if (likeBtn && likePopup && closePopup) {
  likeBtn.addEventListener("click", () => {
    likePopup.style.display = "flex";
  });

  closePopup.addEventListener("click", () => {
    likePopup.style.display = "none";
  });

  // Đóng popup khi click ngoài
  window.addEventListener("click", (e) => {
    if (e.target === likePopup) {
      likePopup.style.display = "none";
    }
  });
}

// ===== DARK MODE =====
const darkModeBtn = document.getElementById("toggleDarkMode");

if (darkModeBtn) {
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}

document.addEventListener("click", function (e) {
  const a = e.target.closest && e.target.closest("a");
  if (!a) return;
  if (a.getAttribute("href") === "#top") {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(
      null,
      document.title,
      window.location.pathname + window.location.search
    );
  }
});

// ===== CHATBOT LAUNCHER POPUP =====
document.addEventListener("DOMContentLoaded", function () {
  const chatbotLauncher = document.getElementById("chatbot-launcher");
  let chatbotWindow = null;

  if (chatbotLauncher) {
    chatbotLauncher.addEventListener("click", function () {
      if (chatbotWindow && !chatbotWindow.closed) {
        chatbotWindow.focus();
      } else {
        chatbotWindow = window.open(
          "./public/Pages/chatbotAI.html",
          "MyCoursesChatbot",
          "width=420,height=700,scrollbars=no,resizable=yes,left=" +
            (screen.width - 420) +
            ",top=100"
        );
      }
    });
    window.addEventListener("beforeunload", function () {
      if (chatbotWindow && !chatbotWindow.closed) {
        chatbotWindow.close();
      }
    });
  }
});
