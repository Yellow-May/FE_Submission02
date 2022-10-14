import { ENV } from "./protected-routes.js";

const nav = document.getElementById("navigations");

Array.from(nav.children).forEach((children, idx) => {
   if (idx === 2) {
      children.addEventListener('click', () => {
         localStorage.removeItem("FE_Submission02_Auth");
         if (ENV === "development") {
            window.location.replace("/public/login.html");
         } else {
            window.location.replace("/login.html")
         }
      })
   } else {
      if (ENV === 'development') {
         children.setAttribute("href", `/public${children.getAttribute("href")}`)
      }
   }
})