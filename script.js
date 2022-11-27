//https://github.com/users/dooli1971039/contributions

const url = "https://api.github.com/users/dooli1971039";
fetch(url)
    .then((respose) => respose.json())
    .then((data) => console.log(data));
// https://api.github.com/users/dooli1971039/events
