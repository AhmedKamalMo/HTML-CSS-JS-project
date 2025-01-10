function getlocal() {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    return { users };
}

function getpassword() {
    var email = document.getElementById("emailinput").value; 

    var { users } = getlocal(); 


    let user = users.find(user => user.email === email);

    if (user) {
        
        document.getElementById("show").innerText =
            "Your password is: " + user.pass; 
    } else {
        
        document.getElementById("show").innerText =
            "There email address is not registered";
    }
}


function gologein() {
    location.href = "../login/login.html";  // Go to login page
}
