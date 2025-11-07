document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chatbot");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  
  if (!chatBox || !userInput || !sendBtn) {
    console.warn("Missing DOM elements");
    return;
  }

  let genAI, model;
  let isAIInitialized = false;

  const MY_COURSES_CONTEXT = `
Bạn là AI Assistant của My Courses - nền tảng học lập trình trực tuyến.

THÔNG TIN VỀ MY COURSES:
- Tên: My Courses
- Mục tiêu: Dạy lập trình web từ cơ bản đến nâng cao
- Ngôn ngữ: HTML, CSS, JavaScript, Python, SQL
- Tính năng: Hướng dẫn, Tài liệu, Luyện tập, Video, Bài tập, Quizzes
- Có editor code trực tuyến để thực hành
- Hỗ trợ đa ngôn ngữ: Tiếng Việt, English, 简体中文

CÁC KHÓA HỌC CHÍNH:
1. HTML - Xây dựng cấu trúc trang web
2. CSS - Thiết kế và trình bày giao diện
3. JavaScript - Lập trình tương tác và xử lý sự kiện
4. Python - Phát triển ứng dụng và làm việc với dữ liệu
5. SQL - Quản lý cơ sở dữ liệu

TÍNH NĂNG NỔI BẬT:
- Video hướng dẫn chi tiết
- Bài tập thực hành với editor
- Quizzes kiểm tra kiến thức
- Template web mẫu miễn phí
- Hỗ trợ đa ngôn ngữ

KHI TRẢ LỜI, HÃY:
1. Giới thiệu My Courses nếu người dùng hỏi
2. Tư vấn khóa học phù hợp với nhu cầu
3. Hướng dẫn sử dụng các tính năng trên website
4. Giải đáp thắc mắc về lập trình
5. Đề xuất lộ trình học tập
6. Luôn thân thiện, nhiệt tình và hữu ích

HÃY TRẢ LỜI NHƯ MỘT TRỢ LÝ CỦA MY COURSES!
`;

  async function initializeAI() {
    if (isAIInitialized) return;
    
    try {
      const { GoogleGenerativeAI } = await import('https://esm.run/@google/generative-ai');
      const apiKey = "AIzaSyAqN89Lk9jCoikmqKvY5D4-LmiiydsfzkQ";
      
      genAI = new GoogleGenerativeAI(apiKey);
      model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash", 
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        }
      });
      
      isAIInitialized = true;
      console.log("AI initialized successfully for My Courses");
      
    } catch (error) {
      console.error("Failed to initialize AI:", error);
      addMessage("Đang kết nối với AI...", "bot-message");
      await initializeFallbackModel();
    }
  }

  async function initializeFallbackModel() {
    try {
      const { GoogleGenerativeAI } = await import('https://esm.run/@google/generative-ai');
      const apiKey = "AIzaSyAqN89Lk9jCoikmqKvY5D4-LmiiydsfzkQ";
      
      genAI = new GoogleGenerativeAI(apiKey);
      model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
      
      isAIInitialized = true;
      console.log("Fallback model initialized");
      addMessage("✅ Đã kết nối với AI Assistant!", "bot-message");
      
    } catch (error) {
      console.error("All models failed:", error);
      addMessage("❌ Không thể kết nối AI. Vui lòng thử lại sau.", "bot-message");
    }
  }

  function addMessage(message, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function showTyping() {
    const typeDiv = document.createElement("div");
    typeDiv.classList.add("message", "bot-message", "typing");
    typeDiv.textContent = "🤔 Đang suy nghĩ...";
    chatBox.appendChild(typeDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typeDiv;
  }

  function showSuggestedQuestions() {
    const suggestions = [
      "My Courses là gì?",
      "Tôi nên bắt đầu học gì?",
      "Có những khóa học nào?",
      "Làm sao để thực hành code?",
      "Có video hướng dẫn không?"
    ];

    addMessage("Tôi là AI Assistant của My Courses. Tôi có thể giúp gì cho việc học lập trình của bạn?", "bot-message");
    
    const suggestionsDiv = document.createElement("div");
    suggestionsDiv.className = "suggestions-container";
    
    suggestions.forEach(question => {
      const suggestionItem = document.createElement("div");
      suggestionItem.className = "suggestion-item";
      suggestionItem.textContent = question;
      suggestionItem.onclick = () => {
        userInput.value = question;
        sendBtn.click();
      };
      suggestionsDiv.appendChild(suggestionItem);
    });
    
    chatBox.appendChild(suggestionsDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function getBotReplay(userMessage) {
    try {
      if (!isAIInitialized) {
        await initializeAI();
      }

      if (!model) {
        throw new Error("AI chưa được khởi tạo");
      }

      const prompt = `${MY_COURSES_CONTEXT}

Người dùng hỏi: "${userMessage}"

Hãy trả lời như một trợ lý nhiệt tình của My Courses:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return text || "Xin lỗi, tôi chưa thể trả lời câu hỏi này ngay lúc này.";
      
    } catch (error) {
      console.error("getBotReplay error:", error);
      return "Hiện tại tôi đang bận. Vui lòng thử lại sau.";
    }
  }

  sendBtn.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (message === "") return;
    
    addMessage(message, "user-message");
    userInput.value = "";
    sendBtn.disabled = true;
    sendBtn.textContent = "Đang gửi...";

    const typeDiv = showTyping();
    const botReplay = await getBotReplay(message);
    
    typeDiv.remove();
    addMessage(botReplay, "bot-message");
    sendBtn.disabled = false;
    sendBtn.textContent = "Gửi";
  });

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendBtn.click();
    }
  });

  initializeAI().then(() => {
    setTimeout(showSuggestedQuestions, 1000);
  });
});