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
  if (!referencesContainer || !data.references) {
    return;
  }

  const contentDiv = referencesContainer.querySelector(
    ".nested-navigation-container-content"
  );
  if (!contentDiv) {
    return;
  }

  contentDiv.innerHTML =
    '<h1 data-translate="references_title">Tài liệu</h1><div class="nested-navigation-container-data"></div>';
  const dataContainer = contentDiv.querySelector(
    ".nested-navigation-container-data"
  );

  data.references.forEach((reference) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "nested-navigation-item";

    const categoryKey = `ref_category_${reference.category
      .toLowerCase()
      .replace(/\s+/g, "_")}`;
    const categoryTitle = document.createElement("h2");
    categoryTitle.setAttribute("data-translate", categoryKey);
    categoryTitle.textContent = reference.category;
    categoryDiv.appendChild(categoryTitle);

    reference.items.forEach((item) => {
      const itemContainer = document.createElement("div");
      itemContainer.style.marginBottom = "10px";

      const itemKey = `ref_item_${reference.category
        .toLowerCase()
        .replace(/\s+/g, "_")}_${item.name.toLowerCase().replace(/\s+/g, "_")}`;
      const itemTitle = document.createElement("span");
      itemTitle.setAttribute("data-translate", itemKey);
      itemTitle.textContent = item.name;
      itemTitle.style.marginRight = "10px";
      itemContainer.appendChild(itemTitle);

      const docLink = document.createElement("a");
      docLink.href = item.documentUrl;
      docLink.target = "_blank";
      docLink.rel = "noopener noreferrer";
      docLink.setAttribute("data-translate", "document_link");
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

      const pdfLink = document.createElement("a");
      pdfLink.href = item.pdfUrl;
      pdfLink.target = "_blank";
      pdfLink.rel = "noopener noreferrer";
      pdfLink.setAttribute("data-translate", "pdf_link");
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
  if (typeof translatePage === "function") {
    setTimeout(() => translatePage(window.currentLang), 0);
  }
}

// ===== EVENT LISTENER CHO REFERENCES BUTTON =====
function setupReferencesButton() {
  const referencesBtn = document.getElementById("refernces-btn");
  const referencesContainer = document.getElementById(
    "references-container-id"
  );
  const referencesCloseBtn = document.getElementById("references-close-btn");

  if (referencesBtn && referencesContainer) {
    referencesBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      referencesContainer.classList.toggle("nested-navigation-hidden");
      if (!referencesContainer.classList.contains("nested-navigation-hidden")) {
        const data = await fetchReferenceData();
        if (data) {
          renderReferences(data);
        }
      }
    });

    if (referencesCloseBtn) {
      referencesCloseBtn.addEventListener("click", () => {
        referencesContainer.classList.add("nested-navigation-hidden");
      });
    }

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

async function initializeReferences() {
  setupReferencesButton();
}

document.addEventListener("DOMContentLoaded", initializeReferences);
