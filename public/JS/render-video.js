// Inline AppConfig để tránh phụ thuộc file riêng biệt
const AppConfig = {
  api: {
    youtube: {
      apiKey: "AIzaSyCDFYJTXz5y7zaeJ3QruSSUyYeFdjNEdT0",
      enabled: true,
    }
  }
};

const API_KEY = AppConfig.api.youtube.enabled 
  ? AppConfig.api.youtube.apiKey 
  : null;

const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get("v");
const topic = urlParams.get("topic") || "html tutorial";

if (!videoId) {
  alert("Không tìm thấy video!");
  window.location.href = "./index.html#video";
}

document.getElementById("video-player").innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;

async function loadVideoDetails() {
  if (!API_KEY) {
    console.warn("YouTube API disabled");
    document.getElementById("video-title").textContent = topic || "Video Tutorial";
    document.getElementById("video-views").textContent = "N/A";
    document.getElementById("video-date").textContent = "N/A";
    document.getElementById("video-duration").textContent = "N/A";
    document.getElementById("channel-name").textContent = "YouTube Channel";
    document.getElementById("channel-subscribers").textContent = "Subscribe";
    document.getElementById("video-description").textContent = 
      "Bật YouTube API trong config.js để xem chi tiết video";
    return;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      const snippet = video.snippet;
      const stats = video.statistics;
      const duration = video.contentDetails.duration;

      document.getElementById("video-title").textContent = snippet.title;
      document.getElementById("video-views").textContent = formatViews(
        stats.viewCount
      );
      document.getElementById("video-date").textContent = formatDate(
        snippet.publishedAt
      );
      document.getElementById("video-duration").textContent =
        formatDuration(duration);
      document.getElementById("channel-name").textContent =
        snippet.channelTitle;
      document.getElementById("channel-subscribers").textContent =
        snippet.channelTitle;
      document.getElementById("video-description").textContent =
        snippet.description || "Không có mô tả";

      const firstLetter = snippet.channelTitle.charAt(0).toUpperCase();
      document.getElementById("channel-avatar").textContent = firstLetter;
    }
  } catch (error) {
    console.error("Error loading video details:", error);
  }
}

function initSearch() {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");

  function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
      searchVideos(query);
    }
  }

  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });
}

async function searchVideos(query) {
  if (!API_KEY) {
    alert("YouTube API chưa được cấu hình");
    return;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&maxResults=20&key=${API_KEY}`
    );
    const data = await response.json();

    displaySearchResults(data.items, query);
  } catch (error) {
    console.error("Error searching videos:", error);
    alert("Lỗi tìm kiếm video");
  }
}

function displaySearchResults(videos, query) {
  const container = document.getElementById("related-videos");
  const title = document.createElement("h3");
  title.textContent = `Kết quả tìm kiếm cho: "${query}"`;
  title.style.marginBottom = "15px";

  container.innerHTML = "";
  container.appendChild(title);

  if (videos && videos.length > 0) {
    videos.forEach((item) => {
      const videoCard = createRelatedVideoCard(item);
      container.appendChild(videoCard);
    });

    const backBtn = document.createElement("button");
    backBtn.textContent = "← Quay lại video liên quan";
    backBtn.className = "back-btn";
    backBtn.onclick = () => {
      loadRelatedVideos();
      document.getElementById("search-input").value = "";
    };

    container.appendChild(backBtn);
  } else {
    container.innerHTML += "<p>Không tìm thấy video nào</p>";
  }
}

async function loadRelatedVideos() {
  if (!API_KEY) {
    document.getElementById("related-videos").innerHTML = `
      <div style="padding: 20px; text-align: center; color: #666;">
        <p>YouTube API chưa được cấu hình</p>
        <p style="font-size: 14px; margin-top: 10px;">
          Để xem video liên quan, vui lòng bật YouTube API trong config.js
        </p>
      </div>
    `;
    return;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        topic
      )}&type=video&maxResults=10&key=${API_KEY}`
    );
    const data = await response.json();

    const container = document.getElementById("related-videos");
    container.innerHTML = "";

    if (data.items) {
      data.items.forEach((item) => {
        if (item.id.videoId !== videoId) {
          const videoCard = createRelatedVideoCard(item);
          container.appendChild(videoCard);
        }
      });
    }
  } catch (error) {
    console.error("Error loading related videos:", error);
    document.getElementById("related-videos").innerHTML =
      "<p>Không thể tải video liên quan</p>";
  }
}

function createRelatedVideoCard(item) {
  const link = document.createElement("a");
  link.href = `video-player.html?v=${
    item.id.videoId
  }&topic=${encodeURIComponent(item.snippet.title)}`;
  link.className = "related-video";

  const thumbnail =
    item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url;
  const title = item.snippet.title;
  const channel = item.snippet.channelTitle;

  link.innerHTML = `
    <div class="related-thumbnail">
      <img src="${thumbnail}" alt="${title}" onerror="this.src='https://via.placeholder.com/168x94?text=No+Image'">
    </div>
    <div class="related-info">
      <h4>${title}</h4>
      <p>${channel}</p>
    </div>
  `;

  return link;
}

function formatViews(views) {
  const num = parseInt(views);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M lượt xem";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K lượt xem";
  }
  return num + " lượt xem";
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return "Vừa xong";
  if (diff < 3600) return Math.floor(diff / 60) + " phút trước";
  if (diff < 86400) return Math.floor(diff / 3600) + " giờ trước";
  if (diff < 2592000) return Math.floor(diff / 86400) + " ngày trước";
  if (diff < 31536000) return Math.floor(diff / 2592000) + " tháng trước";
  return Math.floor(diff / 31536000) + " năm trước";
}

function formatDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return "0:00";

  const hours = (match[1] || "").replace("H", "");
  const minutes = (match[2] || "").replace("M", "");
  const seconds = (match[3] || "").replace("S", "");

  if (hours) {
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  }
  return `${minutes || "0"}:${seconds.padStart(2, "0")}`;
}

document.addEventListener("DOMContentLoaded", function () {
  loadVideoDetails();
  loadRelatedVideos();
  initSearch();
});
