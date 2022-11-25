const beforeLogin = document.querySelector("#before-login");
const enterID = beforeLogin.querySelector("input");
beforeLogin.addEventListener("submit", clickLogin);

function clickLogin(event) {
    event.preventDefault();
    console.log(enterID.value);
}
