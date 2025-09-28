//Section mobile btn
const menuBtnMobile = document.getElementById("menu-btn-Mobile");
let isOpen = false;
const mobileMenuNav = document.getElementById("mobile-menu-nav");
const mobileNavClose = document.getElementById("mobile-nav-close");
menuBtnMobile.addEventListener("click", () => {
  if (isOpen) {
    mobileMenuNav.style.display = "none";
    isOpen = false;
  } else {
    mobileMenuNav.style.display = "block";
    isOpen = true;
  }
});
mobileNavClose.addEventListener("click", () => {
       mobileMenuNav.style.display = "none";
       isOpen = false;
});
