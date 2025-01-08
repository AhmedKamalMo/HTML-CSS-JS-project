// function createlocal() {

    // var email = document.getElementById("emailinput").value;
    // var pass = document.getElementById("passwordinput").value;
  
    //   localStorage.setItem("email", email);
    //   localStorage.userpassword = pass;


    var dne = document.getElementById("form");

    dne.addEventListener("submit", function (e) {

    let email = document.getElementById("emailinput").value;
    let password = document.getElementById("passwordinput").value;
    var errrpass = document.getElementById("errorpass");


    var users = JSON.parse(localStorage.getItem("users")) || []
    
    //find user bu email
    var user = users.find(user => user.email === emails);
    if (user) {
      if (user.password === pass) {
        alert("Welcome " + user.name);
        localStorage.setItem("currentUser", emails);
        window.location.href = "index.html";
        } else {
          errrpass.innerHTML = "Wrong password";
        }
        } else {
          errrpass.innerHTML = "User not found";
          }
          
          e.preventDefault();
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
  
  
  