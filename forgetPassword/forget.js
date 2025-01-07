function getlocal() {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    return { users };
}

function getpassword() {
    var email = document.getElementById("emailinput").value;


    var { users } = getlocal();

    //find user by email
    let user = users.find(user=>user.email===email)

    if (user ) {
        // If the email exists, show the corresponding password
        document.getElementById("show").innerText =
            "Your password is: " + user.password;
    } else {
        // If the email does not exist
        document.getElementById("show").innerText =
            "There is no email with this name";
    }
}

function gologein() {
    location.href = "../login/login.html"
}