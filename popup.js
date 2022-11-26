const beforeLogin = document.querySelector("#before-login");
const enterID = beforeLogin.querySelector("input");
const warning = beforeLogin.querySelector("#warning");
const afterLogin = document.querySelector("#after-login");
const logoutBtn = document.querySelector("#logout");

let userID = null;
let userName = null;
let userUrl = null;
const userGraphUrl = `https://ghchart.rshah.org/`;

beforeLogin.addEventListener("submit", clickLogin);
logoutBtn.addEventListener("click", clickLogout);

function clickLogin(event) {
    event.preventDefault();
    userID = enterID.value;
    enterID.value = ""; //입력창 비우기
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
                storeID(userID);

                //화면 전환
                showTag(afterLogin);
                hideTag(warning, "hidden");
                hideTag(beforeLogin, "none");
            }
        });
}

function clickLogout(event) {
    //localStorage 삭제, 변수 초기화
    localStorage.removeItem("userID");
    localStorage.removeItem("userName");
    userID = userName = userUrl = null;

    //afterLogin 하위에 추가한 태그 삭제

    //화면 전환
    hideTag(afterLogin, "none");
    showTag(beforeLogin);
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

function storeID(userID) {
    localStorage.setItem("userName", userName);
    localStorage.setItem("userID", userID);
}

/***********************************************************************************/
// //가장 먼저 아이디가 있는지 체크
if (localStorage.getItem("userID")) {
    setAfterLogin(localStorage.getItem("userName"), localStorage.getItem("userID"));

    showTag(afterLogin);
    hideTag(beforeLogin, "none");
}
/**
 * 캘린더 수정하기
 * 캘린더 색 변환은 어떻게 할 수 있을까나....
 */
