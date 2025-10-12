// ===== FETCH DỮ LIỆU TỪ JSON =====
async function fetchCourseData() {
  try {
    const response = await fetch('./public/data/courses-data.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Dữ liệu đã load:', data);
    
    return data;
  } catch (error) {
    console.error('Lỗi khi fetch dữ liệu:', error);
    return null;
  }
}

// ===== RENDER TUTORIALS (HƯỚNG DẪN) =====
function renderTutorials(data) {
  const tutorialContainer = document.getElementById('nested-navigation-container-id');
  
  if (!tutorialContainer || !data.tutorials) return;
  
  const contentDiv = tutorialContainer.querySelector('.nested-navigation-container-content');
  
  contentDiv.innerHTML = '<h1>Hướng dẫn</h1><div class="nested-navigation-container-data"></div>';
  
  const dataContainer = contentDiv.querySelector('.nested-navigation-container-data');
  
  data.tutorials.forEach(tutorial => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'nested-navigation-item';
    
    let lessonHTML = `<h2>${tutorial.category}</h2>`;
    
    tutorial.lessons.forEach(lesson => {
      lessonHTML += `<a href="${lesson.links.tutorial || '#'}" target="_blank">${lesson.title}</a>`;
    });
    
    categoryDiv.innerHTML = lessonHTML;
    dataContainer.appendChild(categoryDiv);
  });
}

// ===== RENDER COURSES (KHÓA HỌC) =====
function renderCourses(data) {
  const courseContainer = document.querySelector('.course-card');
  
  if (!courseContainer || !data.courses) return;
  
  courseContainer.innerHTML = '';
  
  data.courses.forEach(course => {
    const courseCard = document.createElement('div');
    courseCard.className = course.backgroundColor;
    
    courseCard.innerHTML = `
      <h2>${course.title}</h2>
      <p>${course.description}</p>
      <a href="${course.links.official || '#'}" target="_blank">
        <button class="bg-black btn">Học ${course.title}</button>
      </a>
    `;
    
    courseContainer.appendChild(courseCard);
  });
}

// ===== RENDER CODE EXAMPLES =====
function renderCodeExamples(data) {
  const htmlCodeElement = document.getElementById('html-code');
  if (htmlCodeElement) {
    htmlCodeElement.innerHTML = `
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;My Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Hello World&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
    `;
  }
  
  const cssCodeElement = document.getElementById('css-code');
  if (cssCodeElement) {
    cssCodeElement.innerHTML = `
      <pre><code>body {
  font-family: Arial, sans-serif;
  background-color: #f3f4f6;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #1f2937;
  text-align: center;
}</code></pre>
    `;
  }
  
  const jsCodeElement = document.getElementById('java-code');
  if (jsCodeElement) {
    jsCodeElement.innerHTML = `
      <pre><code>const greeting = (name) => {
  console.log(\`Hello, \${name}!\`);
};

greeting('Developer');</code></pre>
    `;
  }
  
  const pythonCodeElement = document.getElementById('python-code');
  if (pythonCodeElement) {
    pythonCodeElement.innerHTML = `
      <pre><code>def greet(name):
    print(f"Hello, {name}!")

greet("Developer")</code></pre>
    `;
  }
  
  const sqlCodeElement = document.getElementById('sql-code');
  if (sqlCodeElement) {
    sqlCodeElement.innerHTML = `
      <pre><code>SELECT * FROM users 
WHERE age > 18 
ORDER BY created_at DESC;</code></pre>
    `;
  }
}

// ===== KHỞI TẠO ỨNG DỤNG =====
async function initializeApp() {
  console.log('Ứng dụng đang khởi tạo...');
  
  const data = await fetchCourseData();
  
  if (data) {
    renderTutorials(data);
    renderCourses(data);
    renderCodeExamples(data);
    console.log('Dữ liệu đã được render thành công!');
  } else {
    console.error('Không thể load dữ liệu');
  }
}

// ===== GỌI HÀM CHÍNH KHI PAGE LOAD =====
document.addEventListener('DOMContentLoaded', initializeApp);