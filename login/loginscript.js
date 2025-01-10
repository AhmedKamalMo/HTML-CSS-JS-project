// function createlocal() {

    // var email = document.getElementById("emailinput").value;
    // var pass = document.getElementById("passwordinput").value;
  
    //   localStorage.setItem("email", email);
    //   localStorage.userpassword = pass;


    var loginbtn = document.getElementById("login-btn");

    loginbtn.addEventListener("click", function (e) {
      e.preventDefault();
    let email = document.getElementById("emailinput").value;
    let password = document.getElementById("passwordinput").value;
    var errrpass = document.getElementById("errorpass");


    var users = JSON.parse(localStorage.getItem("users")) || []
    
    //find user bu email
    var user = users.find(user => user.email === email);
    
    if (user) {
      if (user.pass == password) {
        alert("Welcome " + user.firstName);
        localStorage.setItem("currentUser", email);
        window.location.href = "../index.html";
        } else {
          errrpass.innerHTML = "Wrong password";
        }
        } else {
          errrpass.innerHTML = "User not found";
          }
          
          
          });
          
    //   if (emailindex !== -1 && passval[emailindex] === pass ) {
    //     localStorage.setItem("currentEmail", emails);
    // location.href = "./Home/Home.html";
    //   }
    //   else{
    // errrpass.innerHTML = "You are not registered";
    //     e.preventDefault();

    //   }
    // });
    

    //   removelocal();
    // location.href = "./Home/Home.html";
  // }
  
//   function removelocal() {
//     localStorage.removeItem("username");
//     localStorage.removeItem("userpassword");
//   }
  
  
  