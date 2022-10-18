import protectedFetch from "./protected-request.js";

const tablebody = document.getElementById('ordersTable').querySelector("tbody");

// pagination
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const spanView = document.getElementById("view");
let currentPage = 1;
let totalPages = 3;
let currentSearch = "";

// actions
prevBtn.addEventListener("click", () => {
   if (currentPage - 1 > 0) {
      currentPage -= 1;
      onChangeRequests();
   }
})
nextBtn.addEventListener("click", () => {
   if (currentPage + 1 <= totalPages) {
      currentPage += 1;
      onChangeRequests()
   }
})

// on load
document.addEventListener("DOMContentLoaded", async () => {
   const data = await protectedFetch(`https://freddy.codesubmit.io/orders?page=${currentPage}&q=${currentSearch}`);
   if (data.orders) {
      totalPages = Math.ceil(data.total / data.orders.length);
      data.orders.forEach(updateTable)
   }
   prevBtn.style.display = "none";
   spanView.innerText = `Page ${currentPage} of ${totalPages}`;
})

// handle update on pagination and search requests
async function onChangeRequests() {
   const data = await protectedFetch(`https://freddy.codesubmit.io/orders?page=${currentPage}&q=${currentSearch}`);
   if (data.orders) {
      tablebody.innerText = "";
      data.orders.forEach(updateTable)
   }
   updatePagination(currentPage)
}

// update pagination
function updatePagination(page) {
   prevBtn.style.display = "block";
   nextBtn.style.display = "block"
   spanView.innerText = `Page ${page} of ${totalPages}`;

   if (page === 1) {
      prevBtn.style.display = "none";
   }

   if (page === totalPages) {
      nextBtn.style.display = "none"
   }
}

// update table
function updateTable({ product, created_at, currency, status, total }) {
   const newRow = document.createElement("tr");
   const col1 = document.createElement("td");
   const col2 = document.createElement("td");
   const col3 = document.createElement("td");
   const col4 = document.createElement("td");
   col1.innerText = product.name;
   col2.innerText = (new Date(created_at)).toDateString();
   col3.innerText = `${currency} ${total.toLocaleString("en")}`;
   col4.innerText = status;
   col4.style.color = status === "delivered" ? "green" : status === "processing" ? "red" : "gray";
   newRow.append(...[col1, col2, col3, col4]);
   tablebody.appendChild(newRow)
}