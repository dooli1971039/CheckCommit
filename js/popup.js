import {Color} from "./color.js";
const part1 = document.querySelector("#part1");
const inputID = document.querySelector("#input-id");
const warning = document.querySelector("#warning");
const loginBtn = document.querySelector("#login-button");

const part2 = document.querySelector("#part2");
const comment = document.querySelector("#comment");
const calendar = document.querySelector(".calendar");

const colorBtns = document.querySelectorAll("#color-list li");
const colorType = document.querySelector("style");
const logoutBtn = document.querySelector("#logout");

loginBtn.addEventListener("click", clickLogin);
calendar.addEventListener("click", openGithub);
colorBtns.forEach((item) => item.addEventListener("click", setColor));
logoutBtn.addEventListener("click", clickLogout);

function clickLogin(event) {
    event.preventDefault();
    //입력창에서 아이디 가져와서 체크
    let id = inputID.value;
    const checkUrl = `https://api.github.com/users/${id}`;

    fetch(checkUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.name == null) {
                //아이디 잘못 입력 시, warning 메세지 띄우기
                warning.classList.remove("hidden");
            } else {
                //아이디 제대로 입력 시
                //관련 정보 localStorage에 저장 후, after-login 세팅
                localStorage.setItem("userID", id);
                setAfterLogin(id);

                //화면 전환
                switchToMainScreen();
            }
        })
        .catch(() => {
            //아이디 잘못 입력 시, warning 메세지 띄우기
            warning.classList.remove("hidden");
        });
    inputID.value = ""; //초기화
}

function setAfterLogin(id) {
    GitHubCalendar(".calendar", id, {
        responsive: true,
        tooltips: false,
        global_stats: false,
    }).then(() => {
        /* 필요 없는 요소 삭제 */
        document.getElementsByClassName("width-full")[0].remove();
        let textList = document.querySelectorAll("svg>g>text");
        textList.forEach((item) => item.remove());

        /* 위치 조정 */
        let cal = document.querySelector("svg>g");
        cal.attributes[0].value = "translate(0,15)";

        /* 데이터 처리 및 comment 띄우기*/
        let parentList = document.querySelectorAll("svg>g>g");
        let childList = parentList[parentList.length - 1].childNodes;
        console.log(childList);
        let lastBlock = childList[childList.length - 2];
        console.log(lastBlock.dataset); // count, date, level

        let lastBlockDate = lastBlock.dataset.date;
        let lastBlockCount = Number(lastBlock.dataset.count);
        console.log(lastBlockDate, lastBlockCount);

        if (lastBlockCount === 0) {
            comment.innerHTML = "COMMIT NOW";
        } else {
            comment.innerHTML = `You did ${lastBlockCount} commits today`;
        }
    });
}

function openGithub() {
    const openUrl = `https://github.com/${localStorage.getItem("userID")}`;
    window.open(openUrl); // 새탭으로 열기
}

function setColor(event) {
    localStorage.setItem("color", event.target.id-1);
    colorType.innerHTML = Color[localStorage.getItem("color")];
}

function clickLogout() {
    //localStorage 삭제
    localStorage.removeItem("userID");

    //화면 전환
    switchToLoginScreen();
}

function switchToMainScreen(){
    warning.classList.add("hidden");
    part1.classList.add("none");
    part2.classList.remove("none");
    logoutBtn.classList.remove("none");
}

function switchToLoginScreen(){
    part1.classList.remove("none");
    part2.classList.add("none");
    logoutBtn.classList.add("none");
}

/*바로 실행**********************************************/
if(localStorage.getItem("color")){ //존재하면 세팅
    colorType.innerHTML = Color[localStorage.getItem("color")];
}
let checkLocalHostID = localStorage.getItem("userID");
if (checkLocalHostID) {
    setAfterLogin(checkLocalHostID);

    //화면 전환
    switchToMainScreen();
}
