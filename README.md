# 📚 My Course - Nền tảng học lập trình miễn phí

Website học lập trình với trải nghiệm người dùng tối ưu, tập trung vào HTML, CSS, JavaScript, Python và các ngôn ngữ lập trình khác.

## ✨ Tính năng

### 👤 Cho người dùng
- **Đăng ký/Đăng nhập** - Quản lý tài khoản cá nhân
- **Hồ sơ học tập** - Theo dõi tiến độ với contribution graph
- **Editor code trực tuyến** - Ace Editor với syntax highlighting
- **Bài tập & Quiz** - Luyện tập HTML, CSS, JavaScript
- **Video hướng dẫn** - Tích hợp YouTube
- **Templates** - Bộ sưu tập template từ GitHub
- **Đa ngôn ngữ** - Tiếng Việt, English, 简体中文
- **Dark Mode** - Chế độ tối bảo vệ mắt

### 🔧 Cho admin
- **Admin Panel** - Quản lý người dùng
- **Thống kê** - Xem tổng quan hoạt động
- **Search & Filter** - Tìm kiếm và lọc người dùng

## 🚀 Cài đặt

### Yêu cầu
- Web browser hiện đại (Chrome, Firefox, Safari, Edge)
- Không cần backend server (chạy trên localStorage)

### Bước 1: Clone repository
\`\`\`bash
git clone https://github.com/ThangTech/WebFreeCourse.git
cd WebFreeCourse
\`\`\`

### Bước 2: Cấu hình API Keys
1. Mở file `public/JS/config.js`
2. Thay thế các API keys bằng keys của bạn:

\`\`\`javascript
const AppConfig = {
  api: {
    emailjs: {
      publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
      serviceId: "YOUR_SERVICE_ID",
      templateId: "YOUR_TEMPLATE_ID",
    },
    youtube: {
      apiKey: "YOUR_YOUTUBE_API_KEY", // Optional
      enabled: false,
    },
  },
  // ...
};
\`\`\`

### Bước 3: Chạy website
1. **Option 1: Live Server (VS Code)**
   - Cài extension "Live Server"
   - Click chuột phải vào `index.html` → "Open with Live Server"

2. **Option 2: Python HTTP Server**
   \`\`\`bash
   python -m http.server 8000
   \`\`\`
   Mở browser: `http://localhost:8000`

3. **Option 3: Node.js HTTP Server**
   \`\`\`bash
   npx http-server
   \`\`\`

## 📂 Cấu trúc thư mục

\`\`\`
WebFreeCourse/
├── index.html              # Trang chủ
├── video-player.html       # Trình phát video
├── .gitignore             # Git ignore config
│
├── public/
│   ├── Admin/             # Admin panel
│   │   ├── admin.html
│   │   ├── admin.js
│   │   └── admin.css
│   │
│   ├── CSS/               # Stylesheets
│   │   ├── style.css      # Main styles
│   │   ├── darkmode.css   # Dark mode
│   │   ├── toast.css      # Toast notifications
│   │   └── ...
│   │
│   ├── JS/                # JavaScript files
│   │   ├── config.js      # 🔐 API keys (KHÔNG commit)
│   │   ├── editorConfig.js # Editor config chung
│   │   ├── editorBased-html.js
│   │   ├── editorBased-js.js
│   │   ├── editorBased-python.js
│   │   ├── login.js
│   │   ├── profile.js
│   │   ├── script.js
│   │   └── ...
│   │
│   ├── Pages/             # HTML pages
│   │   ├── login.html
│   │   ├── profile.html
│   │   ├── feedback.html
│   │   ├── aboutus.html
│   │   ├── support.html
│   │   ├── templates.html
│   │   └── Exercises/     # Bài tập
│   │       ├── editorBased-html.html
│   │       ├── editorBased-js.html
│   │       ├── editorBased-python.html
│   │       ├── html-quiz.html
│   │       └── ...
│   │
│   ├── data/              # JSON data
│   │   ├── courses-data.json
│   │   └── templates.json
│   │
│   └── Storage/           # Images & assets
│       └── Images/
│
└── README.md              # This file
\`\`\`

## 🔑 Tài khoản Admin

**Username:** `admin`  
**Password:** `admin123`

⚠️ **LƯU Ý:** Thay đổi password trong production bằng cách sửa file `public/JS/config.js`

## 💡 Sử dụng

### Đăng ký tài khoản mới
1. Nhấn nút "Đăng nhập" trên header
2. Chuyển sang tab "Đăng ký"
3. Điền thông tin và nhấn "Đăng ký"

### Làm bài tập
1. Vào menu "Luyện tập"
2. Chọn HTML/CSS/JavaScript Editor
3. Viết code và xem preview real-time
4. Code tự động lưu vào localStorage

### Xem hồ sơ học tập
1. Nhấn "Hồ sơ học tập" trên header
2. Xem contribution graph và bài học đã hoàn thành
3. Chỉnh sửa thông tin cá nhân

### Admin Panel
1. Đăng nhập bằng tài khoản admin
2. Truy cập `/public/Admin/admin.html`
3. Xem thống kê và quản lý users

## 🛠️ Cấu hình nâng cao

### Thay đổi Editor Theme
Sửa trong `public/JS/editorConfig.js`:

\`\`\`javascript
defaults: {
  theme: "ace/theme/monokai", // Đổi thành: github, tomorrow, twilight, etc.
  fontSize: "14px",
  // ...
}
\`\`\`

### Thêm ngôn ngữ mới
1. Thêm vào `editorConfig.js`:
\`\`\`javascript
modes: {
  java: "ace/mode/java",
  // ...
}
\`\`\`

2. Thêm template code:
\`\`\`javascript
templates: {
  java: \`public class Main {
    public static void main(String[] args) {
      System.out.println("Hello World");
    }
  }\`
}
\`\`\`

## 📝 API Keys cần thiết

### EmailJS (cho feedback form)
1. Đăng ký tại: https://www.emailjs.com/
2. Tạo service và template
3. Copy keys vào `config.js`

### YouTube API (optional)
1. Vào: https://console.cloud.google.com/
2. Tạo project và enable YouTube Data API v3
3. Copy API key vào `config.js`

## 🐛 Troubleshooting

### Code không lưu được
- Kiểm tra localStorage có bị disable không
- Clear cache và thử lại

### Admin Panel không vào được
- Đảm bảo đã đăng nhập bằng username `admin`
- Kiểm tra console log xem có lỗi gì không

### Preview không hiển thị
- Kiểm tra code có lỗi syntax không
- Xem console log trong preview iframe

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy:
1. Fork repository
2. Tạo branch mới: `git checkout -b feature/TinhNangMoi`
3. Commit changes: `git commit -m 'Thêm tính năng X'`
4. Push: `git push origin feature/TinhNangMoi`
5. Tạo Pull Request

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 👨‍💻 Tác giả

**Nguyen Van Thang**
- GitHub: [@ThangTech](https://github.com/ThangTech)
- Facebook: [Thang Nguyen](https://www.facebook.com/thangnguyen.elnino)
- LinkedIn: [Thắng Nguyễn](https://www.linkedin.com/in/thắng-nguyễn-văn-b8582a355/)

## 🙏 Cảm ơn

- [Ace Editor](https://ace.c9.io/) - Code editor
- [EmailJS](https://www.emailjs.com/) - Email service
- [Font Awesome](https://fontawesome.com/) - Icons
- [Pyodide](https://pyodide.org/) - Python in browser

---

⭐ **Nếu thấy project hữu ích, hãy cho 1 star nhé!** ⭐

