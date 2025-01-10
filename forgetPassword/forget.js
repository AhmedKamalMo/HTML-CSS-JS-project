// Function to get users from localStorage
function getlocal() {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    return { users };
}

// Function to handle "Forgot Password" logic
function getpassword() {
    var email = document.getElementById("emailinput").value; // Get the email input value

    var { users } = getlocal(); // Retrieve users from localStorage

    // Find user by email
    let user = users.find(user => user.email === email);

    if (user) {
        // If the email exists, show the corresponding password
        document.getElementById("show").innerText =
            "Your password is: " + user.pass;  // Use user.pass, not user.password
    } else {
        // If the email does not exist
        document.getElementById("show").innerText =
            "There email address is not registered";
    }
}

// Redirect to login page
function gologein() {
    location.href = "../login/login.html";  // Go to login page
}
