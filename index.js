function getlocal() {
    var emailval = JSON.parse(localStorage.getItem("emails")) || [];
    var passval = JSON.parse(localStorage.getItem("pass")) || [];
    return { emailval, passval };



    // localStorage.emails = JSON.stringify(emails);
    // var storedemails = JSON.parse(localStorage.emails);
}

let email1 = getlocal();

// let displayname = (document.getElementById("emails").innerText = email1);
console.log(email1)
// let toparr = email1[email1.length - 1]
// let dis = (document.getElementById("emails").innerText = toparr);

window.addEventListener("DOMContentLoaded", function () {
    var currentEmail = localStorage.getItem("currentEmail");
    if (currentEmail) {
        document.getElementById("emails").innerText = `Welcome, ${currentEmail}`;
    }
});

function removelocal() {
    // localStorage.removeItem("email");
    // localStorage.removeItem("userpassword");

    location.href = "./login.html";
}

function goToPage() {
    location.href = "./registration.html";

}