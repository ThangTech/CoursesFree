// ===== FETCH DỮ LIỆU TỪ JSON =====
async function fetchReferenceData() {
  try {
    const response = await fetch("./public/data/courses-data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu references:", error);
    return null;
  }
}

// ===== RENDER REFERENCES (TÀI LIỆU) =====
function renderReferences(data) {
  const referencesContainer = document.getElementById(
    "references-container-id"
  );

  if (!referencesContainer) {
    return;
  }

  if (!data || !data.tutorials) {
    return;
  }

  const contentDiv = referencesContainer.querySelector(
    ".nested-navigation-container-content"
  );

  if (!contentDiv) {
    return;
  }

  // Xóa nội dung cũ
  contentDiv.innerHTML = "";

  // Tạo tiêu đề
  const titleH1 = document.createElement("h1");
  titleH1.textContent = "Tài liệu";
  contentDiv.appendChild(titleH1);

  // Tạo container cho các category
  const dataContainer = document.createElement("div");
  dataContainer.className = "nested-navigation-container-data";

  // Render từng category
  data.references.forEach((reference) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "nested-navigation-item";

    // Thêm tiêu đề category
    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = reference.category;
    categoryDiv.appendChild(categoryTitle);

    // Render từng item trong category
    reference.items.forEach((item) => {
      // Container cho item
      const itemContainer = document.createElement("div");
      itemContainer.style.marginBottom = "10px";

      // Tiêu đề item
      const itemTitle = document.createElement("span");
      itemTitle.textContent = item.name + " ";
      itemTitle.style.marginRight = "10px";
      itemContainer.appendChild(itemTitle);

      // Link Tài liệu
      const docLink = document.createElement("a");
      docLink.href = item.documentUrl;
      docLink.target = "_blank";
      docLink.rel = "noopener noreferrer";
      docLink.textContent = "[Tài liệu]";
      docLink.style.marginRight = "10px";
      docLink.style.color = "#ede385";
      docLink.style.cursor = "pointer";
      docLink.addEventListener("mouseover", () => {
        docLink.style.color = "#000000";
      });
      docLink.addEventListener("mouseout", () => {
        docLink.style.color = "#ede385";
      });
      itemContainer.appendChild(docLink);

      // Link PDF
      const pdfLink = document.createElement("a");
      pdfLink.href = item.pdfUrl;
      pdfLink.target = "_blank";
      pdfLink.rel = "noopener noreferrer";
      pdfLink.textContent = "[PDF]";
      pdfLink.style.color = "#ede385";
      pdfLink.style.cursor = "pointer";
      pdfLink.addEventListener("mouseover", () => {
        pdfLink.style.color = "#000000";
      });
      pdfLink.addEventListener("mouseout", () => {
        pdfLink.style.color = "#ede385";
      });
      itemContainer.appendChild(pdfLink);

      categoryDiv.appendChild(itemContainer);
    });

    dataContainer.appendChild(categoryDiv);
  });

  contentDiv.appendChild(dataContainer);
}

// ===== EVENT LISTENER CHO REFERENCES BUTTON =====
function setupReferencesButton() {
  const referencesBtn = document.getElementById("refernces-btn");
  const referencesContainer = document.getElementById(
    "references-container-id"
  );
  const referencesCloseBtn = document.getElementById("references-close-btn");

  if (referencesBtn && referencesContainer) {
    referencesBtn.addEventListener("click", (e) => {
      e.preventDefault();
      referencesContainer.classList.toggle("nested-navigation-hidden");
    });

    if (referencesCloseBtn) {
      referencesCloseBtn.addEventListener("click", () => {
        referencesContainer.classList.add("nested-navigation-hidden");
      });
    }

    // Đóng references khi click ngoài
    document.addEventListener("click", (e) => {
      if (
        !referencesContainer.contains(e.target) &&
        !referencesBtn.contains(e.target)
      ) {
        referencesContainer.classList.add("nested-navigation-hidden");
      }
    });
  }
}

// ===== KHỞI TẠO REFERENCES =====
async function initializeReferences() {
  const data = await fetchReferenceData();

  if (data) {
    renderReferences(data);
    setupReferencesButton();
  }
}

// ===== GỌI HÀM CHÍNH KHI PAGE LOAD =====
document.addEventListener("DOMContentLoaded", initializeReferences);