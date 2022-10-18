let ENV;
let pathname = window.location.pathname;
if (pathname.startsWith("/public")) {
   ENV = "production";
}

const AUTH_DATA = JSON.parse(localStorage.getItem("FE_Submission02_Auth"));
if (!pathname.split("/").includes("login.html")) {
   if (!AUTH_DATA?.access_token) {
      if (ENV === 'development') {
         window.location.assign("/public/login.html")
      } else {
         window.location.assign("/login.html")
      }
   }
} else {
   if (AUTH_DATA?.access_token) {
      if (ENV === 'development') {
         window.location.replace("/public")
      } else {
         window.location.replace("/")
      }
   }
}

export { ENV }
