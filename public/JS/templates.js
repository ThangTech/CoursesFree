const GITHUB_API = "https://api.github.com/search/repositories";

async function fetchTemplates() {
  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "block";

  try {
    // Tìm kiếm repositories về HTML templates phổ biến
    const response = await fetch(
      `${GITHUB_API}?q=html+template+stars:>100&sort=stars&order=desc&per_page=12`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.items.map((repo) => ({
      name: repo.name,
      description: repo.description,
      preview: `https://opengraph.githubassets.com/1/${repo.full_name}`,
      demoUrl: repo.homepage || `https://github.com/${repo.full_name}`,
      sourceUrl: repo.html_url,
      stars: repo.stargazers_count,
      author: repo.owner.login,
      language: repo.language,
      topics: repo.topics || [],
    }));
  } catch (error) {
    console.error("Error fetching templates:", error);
    return [];
  } finally {
    if (loading) loading.style.display = "none";
  }
}

function renderTemplates(templates) {
  const grid = document.getElementById("templatesGrid");

  if (!grid) {
    console.error("Element #templatesGrid not found");
    return;
  }

  if (templates.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
        <p>Không tìm thấy template nào. Vui lòng thử lại sau.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = templates
    .map(
      (template) => `
        <div class="template-card">
            <div class="template-preview">
                <img 
                  src="${template.preview}" 
                  onerror="this.src='https://via.placeholder.com/600x400/04aa60/ffffff?text=${encodeURIComponent(
                    template.name
                  )}'" 
                  alt="${template.name}"
                  loading="lazy"
                >
            </div>
            <div class="template-info">
                <h3>${template.name}</h3>
                <p>${template.description || "No description available"}</p>
                ${
                  template.topics.length > 0
                    ? `
                  <div class="template-tags">
                    ${template.topics
                      .slice(0, 3)
                      .map((topic) => `<span class="tag">${topic}</span>`)
                      .join("")}
                  </div>
                `
                    : ""
                }
                <p class="template-meta">
                  By ${template.author} • ⭐ ${template.stars.toLocaleString()}
                  ${template.language ? ` • ${template.language}` : ""}
                </p>
                <div class="template-actions">
                    <a href="${
                      template.demoUrl
                    }" class="btn btn-demo" target="_blank" rel="noopener">
                      Xem Demo
                    </a>
                    <a href="${
                      template.sourceUrl
                    }" class="btn btn-source" target="_blank" rel="noopener">
                      Source Code
                    </a>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Khởi tạo khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", async () => {
  const templates = await fetchTemplates();
  renderTemplates(templates);

  // Xử lý tìm kiếm
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filtered = templates.filter(
        (template) =>
          template.name.toLowerCase().includes(searchTerm) ||
          template.description?.toLowerCase().includes(searchTerm) ||
          template.topics.some((topic) =>
            topic.toLowerCase().includes(searchTerm)
          )
      );
      renderTemplates(filtered);
    });
  }

  // Xử lý filter theo ngôn ngữ
  const languageFilter = document.getElementById("languageFilter");
  if (languageFilter) {
    languageFilter.addEventListener("change", (e) => {
      const language = e.target.value;
      const filtered =
        language === "all"
          ? templates
          : templates.filter((t) => t.language === language);
      renderTemplates(filtered);
    });
  }
});
