const beforeLogin = document.querySelector("#before-login");
const enterID = beforeLogin.querySelector("input");
const warning = beforeLogin.querySelector("#warning");
const afterLogin = document.querySelector("#after-login");

beforeLogin.addEventListener("submit", clickLogin);

let userID = null;
let userName = null;
let userUrl = null;
const userGraphUrl = `https://ghchart.rshah.org/`;

function clickLogin(event) {
    event.preventDefault();
    userID = enterID.value;
    getInformation(userID);
}

function getInformation(userID) {
    const url = `https://api.github.com/users/${userID}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            userName = data.name;
            userUrl = data.html_url;

            if (userName === null) {
                // null이면 계정 없는 경우(warning msg 보여주기)
                showTag(warning);
            } else {
                //setting
                setAfterLogin(userName, userID);

                //화면 전환
                showTag(afterLogin);
                hideTag(warning, "hidden");
                hideTag(beforeLogin, "none");
            }
        });
}

function showTag(tag) {
    tag.classList.remove("hidden");
    tag.classList.remove("none");
}

function hideTag(tag, type) {
    tag.classList.add(type);
}

function setAfterLogin(userName, userID) {
    let greeting = document.createElement("h2");
    greeting.innerText = `Hello ${userName}`;
    afterLogin.appendChild(greeting);

    let githubImg = document.createElement("img");
    githubImg.src = userGraphUrl + userID;
    afterLogin.appendChild(githubImg);
}
