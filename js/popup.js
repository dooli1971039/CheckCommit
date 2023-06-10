import {Color} from "./color.js";

/** html 태그 가져오기 */
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

/** 클릭 이벤트 추가 */
loginBtn.addEventListener("click", clickLogin); //로그인
calendar.addEventListener("click", openGithub); // 깃허브로 가는 버튼
colorBtns.forEach((item) => item.addEventListener("click", setColor)); // 색상 선택
logoutBtn.addEventListener("click", clickLogout); // 로그아웃

/** 바로 실행 - 색상&로그인 확인*/
if (localStorage.getItem("color")) {
    colorType.innerHTML = Color[localStorage.getItem("color")];
}
let checkLocalHostID = localStorage.getItem("userID");
if (checkLocalHostID) {
    setAfterLogin(checkLocalHostID);
}

/** 로그인 함수 */
function clickLogin(event) {
    event.preventDefault();
    let id = inputID.value; // 깃허브 아이디
    const checkUrl = `https://api.github.com/users/${id}`;

    fetch(checkUrl)
        .then((response) => response.json())
        .then((data) => {
            if (!data.login) {
                // 아이디 잘못 입력 시
                warning.classList.remove("hidden"); // warning 메세지
            } else {
                //아이디 제대로 입력 시
                localStorage.setItem("userID", id); // id 저장
                setAfterLogin(id); // 화면 세팅
            }
        })
        .catch(() => {
            // 아이디 잘못 입력 시, warning 메세지 띄우기
            warning.classList.remove("hidden");
        });
    inputID.value = ""; // 입력창 초기화
}

/** 로그인 후 환경 세팅하는 함수
 * @param {string} id - 깃허브 아이디
 */
function setAfterLogin(id) {
    setGithubCalendar(id); // 깃허브 캘린더 세팅
    checkCommitOrNot(id); // 커밋 여부 세팅
    switchToMainScreen(); // 메인 화면으로 전환
}

/** 깃허브 캘린더 세팅하는 함수
 * @param {string} id - 깃허브 아이디
 * @see https://github.com/Bloggify/github-calendar
 */
function setGithubCalendar(id) {
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
    });
}

/** 커밋 여부 판단 후 세팅하는 함수
 * @param {string} id - 깃허브 아이디
 */
function checkCommitOrNot(id) {
    /* 데이터 처리 및 comment 띄우기*/
    const nowTime = new Date(); // 현재 날짜
    const commitCheckUrl = `https://api.github.com/users/${id}/events`; // 깃허브 이벤트 내역
    fetch(commitCheckUrl)
        .then((respose) => respose.json())
        .then((data) => {
            data.forEach((issue) => {
                const time = new Date(Date.parse(issue.created_at));
                if (isSameDate(nowTime, time)) {
                    // 오늘 이벤트 중 커밋, 풀리퀘, 리뷰, 이슈를 했는지 체크 후 멘트 세팅
                    const commitType = issue.type;
                    if (
                        commitType === "PushEvent" ||
                        (commitType === "PullRequestEvent" &&
                            (issue.payload.action === "closed" || issue.payload.action === "opened")) ||
                        commitType === "PullRequestReviewEvent" ||
                        commitType === "IssueEvent"
                    ) {
                        comment.innerHTML = "You did commits today";
                        return false;
                    }
                } else {
                    return false;
                }
            });
        });
}

/** 현재 날짜와 깃허브 캘린더 날짜를 비교하여 같은지 확인하는 함수
 * @param {Date} nowTime - 현재 날짜
 * @param {Date} calendarDate - 캘린더 날짜
 * @return {Boolean} - 같은지 다른지 결과 반환
 */
function isSameDate(nowTime, calendarDate) {
    return (
        nowTime.getFullYear() == calendarDate.getFullYear() &&
        nowTime.getMonth() == calendarDate.getMonth() &&
        nowTime.getDate() == calendarDate.getDate()
    );
}

/** 깃허브를 새 탭에서 열어주는 함수 */
function openGithub() {
    const openUrl = `https://github.com/${localStorage.getItem("userID")}`;
    window.open(openUrl); // 새탭으로 열기
}

/** 색상 선택 함수 */
function setColor(event) {
    let colorNum = event.target.id - 1;
    localStorage.setItem("color", colorNum);
    colorType.innerHTML = Color[colorNum];
}

/** 로그아웃 함수 */
function clickLogout() {
    let userID = localStorage.getItem("userID");
    localStorage.removeItem(`gh_calendar_expire.${userID}`);
    localStorage.removeItem(`gh_calendar_content.${userID}`);
    localStorage.removeItem("userID"); //login 정보 삭제
    switchToLoginScreen(); // login 화면으로 전환
}

/** 로그인 후 메인 화면으로 전환하는 함수 */
function switchToMainScreen() {
    warning.classList.add("hidden");
    part1.classList.add("none");
    part2.classList.remove("none");
    logoutBtn.classList.remove("none");
}

/** 로그아웃 후 로그인 화면으로 전환하는 함수 */
function switchToLoginScreen() {
    part1.classList.remove("none");
    part2.classList.add("none");
    logoutBtn.classList.add("none");
}
