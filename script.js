GitHubCalendar(".calendar", "dooli1971039", {
    responsive: true,
    tooltips: true,
    global_stats: false,
}).then(() => {
    document.querySelector(".calendar").style.maxWidth = "900px";
    // document.querySelector(".calendar").style.minHeight = "100px";
    // document.getElementsByClassName("width-full")[0].style.display = "none";

    let parentList = document.querySelectorAll("svg>g>g");
    let childList = parentList[parentList.length - 1].childNodes;
    let lastBlock = childList[childList.length - 2];
    console.log(lastBlock.style);
    console.log(lastBlock.dataset); // count, date, level
});

//https://github.com/users/dooli1971039/contributions

// const url = "https://github.com/users/dooli1971039/contributions";
// fetch(url)
//     .then((respose) => respose.json)
//     .then((data) => console.log(data));

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
