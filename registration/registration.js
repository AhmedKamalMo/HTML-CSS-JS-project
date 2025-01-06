var users = JSON.parse(localStorage.getItem('users')) || [];

function addUser() {

  let email = document.getElementById("emailinput").value;
  let password = document.getElementById("passwordinput").value;

  //check if user is aready register
  let isUser = users.find(user => user.email === email);
  if (isUser) {
    alert("User already exists");
  } else {
    //add user to local storage
    users.push({ email: email, pass: password })
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", email);
    console.log(localStorage.getItem('currentUser'))
  
  }
}


let validName = true;
let validPassword = false;

var password1 = document.getElementById("passwordinput");
var password2 = document.getElementById("conpassword");
var errrpass = document.getElementById("errorpass");

document.getElementById("conpassword").addEventListener("blur", function () {
  if (passwordinput.value === conpassword.value) {

    validPassword = true;

  } else {
    errrpass.innerHTML = "the password not mathes ";
    errrpass.style.color = "red";
    validPassword = false;
  }
  //
});

var dne = document.getElementById("form");
dne.addEventListener("submit", function (e) {
  if (!validName || !validPassword) {
    e.preventDefault();
  }
});
