function getlocal() {
  var emailval = JSON.parse(localStorage.getItem("emails")) || [];
  var passval = JSON.parse(localStorage.getItem("pass")) || [];
  return { emailval, passval };

  // localStorage.emails = JSON.stringify(emails);
  // var storedemails = JSON.parse(localStorage.emails);
}

let email1 = getlocal();

// let displayname = (document.getElementById("emails").innerText = email1);
console.log(email1);
// let toparr = email1[email1.length - 1]
// let dis = (document.getElementById("emails").innerText = toparr);

window.addEventListener("DOMContentLoaded", function () {
  var currentEmail = localStorage.getItem("currentEmail");
  if (currentEmail) {
    document.getElementById("emails").innerText = `Welcome, ${currentEmail}`;
  }
});

function removelocal() {
  // localStorage.removeItem("email");
  // localStorage.removeItem("userpassword");

  location.href = "./login.html";
}

function goToPage() {
  location.href = "./registration/registration.html";
}

// slider
var im = [
  "./assets/courses/math.webp",
  "./assets/courses/cooking.jpg",
  "./assets/courses/science.jpg",
  "./assets/courses/softskills.jpg",
];
var course = ["math", "cooking", "Science", "softSkills"];
var slider = document.getElementById("slider");
var back1 = document.createElement("button");
slider.appendChild(back1);
back1.classList.add("backarrow");
var img1 = document.createElement("img");
slider.appendChild(img1);
img1.classList.add("sliderimg");

var forward1 = document.createElement("button");
forward1.classList.add("forwardarrow");

slider.appendChild(forward1);
var desc1 = document.createElement("p");
desc1.classList.add("des");
slider.appendChild(desc1);

var des = [
  "Learn numbers, addition, subtraction",
  "Learn to cook tasty dishes step by step",
  "Explore exciting experiments and science facts",
  "Improve communication and teamwork skills",
];

img1.setAttribute("src", im[0]);
back1.innerHTML = '<i class="fas fa-chevron-left"></i>';
back1.setAttribute("id", "back");
forward1.innerHTML = '<i class="fas fa-chevron-right"></i>';
forward1.setAttribute("id", "forward");
var currant_index = 0;
var interval;
int();
function int() {
  interval = setInterval(function () {
    currant_index++;
    if (currant_index > 3) currant_index = 0;
    img1.setAttribute("src", `${im[currant_index]}`);
  }, 3000);
}
img1.addEventListener("mouseover", function () {
  clearInterval(interval);
  desc1.textContent = `${des[currant_index]}`;
});
img1.addEventListener("click", function () {
  var videoPageUrl = `../course detail/course-detail.html?&category=${encodeURIComponent(
    course[currant_index]
  )}`;
  window.location.href = videoPageUrl;
});
img1.addEventListener("mouseleave", function () {
  desc1.textContent = "";
  int();
});

//   back
back1.addEventListener("click", function () {
  clearInterval(interval);
  currant_index--;
  if (currant_index > 3) currant_index = 0;
  else if (currant_index < 0) currant_index = 3;
  img1.setAttribute("src", `${im[currant_index]}`);
  desc1.textContent = `${des[currant_index]}`;
});
back1.addEventListener("mouseleave", function () {
  desc1.textContent = "";
  int();
});

// forward
forward1.addEventListener("click", function () {
  clearInterval(interval);
  currant_index++;
  if (currant_index > 3) currant_index = 0;
  else if (currant_index < 0) currant_index = 3;
  img1.setAttribute("src", `${im[currant_index]}`);
  desc1.textContent = `${des[currant_index]}`;
});
forward1.addEventListener("mouseleave", function () {
  desc1.textContent = "";
  int();
});
