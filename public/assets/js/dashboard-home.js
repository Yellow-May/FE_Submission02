import protectedFetch from "./protected-request.js";

// start of chart logic
const overTheWeek = new Map([
   [
      'labels',
      ['today', 'yesterday', 'day 3', 'day 4', 'day 5', 'day 6', 'day 7'],
   ],
   ['series', []],
]);

const overTheYear = new Map([
   [
      'labels',
      [
         "this month",
         "last month",
         "month 3",
         "month 4",
         "month 5",
         "month 6",
         "month 7",
         "month 8",
         "month 9",
         "month 10",
         "month 11",
         "month 12"
      ],
   ],
   ['series', []],
])

const getData = current => {
   return {
      labels: current.get('labels'),
      series: [current.get('series')],
   };
};

const options = {
   width: '100%',
   height: '300px',
};

new Chartist.Bar('#revenue-chart', getData(overTheWeek), options);

const switchCheckbox = document.getElementById('switch');
const revenueHeading = document.getElementById("revenueHeading")
switchCheckbox.addEventListener("change", e => {
   const checked = e.target.checked;

   if (checked) {
      new Chartist.Bar('#revenue-chart', getData(overTheYear), options);
      revenueHeading.innerText = "Revenue (last 12 months)"
   } else {
      new Chartist.Bar('#revenue-chart', getData(overTheWeek), options);
      revenueHeading.innerText = "Revenue (last 7 days)"
   }
})
// end of chart logic

const tablebody = document.getElementById("bestSellersTable").querySelector("tbody");

// on load logic
document.addEventListener("DOMContentLoaded", async () => {
   const chartdata = await protectedFetch(`https://freddy.codesubmit.io/dashboard`);
   chartdata?.dashboard && saveData(chartdata);
})

function createRow({ product, revenue, units }) {
   const newRow = document.createElement("tr");
   const col1 = document.createElement("td");
   const col2 = document.createElement("td");
   const col3 = document.createElement("td");
   const col4 = document.createElement("td");
   col1.innerText = product.name;
   col2.innerText = "No data";
   col3.innerText = units.toLocaleString("en");
   col4.innerText = revenue.toLocaleString("en");
   newRow.append(...[col1, col2, col3, col4]);
   tablebody.appendChild(newRow)
}

function saveData(data) {
   const { sales_over_time_week, sales_over_time_year, bestsellers } = data?.dashboard;

   overTheWeek.set('series', Object.values(sales_over_time_week).map(e => e.orders))
   overTheYear.set('series', Object.values(sales_over_time_year).map(e => e.orders))

   new Chartist.Bar('#revenue-chart', getData(overTheWeek), options);

   bestsellers.forEach(createRow)
}