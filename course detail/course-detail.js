var params = new URLSearchParams(window.location.search);
var category = params.get("category");

var courseImg = document.getElementsByClassName("video-placeholder")[0];
var enrollcourse = document.getElementsByClassName("enroll")[0];
var htx = new XMLHttpRequest();
htx.open("GET", "../data/data.json");

htx.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    JsonData = JSON.parse(htx.response);
    var course = JsonData[category];

    if (!course) {
      console.error("Category not found in data.json");
      return;
    }

    var img = document.createElement("img");
    img.src = course.img;
    img.style.height = "100%";
    img.style.width = "100%";
    courseImg.appendChild(img);

    document.getElementById("courseName").innerHTML = "Course " + course.id;
    document.getElementById("description").innerHTML = course.description;
    document.getElementById(
      "ContainLessons"
    ).innerHTML = `Contain ${course.videos.length} Lessons`;

    if (course.videos) {
      var counter = 1;
      course.videos.forEach(function (video) {
        var lesson = document.createElement("div");
        lesson.classList.add("lesson");

        var lessonNumber = document.createElement("div");
        lessonNumber.classList.add("lesson-number");
        lessonNumber.textContent = counter;

        lesson.appendChild(lessonNumber);

        var lessonContent = document.createElement("div");

        var lessonTitle = document.createElement("div");
        lessonTitle.classList.add("lesson-title");
        lessonTitle.textContent = "Lesson " + counter++;

        var lessonParagraph = document.createElement("p");
        lessonParagraph.textContent = video.title;

        lessonContent.appendChild(lessonTitle);
        lessonContent.appendChild(lessonParagraph);

        lesson.appendChild(lessonContent);

        document.getElementsByClassName("lesson-list")[0].appendChild(lesson);
        lesson.addEventListener("click", function () {
          var videoPageUrl = `../Course/incourse.html?title=${encodeURIComponent(
            video.title
          )}&src=${encodeURIComponent(video.src)}&category=${encodeURIComponent(
            category
          )}`;
          window.location.href = videoPageUrl;
        });
        enrollcourse.addEventListener("click", () => {
          addCourseToUser(category);
          var videoPageUrl = `../Course/incourse.html?title=${encodeURIComponent(
            course.videos[0].title
          )}&src=${encodeURIComponent(course.videos[0].src)}&category=${encodeURIComponent(
            category
          )}`;
          window.location.href = videoPageUrl;
        });
      });
    } else {
      console.error("No videos found for this category.");
    }
  }
};
htx.send();
let addCourseToUser = (courseID) => {
  let currentUser = localStorage.getItem("currentUser");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let newUsers = users.map((u) => {
    if (u.email == currentUser) {
      if (!u.courses) {
        u.courses = [];
      }
      if (!u.courses.includes(courseID)) {
        u.courses.push(courseID);
      }
    }
    return u;
  });
  localStorage.setItem("users", JSON.stringify(newUsers));
};
