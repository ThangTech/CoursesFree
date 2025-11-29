async function fetchCourseData() {
  try {
    const response = await fetch("./public/data/courses-data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Dữ liệu đã load:", data);

    return data;
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu:", error);
    return null;
  }
}

function normalizeKey(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\+\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/\s+/g, "_");
}

function renderTutorials(data) {
  const tutorialContainer = document.getElementById(
    "nested-navigation-container-id"
  );

  if (!tutorialContainer || !data.tutorials) {
    console.log("Không tìm thấy container hoặc data");
    return;
  }

  const contentDiv = tutorialContainer.querySelector(
    ".nested-navigation-container-content"
  );

  if (!contentDiv) {
    console.log("Không tìm thấy content div");
    return;
  }

  contentDiv.innerHTML =
    '<h1 data-translate="tutorial_title">Hướng dẫn</h1><div class="nested-navigation-container-data"></div>';

  const dataContainer = contentDiv.querySelector(
    ".nested-navigation-container-data"
  );

  console.log("Số lượng tutorials:", data.tutorials.length);

  data.tutorials.forEach((tutorial) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "nested-navigation-item";

    const categoryKey = `category_${normalizeKey(tutorial.category)}`;
    let lessonHTML = `<h2 data-translate="${categoryKey}">${tutorial.category}</h2>`;

    tutorial.items.forEach((item) => {
      const itemKey = `tutorial_${normalizeKey(
        tutorial.category
      )}_${normalizeKey(item.name)}`;
      lessonHTML += `<a href="${item.url}" target="_blank" data-translate="${itemKey}">Học ${item.name}</a><br>`;
    });

    categoryDiv.innerHTML = lessonHTML;
    dataContainer.appendChild(categoryDiv);
  });

  console.log("Render tutorials hoàn tất");

  if (typeof translatePage === "function") {
    const lang = window.currentLang || localStorage.getItem("language") || "vi";
    setTimeout(() => translatePage(lang), 0);
  }
}

function renderCourses(data) {
  const courseContainer = document.querySelector(".course-card");

  if (!courseContainer || !data.courses) return;

  courseContainer.innerHTML = "";

  data.courses.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.className = course.backgroundColor;

    const courseKey = `course_${normalizeKey(course.title)}`;
    const descKey = `course_desc_${normalizeKey(course.title)}`;
    const buttonKey = `learn_course_${normalizeKey(course.title)}`;

    console.log(`Course: ${course.title} → Key: ${courseKey}`);

    courseCard.innerHTML = `
      <h2 data-translate="${courseKey}">${course.title}</h2>
      <p data-translate="${descKey}">${course.description}</p>
      <a href="${course.links.official || "#"}" target="_blank">
        <button class="bg-black btn" data-translate="${buttonKey}">Học ${
      course.title
    }</button>
      </a>
    `;

    courseContainer.appendChild(courseCard);
  });

  if (typeof translatePage === "function") {
    const lang = window.currentLang || localStorage.getItem("language") || "vi";
    setTimeout(() => translatePage(lang), 0);
  }
}

async function initializeApp() {
  console.log("Ứng dụng đang khởi tạo...");

  const data = await fetchCourseData();

  if (data) {
    renderTutorials(data);
    renderCourses(data);
    console.log("Dữ liệu đã được render thành công!");
  } else {
    console.error("Không thể load dữ liệu");
  }
}


document.addEventListener("DOMContentLoaded", initializeApp);

window.addEventListener("languageChange", function (e) {
  console.log("Language changed, re-rendering courses and tutorials");
 
});
