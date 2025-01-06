
var emailval = JSON.parse(localStorage.getItem("emails")) || [];
var passval = JSON.parse(localStorage.getItem("pass") ) || [];

function createlocal() {

  // var emails = [];
  // var pass = [];

   let emails = document.getElementById("emailinput").value;
   let pass = document.getElementById("passwordinput").value;

   emailval.push(emails)
   passval.push(pass)
  
      localStorage.setItem("emails", JSON.stringify(emailval));
      // localStorage.pass = JSON.stringify(passval) ;
      localStorage.setItem("pass", JSON.stringify(passval));
      localStorage.setItem("currentEmail", emails);

     
    //   removelocal();
    // location.href = "./Home/Home.html";
  }
  
//   function removelocal() {
//     localStorage.removeItem("username");
//     localStorage.removeItem("userpassword");
//   }

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
