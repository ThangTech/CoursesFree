// Dữ liệu dịch
const translations = {
  vi: {
    site_title: "My's Course",
    tutorial: "Hướng dẫn",
    references: "Tài liệu",
    exercises: "Luyện tập",
    video: "Video",
    menu: "Danh mục",
    certificate: "Hồ sơ học tập",
    project: "Dự án của tôi",
    login: "Đăng nhập",
    welcome: "Bắt đầu học",
    welcome_desc: "Từng bước xây dựng kỹ năng lập trình web",
    search_placeholder: "Tìm kiếm hướng dẫn về HTML, CSS,...",
    start_guide: "Không biết bắt đầu từ đâu?",
    html_title: "HTML",
    html_desc: "Ngôn ngữ để xây dựng trang web",
    learn_html: "Học HTML",
    html_video: "Video hướng dẫn",
    html_reference: "Tài liệu HTML",
    html_structure: "Cấu trúc HTML",
    try_now: "Thử ngay",
    css_title: "CSS",
    css_desc: "Định dạng và trình bày trang web",
    learn_css: "Học CSS",
    css_video: "Video hướng dẫn",
    css_reference: "Tài liệu CSS",
    css_structure: "Cấu trúc CSS",
    js_title: "Javascript",
    js_desc: "Giúp trang web trở nên động và linh hoạt",
    learn_js: "Học Javascript",
    js_video: "Video hướng dẫn",
    js_reference: "Tài liệu Javascript",
    js_structure: "Cấu trúc JavaScript",
    python_title: "Python",
    python_desc: "Làm việc với dữ liệu và AI",
    learn_python: "Học Python",
    python_video: "Video hướng dẫn",
    python_reference: "Tài liệu Python",
    python_structure: "Cấu trúc Python",
    sql_title: "SQL",
    sql_desc: "Quản lý và thao tác dữ liệu",
    learn_sql: "Học SQL",
    sql_video: "Video hướng dẫn",
    sql_reference: "Tài liệu SQL",
    sql_structure: "Cấu trúc SQL",
    exercises_quizzes: "Bài tập và Quizzes",
    exercises_desc: "Kiểm tra kĩ năng của bạn",
    quizzes: "Quizzes",
    web_templates: "Mẫu trang web",
    web_templates_desc: "Bộ sưu tập mẫu HTML miễn phí",
    explore_now: "Khám phá ngay",
    web_layout: "Bố cục trong trang web",
    web_layout_desc: "Đoạn mã cho HTML, CSS và JavaScript",
    slideshow_howto: "Cách tạo slideshow:",
    learn_howto: "Học cách tạo",
    support: "Hỗ trợ",
    free_resources: "Tài liệu miễn phí",
    feedback: "Phản hồi",
    about_us: "Về chúng tôi",
    copyright:
      "© 2025 Học Lập Trình Online. Nền tảng học lập trình dành cho mọi đối tượng – từ người mới bắt đầu đến lập trình viên chuyên nghiệp. Chúng tôi cam kết mang đến kiến thức chất lượng, cập nhật xu hướng công nghệ và hỗ trợ bạn xây dựng sự nghiệp vững chắc trong lĩnh vực IT.",
    thanks_support: "Cảm ơn đã ủng hộ!",
    follow_me: "Theo dõi tôi tại:",
    lang_vi: "🇻🇳 Tiếng Việt",
    lang_en: "🇺🇸 English",
    lang_zh: "🇨🇳 简体中文",
    github_link: "github.com/ThangTech",

    // CODE EXAMPLES
    html_code_title: "Hướng dẫn HTML",
    html_code_h1: "Đây là thẻ H1",
    html_code_p: "Đây là thẻ paragraph",

    // KEY CHO RENDER-DATA.JS - TUTORIALS
    tutorial_title: "Hướng dẫn",
    category_html: "HTML",
    category_css: "CSS",
    category_javascript: "JavaScript",
    category_python: "Python",
    category_sql: "SQL",
    tutorial_html_introduction: "Học Giới thiệu HTML",
    tutorial_html_elements: "Học Các phần tử HTML",
    tutorial_css_syntax: "Học Cú pháp CSS",
    tutorial_css_selectors: "Học Bộ chọn CSS",

    // KEY CHO COURSES CARD
    course_html: "HTML",
    course_desc_html: "Ngôn ngữ đánh dấu để tạo cấu trúc trang web",
    learn_course_html: "Học HTML",

    course_css: "CSS",
    course_desc_css: "Ngôn ngữ định kiểu để thiết kế giao diện",
    learn_course_css: "Học CSS",

    course_javascript: "JavaScript",
    course_desc_javascript: "Giúp trang web trở nên động và linh hoạt",
    learn_course_javascript: "Học JavaScript",

    course_python: "Python",
    course_desc_python: "Làm việc với dữ liệu và AI",
    learn_course_python: "Học Python",

    course_sql: "SQL",
    course_desc_sql: "Quản lý và thao tác dữ liệu",
    learn_course_sql: "Học SQL",

    course_php: "PHP",
    course_desc_php: "Ngôn ngữ lập trình web phía server",
    learn_course_php: "Học PHP",

    course_react: "React",
    course_desc_react: "Thư viện JavaScript để xây dựng giao diện",
    learn_course_react: "Học React",

    course_bootstrap: "Bootstrap",
    course_desc_bootstrap: "Framework CSS cho thiết kế responsive",
    learn_course_bootstrap: "Học Bootstrap",

    // THÊM MỚI: JQuery, Java, C++, C#
    course_jquery: "JQuery",
    course_desc_jquery: "Thư viện JavaScript phát triển trang web",
    learn_course_jquery: "Học JQuery",

    course_java: "Java",
    course_desc_java: "Ngôn ngữ lập trình mạnh mẽ",
    learn_course_java: "Học Java",

    course_cplus: "C++",
    course_desc_cplus: "Ngôn ngữ lập trình hiệu suất cao",
    learn_course_cplus: "Học C++",

    course_csharp: "C#",
    course_desc_csharp: "Ngôn ngữ lập trình hiện đại từ Microsoft",
    learn_course_csharp: "Học C#",

    // KEY CHO RENDER-EXERCISE.JS
    exercise_html_editor_title: "HTML - Bài tập Code",
    exercise_html_editor_desc: "Thực hành viết code HTML",
    exercise_html_quiz_title: "HTML - Trắc nghiệm",
    exercise_html_quiz_desc: "Kiểm tra kiến thức HTML",
    exercise_css_editor_title: "CSS - Bài tập Code",
    exercise_css_editor_desc: "Thực hành viết code CSS",
    exercise_css_quiz_title: "CSS - Trắc nghiệm",
    exercise_css_quiz_desc: "Kiểm tra kiến thức CSS",
    exercise_js_editor_title: "JavaScript - Bài tập Code",
    exercise_js_editor_desc: "Thực hành viết code JavaScript",
    exercise_js_quiz_title: "JavaScript - Trắc nghiệm",
    exercise_js_quiz_desc: "Kiểm tra kiến thức JavaScript",

    // KEY CHO RENDER-REFERENCES.JS
    references_title: "Tài liệu",
    document_link: "[Tài liệu]",
    pdf_link: "[PDF]",
    ref_category_html: "HTML",
    ref_category_css: "CSS",
    ref_category_javascript: "JavaScript",
    ref_item_html_introduction: "Giới thiệu HTML",
    ref_item_html_elements: "Các phần tử HTML",
    ref_item_css_syntax: "Cú pháp CSS",
    ref_item_css_selectors: "Bộ chọn CSS",
  },
  en: {
    site_title: "My's Course",
    tutorial: "Tutorial",
    references: "References",
    exercises: "Exercises",
    video: "Video",
    menu: "Menu",
    certificate: "Learning Profile",
    project: "My Project",
    login: "Login",
    welcome: "Get Started",
    welcome_desc: "Step-by-step web programming skills",
    search_placeholder: "Search for HTML, CSS tutorials,...",
    start_guide: "Not sure where to start?",
    html_title: "HTML",
    html_desc: "The language for building web pages",
    learn_html: "Learn HTML",
    html_video: "Video Tutorial",
    html_reference: "HTML Reference",
    html_structure: "HTML Structure",
    try_now: "Try it Now",
    css_title: "CSS",
    css_desc: "Style and layout for web pages",
    learn_css: "Learn CSS",
    css_video: "Video Tutorial",
    css_reference: "CSS Reference",
    css_structure: "CSS Structure",
    js_title: "JavaScript",
    js_desc: "Make web pages dynamic and interactive",
    learn_js: "Learn JavaScript",
    js_video: "Video Tutorial",
    js_reference: "JavaScript Reference",
    js_structure: "JavaScript Structure",
    python_title: "Python",
    python_desc: "Work with data and AI",
    learn_python: "Learn Python",
    python_video: "Video Tutorial",
    python_reference: "Python Reference",
    python_structure: "Python Structure",
    sql_title: "SQL",
    sql_desc: "Manage and manipulate data",
    learn_sql: "Learn SQL",
    sql_video: "Video Tutorial",
    sql_reference: "SQL Reference",
    sql_structure: "SQL Structure",
    exercises_quizzes: "Exercises and Quizzes",
    exercises_desc: "Test your skills",
    quizzes: "Quizzes",
    web_templates: "Web Templates",
    web_templates_desc: "Collection of free HTML templates",
    explore_now: "Explore Now",
    web_layout: "Web Layout",
    web_layout_desc: "Code snippets for HTML, CSS, and JavaScript",
    slideshow_howto: "How to create a slideshow:",
    learn_howto: "Learn How to Create",
    support: "Support",
    free_resources: "Free Resources",
    feedback: "Feedback",
    about_us: "About Us",
    copyright:
      "© 2025 Online Programming Learning. A platform for all learners – from beginners to professional developers. We are committed to providing high-quality knowledge, keeping up with technology trends, and helping you build a solid career in IT.",
    thanks_support: "Thanks for your support!",
    follow_me: "Follow me at:",
    lang_vi: "🇻🇳 Vietnamese",
    lang_en: "🇺🇸 English",
    lang_zh: "🇨🇳 Simplified Chinese",
    github_link: "github.com/ThangTech",

    // CODE EXAMPLES
    html_code_title: "HTML Tutorial",
    html_code_h1: "This is H1 tag",
    html_code_p: "This is paragraph tag",

    // TUTORIALS
    tutorial_title: "Tutorial",
    category_html: "HTML",
    category_css: "CSS",
    category_javascript: "JavaScript",
    category_python: "Python",
    category_sql: "SQL",
    tutorial_html_introduction: "Learn HTML Introduction",
    tutorial_html_elements: "Learn HTML Elements",
    tutorial_css_syntax: "Learn CSS Syntax",
    tutorial_css_selectors: "Learn CSS Selectors",

    // COURSES CARD
    course_html: "HTML",
    course_desc_html: "Markup language for creating web structures",
    learn_course_html: "Learn HTML",

    course_css: "CSS",
    course_desc_css: "Styling language for designing interfaces",
    learn_course_css: "Learn CSS",

    course_javascript: "JavaScript",
    course_desc_javascript: "Make web pages dynamic and interactive",
    learn_course_javascript: "Learn JavaScript",

    course_python: "Python",
    course_desc_python: "Work with data and AI",
    learn_course_python: "Learn Python",

    course_sql: "SQL",
    course_desc_sql: "Manage and manipulate data",
    learn_course_sql: "Learn SQL",

    course_php: "PHP",
    course_desc_php: "Server-side web programming language",
    learn_course_php: "Learn PHP",

    course_react: "React",
    course_desc_react: "JavaScript library for building UI",
    learn_course_react: "Learn React",

    course_bootstrap: "Bootstrap",
    course_desc_bootstrap: "CSS framework for responsive design",
    learn_course_bootstrap: "Learn Bootstrap",

    // THÊM MỚI: JQuery, Java, C++, C#
    course_jquery: "JQuery",
    course_desc_jquery: "JavaScript library for web development",
    learn_course_jquery: "Learn JQuery",

    course_java: "Java",
    course_desc_java: "Powerful programming language",
    learn_course_java: "Learn Java",

    course_cplus: "C++",
    course_desc_cplus: "High-performance programming language",
    learn_course_cplus: "Learn C++",

    course_csharp: "C#",
    course_desc_csharp: "Modern programming language from Microsoft",
    learn_course_csharp: "Learn C#",

    // EXERCISES
    exercise_html_editor_title: "HTML - Code Exercise",
    exercise_html_editor_desc: "Practice writing HTML code",
    exercise_html_quiz_title: "HTML - Quiz",
    exercise_html_quiz_desc: "Test your HTML knowledge",
    exercise_css_editor_title: "CSS - Code Exercise",
    exercise_css_editor_desc: "Practice writing CSS code",
    exercise_css_quiz_title: "CSS - Quiz",
    exercise_css_quiz_desc: "Test your CSS knowledge",
    exercise_js_editor_title: "JavaScript - Code Exercise",
    exercise_js_editor_desc: "Practice writing JavaScript code",
    exercise_js_quiz_title: "JavaScript - Quiz",
    exercise_js_quiz_desc: "Test your JavaScript knowledge",

    // REFERENCES
    references_title: "References",
    document_link: "[Document]",
    pdf_link: "[PDF]",
    ref_category_html: "HTML",
    ref_category_css: "CSS",
    ref_category_javascript: "JavaScript",
    ref_item_html_introduction: "HTML Introduction",
    ref_item_html_elements: "HTML Elements",
    ref_item_css_syntax: "CSS Syntax",
    ref_item_css_selectors: "CSS Selectors",
  },
  zh: {
    site_title: "My's Course",
    tutorial: "教程",
    references: "参考资料",
    exercises: "练习",
    video: "视频",
    menu: "菜单",
    certificate: "学习档案",
    project: "我的项目",
    login: "登录",
    welcome: "开始学习",
    welcome_desc: "一步步构建网页编程技能",
    search_placeholder: "搜索HTML、CSS教程等...",
    start_guide: "不知道从哪里开始？",
    html_title: "HTML",
    html_desc: "用于构建网页的语言",
    learn_html: "学习HTML",
    html_video: "视频教程",
    html_reference: "HTML参考",
    html_structure: "HTML结构",
    try_now: "立即尝试",
    css_title: "CSS",
    css_desc: "网页的样式和布局",
    learn_css: "学习CSS",
    css_video: "视频教程",
    css_reference: "CSS参考",
    css_structure: "CSS结构",
    js_title: "JavaScript",
    js_desc: "使网页动态和交互",
    learn_js: "学习JavaScript",
    js_video: "视频教程",
    js_reference: "JavaScript参考",
    js_structure: "JavaScript结构",
    python_title: "Python",
    python_desc: "处理数据和人工智能",
    learn_python: "学习Python",
    python_video: "视频教程",
    python_reference: "Python参考",
    python_structure: "Python结构",
    sql_title: "SQL",
    sql_desc: "管理和操作数据",
    learn_sql: "学习SQL",
    sql_video: "视频教程",
    sql_reference: "SQL参考",
    sql_structure: "SQL结构",
    exercises_quizzes: "练习和测验",
    exercises_desc: "测试你的技能",
    quizzes: "测验",
    web_templates: "网页模板",
    web_templates_desc: "免费HTML模板集合",
    explore_now: "立即探索",
    web_layout: "网页布局",
    web_layout_desc: "HTML、CSS和JavaScript的代码片段",
    slideshow_howto: "如何创建幻灯片：",
    learn_howto: "学习如何创建",
    support: "支持",
    free_resources: "免费资源",
    feedback: "反馈",
    about_us: "关于我们",
    copyright:
      "© 2025 在线编程学习。面向所有学习者的平台——从初学者到专业开发者。我们致力于提供高质量的知识，跟上技术趋势，帮助您在IT领域建立稳固的职业生涯。",
    thanks_support: "感谢您的支持！",
    follow_me: "在以下平台关注我：",
    lang_vi: "🇻🇳 越南语",
    lang_en: "🇺🇸 英语",
    lang_zh: "🇨🇳 简体中文",
    github_link: "github.com/ThangTech",

    // CODE EXAMPLES
    html_code_title: "HTML教程",
    html_code_h1: "这是H1标签",
    html_code_p: "这是段落标签",

    // TUTORIALS
    tutorial_title: "教程",
    category_html: "HTML",
    category_css: "CSS",
    category_javascript: "JavaScript",
    category_python: "Python",
    category_sql: "SQL",
    tutorial_html_introduction: "学习HTML介绍",
    tutorial_html_elements: "学习HTML元素",
    tutorial_css_syntax: "学习CSS语法",
    tutorial_css_selectors: "学习CSS选择器",

    // COURSES CARD
    course_html: "HTML",
    course_desc_html: "用于创建网页结构的标记语言",
    learn_course_html: "学习HTML",

    course_css: "CSS",
    course_desc_css: "用于设计界面的样式语言",
    learn_course_css: "学习CSS",

    course_javascript: "JavaScript",
    course_desc_javascript: "使网页动态和交互",
    learn_course_javascript: "学习JavaScript",

    course_python: "Python",
    course_desc_python: "处理数据和人工智能",
    learn_course_python: "学习Python",

    course_sql: "SQL",
    course_desc_sql: "管理和操作数据",
    learn_course_sql: "学习SQL",

    course_php: "PHP",
    course_desc_php: "服务器端网页编程语言",
    learn_course_php: "学习PHP",

    course_react: "React",
    course_desc_react: "用于构建UI的JavaScript库",
    learn_course_react: "学习React",

    course_bootstrap: "Bootstrap",
    course_desc_bootstrap: "响应式设计的CSS框架",
    learn_course_bootstrap: "学习Bootstrap",

    // THÊM MỚI: JQuery, Java, C++, C#
    course_jquery: "JQuery",
    course_desc_jquery: "JavaScript网页开发库",
    learn_course_jquery: "学习JQuery",

    course_java: "Java",
    course_desc_java: "强大的编程语言",
    learn_course_java: "学习Java",

    course_cplus: "C++",
    course_desc_cplus: "高性能编程语言",
    learn_course_cplus: "学习C++",

    course_csharp: "C#",
    course_desc_csharp: "微软现代编程语言",
    learn_course_csharp: "学习C#",

    // EXERCISES
    exercise_html_editor_title: "HTML - 代码练习",
    exercise_html_editor_desc: "练习编写HTML代码",
    exercise_html_quiz_title: "HTML - 测验",
    exercise_html_quiz_desc: "测试你的HTML知识",
    exercise_css_editor_title: "CSS - 代码练习",
    exercise_css_editor_desc: "练习编写CSS代码",
    exercise_css_quiz_title: "CSS - 测验",
    exercise_css_quiz_desc: "测试你的CSS知识",
    exercise_js_editor_title: "JavaScript - 代码练习",
    exercise_js_editor_desc: "练习编写JavaScript代码",
    exercise_js_quiz_title: "JavaScript - 测验",
    exercise_js_quiz_desc: "测试你的JavaScript知识",

    // REFERENCES
    references_title: "参考资料",
    document_link: "[文档]",
    pdf_link: "[PDF]",
    ref_category_html: "HTML",
    ref_category_css: "CSS",
    ref_category_javascript: "JavaScript",
    ref_item_html_introduction: "HTML介绍",
    ref_item_html_elements: "HTML元素",
    ref_item_css_syntax: "CSS语法",
    ref_item_css_selectors: "CSS选择器",
  },
};

// Phần code còn lại giữ nguyên...
let currentLang = "vi";

function saveLanguage(lang) {
  localStorage.setItem("language", lang);
}

function getSavedLanguage() {
  return localStorage.getItem("language") || "vi";
}

function translatePage(lang) {
  currentLang = lang;
  window.currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === "BUTTON" || element.tagName === "A") {
        const icon = element.querySelector("i");
        if (icon) {
          element.innerHTML = translations[lang][key] + " " + icon.outerHTML;
        } else {
          element.textContent = translations[lang][key];
        }
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });

  document
    .querySelectorAll("[data-translate-placeholder]")
    .forEach((element) => {
      const key = element.getAttribute("data-translate-placeholder");
      if (translations[lang] && translations[lang][key]) {
        element.placeholder = translations[lang][key];
      }
    });

  updateCodeExamples(lang);
  saveLanguage(lang);
  window.dispatchEvent(new CustomEvent("languageChange", { detail: { lang } }));
}

function updateCodeExamples(lang) {
  
}

window.translatePage = translatePage;
window.translations = translations;
window.currentLang = currentLang;
window.getSavedLanguage = getSavedLanguage;

document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("languageSelect");
  const savedLang = getSavedLanguage();

  currentLang = savedLang;
  window.currentLang = savedLang;

  if (languageSelect) {
    languageSelect.value = savedLang;
  }

  translatePage(savedLang);

  if (languageSelect) {
    languageSelect.addEventListener("change", function () {
      translatePage(this.value);
    });
  }
});
