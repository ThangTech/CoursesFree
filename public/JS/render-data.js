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
  
  if (!tutorialContainer || !data.tutorials) {
    console.log('Không tìm thấy container hoặc data');
    return;
  }
  
  const contentDiv = tutorialContainer.querySelector('.nested-navigation-container-content');
  
  if (!contentDiv) {
    console.log('Không tìm thấy content div');
    return;
  }
  
  contentDiv.innerHTML = '<h1>Hướng dẫn</h1><div class="nested-navigation-container-data"></div>';
  
  const dataContainer = contentDiv.querySelector('.nested-navigation-container-data');
  
  console.log('Số lượng tutorials:', data.tutorials.length);
  
  data.tutorials.forEach(tutorial => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'nested-navigation-item';
    
    let lessonHTML = `<h2>${tutorial.category}</h2>`;
    
    tutorial.items.forEach(item => {
      lessonHTML += `<a href="${item.url}" target="_blank">Học ${item.name}</a><br>`;
    });
    
    categoryDiv.innerHTML = lessonHTML;
    dataContainer.appendChild(categoryDiv);
  });
  
  console.log('Render tutorials hoàn tất');
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

// Code examples đã được xử lý trong script.js

// ===== KHỞI TẠO ỨNG DỤNG =====
async function initializeApp() {
  console.log('Ứng dụng đang khởi tạo...');
  
  const data = await fetchCourseData();
  
  if (data) {
    renderTutorials(data);
    renderCourses(data);
    console.log('Dữ liệu đã được render thành công!');
  } else {
    console.error('Không thể load dữ liệu');
  }
}

// ===== GỌI HÀM CHÍNH KHI PAGE LOAD =====
document.addEventListener('DOMContentLoaded', initializeApp);