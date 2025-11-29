var searchData = null;
var internalLinks = {
  'html': './public/Pages/Exercises/editorBased-html.html',
  'css': './public/Pages/Exercises/editorBased-html.html',
  'javascript': './public/Pages/Exercises/editorBased-js.html',
  'js': './public/Pages/Exercises/editorBased-js.html',
  'python': './public/Pages/Exercises/editorBased-python.html',
  'html editor': './public/Pages/Exercises/html-editor.html',
  'css editor': './public/Pages/Exercises/css-editor.html',
  'js editor': './public/Pages/Exercises/js-editor.html',
  'html quiz': './public/Pages/Exercises/html-quiz.html',
  'css quiz': './public/Pages/Exercises/css-quiz.html',
  'javascript quiz': './public/Pages/Exercises/js-quiz.html',
  'templates': './public/Pages/templates.html',
  'feedback': './public/Pages/feedback.html',
  'support': './public/Pages/support.html',
  'about': './public/Pages/aboutus.html',
  'profile': './public/Pages/profile.html',
  'login': './public/Pages/login.html'
};

async function loadSearchData() {
  try {
    const response = await fetch('./public/data/courses-data.json');
    searchData = await response.json();
  } catch (error) {
    console.error('Loi khi tai du lieu tim kiem:', error);
  }
}

function getInternalLink(name) {
  var nameLower = name.toLowerCase();
  for (var key in internalLinks) {
    if (nameLower.indexOf(key) !== -1) {
      return internalLinks[key];
    }
  }
  return null;
}

function performSearch(query) {
  if (!searchData || !query) {
    hideSearchResults();
    return;
  }

  query = query.toLowerCase().trim();
  var results = [];

  var exercises = [
    { name: 'HTML - Bai tap Code', url: './public/Pages/Exercises/html-editor.html', type: 'Bai tap' },
    { name: 'HTML - Trac nghiem', url: './public/Pages/Exercises/html-quiz.html', type: 'Bai tap' },
    { name: 'CSS - Bai tap Code', url: './public/Pages/Exercises/css-editor.html', type: 'Bai tap' },
    { name: 'CSS - Trac nghiem', url: './public/Pages/Exercises/css-quiz.html', type: 'Bai tap' },
    { name: 'JavaScript - Bai tap Code', url: './public/Pages/Exercises/js-editor.html', type: 'Bai tap' },
    { name: 'JavaScript - Trac nghiem', url: './public/Pages/Exercises/js-quiz.html', type: 'Bai tap' },
    { name: 'HTML Editor', url: './public/Pages/Exercises/editorBased-html.html', type: 'Cong cu' },
    { name: 'JavaScript Editor', url: './public/Pages/Exercises/editorBased-js.html', type: 'Cong cu' },
    { name: 'Python Editor', url: './public/Pages/Exercises/editorBased-python.html', type: 'Cong cu' }
  ];

  for (var i = 0; i < exercises.length; i++) {
    if (exercises[i].name.toLowerCase().indexOf(query) !== -1) {
      results.push(exercises[i]);
    }
  }

  var pages = [
    { name: 'Mau trang web', url: './public/Pages/templates.html', type: 'Trang', description: 'Kham pha cac mau HTML mien phi' },
    { name: 'Phan hoi', url: './public/Pages/feedback.html', type: 'Trang', description: 'Gui phan hoi cho chung toi' },
    { name: 'Ho tro', url: './public/Pages/support.html', type: 'Trang', description: 'Cau hoi thuong gap' },
    { name: 'Ve chung toi', url: './public/Pages/aboutus.html', type: 'Trang', description: 'Thong tin ve website' },
    { name: 'Ho so hoc tap', url: './public/Pages/profile.html', type: 'Trang', description: 'Xem tien do hoc tap' }
  ];

  for (var i = 0; i < pages.length; i++) {
    if (pages[i].name.toLowerCase().indexOf(query) !== -1) {
      results.push(pages[i]);
    }
  }

  if (searchData.tutorials) {
    for (var i = 0; i < searchData.tutorials.length; i++) {
      var tutorial = searchData.tutorials[i];
      for (var j = 0; j < tutorial.items.length; j++) {
        var item = tutorial.items[j];
        if (item.name.toLowerCase().indexOf(query) !== -1 || 
            tutorial.category.toLowerCase().indexOf(query) !== -1) {
          var internalUrl = getInternalLink(item.name);
          results.push({
            type: 'Tutorial',
            category: tutorial.category,
            name: item.name,
            url: internalUrl || item.url,
            isInternal: !!internalUrl
          });
        }
      }
    }
  }

  if (searchData.courses) {
    for (var i = 0; i < searchData.courses.length; i++) {
      var course = searchData.courses[i];
      if (course.title.toLowerCase().indexOf(query) !== -1 || 
          course.description.toLowerCase().indexOf(query) !== -1) {
        var internalUrl = getInternalLink(course.title);
        results.push({
          type: 'Khoa hoc',
          name: course.title,
          description: course.description,
          url: internalUrl || course.links.official || course.links.tutorial,
          isInternal: !!internalUrl
        });
      }
    }
  }

  displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
  var container = document.getElementById('search-results-container');
  
  if (!container) {
    container = document.createElement('div');
    container.id = 'search-results-container';
    container.className = 'search-results-overlay';
    document.body.appendChild(container);
  }

  if (results.length === 0) {
    container.innerHTML = 
      '<div class="search-results-box">' +
        '<div class="search-results-header">' +
          '<h3>Ket qua tim kiem cho: "' + query + '"</h3>' +
          '<button onclick="hideSearchResults()" class="close-search">×</button>' +
        '</div>' +
        '<div class="search-results-body">' +
          '<p class="no-results">Khong tim thay ket qua nao</p>' +
        '</div>' +
      '</div>';
  } else {
    var resultsHTML = '';
    for (var i = 0; i < results.length; i++) {
      var result = results[i];
      var target = result.isInternal ? '' : ' target="_blank"';
      resultsHTML += 
        '<div class="search-result-item">' +
          '<span class="result-type">' + result.type + '</span>' +
          '<a href="' + result.url + '"' + target + '>' +
            '<h4>' + result.name + '</h4>' +
            (result.category ? '<p class="result-category">' + result.category + '</p>' : '') +
            (result.description ? '<p class="result-desc">' + result.description + '</p>' : '') +
          '</a>' +
        '</div>';
    }

    container.innerHTML = 
      '<div class="search-results-box">' +
        '<div class="search-results-header">' +
          '<h3>Tim thay ' + results.length + ' ket qua cho: "' + query + '"</h3>' +
          '<button onclick="hideSearchResults()" class="close-search">×</button>' +
        '</div>' +
        '<div class="search-results-body">' +
          resultsHTML +
        '</div>' +
      '</div>';
  }

  container.style.display = 'flex';
}

function hideSearchResults() {
  var container = document.getElementById('search-results-container');
  if (container) {
    container.style.display = 'none';
  }
}

function initializeSearch() {
  loadSearchData();

  var searchInput = document.querySelector('.section-heading-search input');
  var searchIcon = document.querySelector('.section-heading-search i');
  var headerSearchIcon = document.querySelector('.toggleSearch');

  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch(this.value);
      }
    });
  }

  if (searchIcon) {
    searchIcon.addEventListener('click', function() {
      if (searchInput) {
        performSearch(searchInput.value);
      }
    });
  }

  if (headerSearchIcon) {
    headerSearchIcon.addEventListener('click', function() {
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  document.addEventListener('click', function(e) {
    var container = document.getElementById('search-results-container');
    if (container && e.target === container) {
      hideSearchResults();
    }
  });
}

window.hideSearchResults = hideSearchResults;

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

const tutorialBtn = document.getElementById("tutorial-btn");
const nestedNav = document.getElementById("nested-navigation-container-id");
const nestedCloseBtn = document.getElementById("nested-nav-close-btn");

if (tutorialBtn && nestedNav) {
  tutorialBtn.addEventListener("click", (e) => {
    e.preventDefault();
    nestedNav.classList.toggle("nested-navigation-hidden");

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

  document.addEventListener("click", (e) => {
    if (!nestedNav.contains(e.target) && !tutorialBtn.contains(e.target)) {
      nestedNav.classList.add("nested-navigation-hidden");
    }
  });
}

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

function renderCodeExample(elementId, code) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerText = code;
  }
}

function updateCodeExamples(lang) {
  const examples = codeExamples[lang] || codeExamples.vi;

  renderCodeExample("html-code", examples.html);
  renderCodeExample("css-code", examples.css);
  renderCodeExample("java-code", examples.javascript);
  renderCodeExample("python-code", examples.python);
  renderCodeExample("sql-code", examples.sql);
}

const initialLang = window.currentLang || "vi";
updateCodeExamples(initialLang);

window.addEventListener("languageChange", (e) => {
  updateCodeExamples(e.detail.lang);
});

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

  setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
  }, 5000);

  showSlide(0);
});

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

  window.addEventListener("click", (e) => {
    if (e.target === likePopup) {
      likePopup.style.display = "none";
    }
  });
}

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

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const authContainer = document.getElementById('auth-container');

  if (currentUser) {
  authContainer.innerHTML = `
    <div class="auth-container">
      <div class="user-greeting">
        <span>
          Xin chào, 
          <strong>${currentUser.name}</strong>
        </span>
      </div>
      <button id="logout-btn" class="logout-btn">Đăng xuất</button>
      ${currentUser.username === 'admin' ? `
        <a href="../../public/Admin/admin.html" class="admin-link">Admin</a>
      ` : ''}
    </div>
  `;
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Bạn có chắc muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        location.reload();
      }
    });
  }
}
});

document.addEventListener('DOMContentLoaded', initializeSearch);
