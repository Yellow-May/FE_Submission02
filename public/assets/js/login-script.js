import { ENV } from "./protected-routes.js";

const form = document.getElementById("loginForm");
const btn = document.getElementById("btn")

form.addEventListener("submit", (e) => {
   e.preventDefault()
   const formData = new FormData(form);
   const username = formData.get("username");
   const password = formData.get("password");

   if (username && password) {
      loginRequest({ username, password })
   }
})

async function loginRequest({ username, password }) {
   btn.setAttribute("disabled", true);
   btn.innerText = "Loading..."
   try {
      const res = await fetch("https://freddy.codesubmit.io/login", {
         method: "POST",
         body: JSON.stringify({
            username,
            password
         }),
         headers: {
            "content-type": "application/json"
         }
      });
      const data = await res.json();
      if (res.status === 401) return alert(data.msg);

      localStorage.setItem("FE_Submission02_Auth", JSON.stringify(data));
      if (ENV === "development") {
         window.location.replace("/public");
      } else {
         window.location.replace("/")
      }
   } catch (error) {
      alert(error?.response?.data?.message ?? error?.message)
   } finally {
      btn.removeAttribute("disabled");
      btn.innerText = "Login"
   }
};