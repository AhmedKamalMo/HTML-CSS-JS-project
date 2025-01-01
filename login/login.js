var mail = document.getElementById("email");
var password = document.getElementById("password");
var getMail = localStorage.getItem("email");
var getPassword = localStorage.getItem("password");
var login = document.getElementById("login");
var form = document.getElementsByTagName("form")[0];
var invalid = document.getElementById("invalid");

login.addEventListener("click", function (e) {
  e.preventDefault();
  console.log();
  console.log(mail.value == getMail);

  if (mail.value === getMail && password.value === getPassword) {
    console.log("success");
    // window.open();
  } else {
    invalid.innerHTML = `&#128534; invalid`;
    invalid.style.color = "red";
  }
});
