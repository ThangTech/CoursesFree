// ===== MOBILE MENU =====
const menuBtnMobile = document.getElementById('menu-btn-Mobile');
const mobileMenuNav = document.getElementById('mobile-menu-nav');
const mobileNavClose = document.getElementById('mobile-nav-close');
let isMobileMenuOpen = false;

menuBtnMobile.addEventListener('click', () => {
  isMobileMenuOpen ? closeMobileMenu() : openMobileMenu();
});

mobileNavClose.addEventListener('click', closeMobileMenu);

function openMobileMenu() {
  mobileMenuNav.classList.add('mobile-menu-nav-hidden');
  isMobileMenuOpen = true;
}

function closeMobileMenu() {
  mobileMenuNav.classList.remove('mobile-menu-nav-hidden');
  isMobileMenuOpen = false;
}

// ===== NESTED NAVIGATION (HƯỚNG DẪN) =====
const tutorialBtn = document.getElementById('tutorial-btn');
const nestedNav = document.getElementById('nested-navigation-container-id');
const nestedCloseBtn = document.getElementById('nested-nav-close-btn');

if (tutorialBtn && nestedNav) {
  tutorialBtn.addEventListener('click', (e) => {
    e.preventDefault();
    nestedNav.classList.toggle('nested-navigation-hidden');
  });

  nestedCloseBtn.addEventListener('click', () => {
    nestedNav.classList.add('nested-navigation-hidden');
  });

  // Đóng nested nav khi click ngoài
  document.addEventListener('click', (e) => {
    if (!nestedNav.contains(e.target) && !tutorialBtn.contains(e.target)) {
      nestedNav.classList.add('nested-navigation-hidden');
    }
  });
}

// ===== CODE EDITORS (HIỂN THỊ CODE) =====
const codeExamples = {
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

SELECT * FROM SinhVien;`
};

// Hàm render code vào editor
function renderCodeExample(elementId, code) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerText = code;
  }
}

// Render tất cả code examples
renderCodeExample('html-code', codeExamples.html);
renderCodeExample('css-code', codeExamples.css);
renderCodeExample('java-code', codeExamples.javascript);
renderCodeExample('python-code', codeExamples.python);
renderCodeExample('sql-code', codeExamples.sql);

// ===== SLIDESHOW (HOW TO SECTION) =====
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.howtosection-item:not(.background)');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  let currentSlide = 0;

  const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide++;
      showSlide(currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
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
const likeBtn = document.getElementById('likeBtn');
const likePopup = document.getElementById('likePopup');
const closePopup = document.getElementById('closePopup');

if (likeBtn && likePopup && closePopup) {
  likeBtn.addEventListener('click', () => {
    likePopup.style.display = 'flex';
  });

  closePopup.addEventListener('click', () => {
    likePopup.style.display = 'none';
  });

  // Đóng popup khi click ngoài
  window.addEventListener('click', (e) => {
    if (e.target === likePopup) {
      likePopup.style.display = 'none';
    }
  });
}