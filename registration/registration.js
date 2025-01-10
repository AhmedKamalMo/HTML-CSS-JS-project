var users = JSON.parse(localStorage.getItem("users")) || [];

let emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
let nameRegex = /^[A-Za-z][A-Za-z]*$/;

var form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let email = document.getElementById("emailinput").value;
  let password = document.getElementById("passwordinput").value;
  let firstName = document.getElementById("fName").value;
  let lastName = document.getElementById("lName").value;
  let isValidForm = true;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    isValidForm = false;
  }

  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 8 characters and contain at least one letter and one number."
    );
    isValidForm = false;
  }

  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    alert(
      "First name and last name should not contain numbers or special characters."
    );
    isValidForm = false;
  }

  let conpassword = document.getElementById("conpassword").value;
  if (password !== conpassword) {
    alert("Passwords do not match.");
    isValidForm = false;
  }

  let isUser = users.find((user) => user.email === email);
  if (isUser) {
    alert("User already exists.");
    isValidForm = false;
  }

  if (isValidForm) {
    users.push({ firstName, lastName, email, pass: password });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", email);
    alert("User successfully added!");
    // form.reset();
    location.href="../index.html"
  }
});
