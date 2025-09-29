//Section mobile btn
const menuBtnMobile = document.getElementById("menu-btn-Mobile");
let isOpen = false;
const mobileMenuNav = document.getElementById("mobile-menu-nav");
const mobileNavClose = document.getElementById("mobile-nav-close");
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

tuTorialBtn.addEventListener("click",() =>{
       tuTorialBtn.classList.toggle("bg-black");
       tuTorialBtn.classList.toggle("text-white");
       nestedNavId.classList.toggle("nested-navigation-hidden");
})