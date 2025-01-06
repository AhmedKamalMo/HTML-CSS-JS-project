// function createlocal() {

    // var email = document.getElementById("emailinput").value;
    // var pass = document.getElementById("passwordinput").value;
  
    //   localStorage.setItem("email", email);
    //   localStorage.userpassword = pass;


    var dne = document.getElementById("form");

    dne.addEventListener("submit", function (e) {

    let emails = document.getElementById("emailinput").value;
    let pass = document.getElementById("passwordinput").value;
    var errrpass = document.getElementById("errorpass");


    var emailval = JSON.parse(localStorage.getItem("emails")) || []
    console.log(emailval)
    var passval = JSON.parse(localStorage.getItem("pass")) || []
    console.log(passval)

    var emailindex = emailval.indexOf(emails)

      if (emailindex !== -1 && passval[emailindex] === pass ) {
        localStorage.setItem("currentEmail", emails);
    location.href = "./Home/Home.html";
      }
      else{
    errrpass.innerHTML = "You are not registered";
        e.preventDefault();

      }
    });
    

    //   removelocal();
    // location.href = "./Home/Home.html";
  // }
  
//   function removelocal() {
//     localStorage.removeItem("username");
//     localStorage.removeItem("userpassword");
//   }
  
  
  