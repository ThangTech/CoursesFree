//Section mobile btn
const menuBtnMobile = document.getElementById("menu-btn-Mobile");
let isOpen = false;
const mobileMenuNav = document.getElementById("mobile-menu-nav");
const mobileNavClose = document.getElementById("mobile-nav-close");
const nestedCloseBtn = document.getElementById("nested-nav-close-btn");
menuBtnMobile.addEventListener("click", () => {
  if (isOpen) {
    //     mobileMenuNav.style.display = "none";
    mobileMenuNav.classList.remove("mobile-menu-nav-hidden");
    isOpen = false;
  } else {
    //     mobileMenuNav.style.display = "block";
    mobileMenuNav.classList.add("mobile-menu-nav-hidden");
    isOpen = true;
  }
});
mobileNavClose.addEventListener("click", () => {
  // mobileMenuNav.style.display = "none";
  mobileMenuNav.classList.remove("mobile-menu-nav-hidden");
  isOpen = false;
});
// Tutorial-btn
const nestedNavId = document.getElementById("nested-navigation-container-id");
const tuTorialBtn = document.getElementById("tutorial-btn");

const toggleTutorial = () => {
  tuTorialBtn.classList.toggle("bg-black");
  tuTorialBtn.classList.toggle("text-white");
  nestedNavId.classList.toggle("nested-navigation-hidden");
};
tuTorialBtn.addEventListener("click", toggleTutorial);
nestedCloseBtn.addEventListener("click", toggleTutorial);
// code-editor
const htmlCode = `
       <!DOCTYPE html>

       <html>

       <title>Hướng dẫn HTML</title>

       <body>
              <h1>Đây là thẻ H1</h1> 

              <p>Đây là là thẻ trang</p>
                    
       </body>

       </html>
`;
const htmlEditor = (document.getElementById("html-code").innerText = htmlCode);

const cssCode = `
       body {
       
         width: 100%;
         font-family: 'Roboto',sans-serif;
       }

       h1 {

       padding: 10px;
       }

       p {
       background-color: red;
       color: white;
       } 
`;
const cssEditor = (document.getElementById("css-code").innerText = cssCode);

const javaCode = `
       <button onclick="changeText()">Bấm vào tôi</button>

       <script>

              function changeText() {

              let textElement = document.getElementById("text");

              textElement.innerHTML = "Nội dung đã thay đổi nhờ JavaScript!";

              textElement.style.color = "blue";

       }

       </script>
`;
const javaEditor = (document.getElementById("java-code").innerText = javaCode);

const pythonCode = `
       ten = input("Nhập tên của bạn: ")
       tuoi = input("Nhập tuổi của bạn: ")
       print("\n--- Kết quả ---")
       print(f"Xin chào {ten}")
       print(f"Bạn {tuoi} tuổi rồi nhỉ!")

       tuoi = int(tuoi)
       if tuoi < 18:
       print("Bạn vẫn còn trẻ, hãy chăm học nhé!")
       elif tuoi < 40:
              print("Bạn đang ở độ tuổi sung sức nhất!")
       else:
              print("Chúc bạn luôn mạnh khỏe và hạnh phúc!")
`;
const pythonEditor = (document.getElementById("python-code").innerText =
  pythonCode);

const sqlCode = `
       CREATE TABLE SinhVien (
              ID INT PRIMARY KEY,
              Ten NVARCHAR(100),
              Tuoi INT,
              Lop NVARCHAR(50)
       );

       SELECT * FROM SinhVien;
`;
const sqlEditor = (document.getElementById("sql-code").innerText = sqlCode);

// howtosection slide
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

  nextBtn.addEventListener("click", () => {
    currentSlide++;
    showSlide(currentSlide);
  });

  prevBtn.addEventListener("click", () => {
    currentSlide--;
    showSlide(currentSlide);
  });

  setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
  }, 5000);

  showSlide(0);
});
//popup
  const likeBtn = document.getElementById("likeBtn");
  const likePopup = document.getElementById("likePopup");
  const closePopup = document.getElementById("closePopup");

  likeBtn.addEventListener("click", () => {
    likePopup.style.display = "flex";
  });

  closePopup.addEventListener("click", () => {
    likePopup.style.display = "none";
  });

  // Đóng popup khi click ra ngoài
  window.addEventListener("click", (e) => {
    if (e.target === likePopup) {
      likePopup.style.display = "none";
    }
  });
