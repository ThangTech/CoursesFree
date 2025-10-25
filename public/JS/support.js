function toggleFAQ(question) {
  const answer = question.nextElementSibling;
  const icon = question.querySelector("span:last-child");

  // Đóng tất cả FAQ khác
  document.querySelectorAll(".faq-answer").forEach((item) => {
    if (item !== answer) {
      item.classList.remove("active");
      item.previousElementSibling.querySelector("span:last-child").textContent =
        "+";
    }
  });
  answer.classList.toggle("active");
  icon.textContent = answer.classList.contains("active") ? "-" : "+";
}
(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'994070d1d3ef9c5d',t:'MTc2MTM4MTk1Ny4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();
