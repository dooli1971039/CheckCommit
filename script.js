// let st = document.querySelector("style").innerHTML;
// document.querySelector("style").innerHTML = `
// :root {
//     --color-calendar-graph-day-bg: #33bbe4;
//     --color-calendar-graph-day-L1-bg:#33bbe4;
//     --color-calendar-graph-day-L2-bg: #33bbe4;
//     --color-calendar-graph-day-L3-bg: #33bbe4;
//     --color-calendar-graph-day-L4-bg:#33bbe4;
// }
// `;

//https://github.com/users/dooli1971039/contributions

const url = "https://github.com/users/dooli1971039/contributions";
fetch(url)
    .then((respose) => respose.json())
    .then((data) => console.log(data));
