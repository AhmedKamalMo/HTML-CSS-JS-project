var mainContent = document.getElementsByClassName("main-content")[0];
var videoPlayer = document.getElementsByClassName("video-player")[0];
var sidebar = document.getElementsByClassName("sidebar")[0];
var params = new URLSearchParams(window.location.search);
var mainTitle = params.get("title");
var mainSrc = params.get("src");
var category = params.get("category");
var count = 0;
var JsonData;

var htx = new XMLHttpRequest();
htx.open("GET", "../data/data.json");

htx.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    JsonData = JSON.parse(htx.response);

    var mainVideo = document.createElement("iframe");
    mainVideo.src = mainSrc;
    mainVideo.style.height = "100%";
    mainVideo.style.width = "100%";
    videoPlayer.appendChild(mainVideo);

    document.getElementById("category").textContent = category;
    document.getElementById("lesson").textContent = mainTitle;

    if (JsonData[category] && JsonData[category].videos) {
      var videos = JsonData[category].videos;

      var relatedVideos = videos.filter(function (item, index) {
        if (item.title === mainTitle) count = index;
        return item.title !== mainTitle;
      });

      relatedVideos.forEach(function (item) {
        var lesson = document.createElement("div");
        lesson.classList.add("lesson");
        sidebar.appendChild(lesson);

        var poster = document.createElement("img");
        poster.classList.add("lesson-thumbnail");
        poster.src = item.poster;
        poster.alt = item.title;

        var title = document.createElement("h3");
        title.textContent = item.title;
        title.style.fontSize = "15px";
        title.classList.add("lesson-title");

        poster.addEventListener("click", function () {
          var videoPageUrl = `../Course/incourse.html?title=${encodeURIComponent(
            item.title
          )}&src=${encodeURIComponent(item.src)}&category=${encodeURIComponent(
            category
          )}`;
          window.location.href = videoPageUrl;
        });

        lesson.appendChild(poster);
        lesson.appendChild(title);
      });
    }
  }
};
htx.send();

var timer = 30;
var score = 0;
var interval;
var questionIndex = 0;
var divtimer = document.getElementById("timer");
var practice = document.getElementById("practice-content");

function startQuiz() {
  practice.innerHTML = "";
  divtimer.innerHTML = "";

  var timerElement = document.createElement("div");
  timerElement.id = "timer";
  timerElement.textContent = `Time left: ${timer} seconds`;
  divtimer.appendChild(timerElement);

  interval = setInterval(() => {
    timer--;
    timerElement.textContent = `Time left: ${timer} seconds`;
    if (timer <= 0) {
      clearInterval(interval);
      endQuiz();
    }
  }, 1000);

  showQuestion();
}
var questlength =0;
function showQuestion() {
  var videos = JsonData[category].videos;
  var quest = videos[count] && videos[count].quiz;
  questlength=quest.length;

  if (quest && quest.length > 0) {
    practice.innerHTML = "";

    if (questionIndex < quest.length) {
      var question = quest[questionIndex];

      if (question) {
        var questionElement = document.createElement("p");
        questionElement.textContent = question.question;
        practice.appendChild(questionElement);

        question.options.forEach((option) => {
          var button = document.createElement("button");
          button.textContent = option;
          button.style.background = "green";
          button.style.margin = "5px";
          button.style.minWidth = "20px";
          button.onclick = function () {
            if (option === question.correct) score++;
            questionIndex++;
            showQuestion();
          };
          practice.appendChild(button);
        });
      } else {
        endQuiz();
      }
    } else {
      endQuiz();
    }
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(interval);
  practice.innerHTML = `Your score: ${score}/${questlength} <br> ${
    score >= Math.ceil(questlength * 0.6) ? "Congratulations!" : "Try again!"
  }`;
  addQuizScore(category, mainTitle, score, questlength);

  questionIndex = 0;
  score = 0;
  timer = 30;
}

let addQuizScore = (courseName, lesson, score, questionIndex) => {
  let currentUser = localStorage.getItem("currentUser");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let newUsers = users.map((u) => {
    if (u.email == currentUser) {
      if (!u.quizzes) u.quizzes = [];
      u.quizzes.push({ courseName, lesson, score, questionIndex });
    }
    return u;
  });
  localStorage.setItem("users", JSON.stringify(newUsers));
};
