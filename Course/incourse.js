var mainContent = document.getElementsByClassName("main-content")[0];
var videoPlayer = document.getElementsByClassName("video-player")[0];
var sidebar = document.getElementsByClassName("sidebar")[0];
var params = new URLSearchParams(window.location.search);
var mainTitle = params.get("title");
var mainSrc = params.get("src");
var category = params.get("category");
var count = 0;
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

    if (JsonData[category]) {
      var c = 0;
      var relatedVideos = JsonData[category].filter(function (item) {
        c++;
        if (item.title == mainTitle) count = c - 1;
        return item.title !== mainTitle;
      });

      relatedVideos.forEach(function (item) {
        var lesson = document.createElement("div");
        lesson.classList.add("lesson");
        sidebar.appendChild(lesson);
        var poster = document.createElement("img");
        poster.classList.add("lesson-thumbnail");
        poster.src ="../assets/courses/"+ item.poster;
        poster.alt = item.title;

        var title = document.createElement("h3");
        title.textContent = item.title;
        title.style.fontSize = "15px";
        title.classList.add("lesson-title");

        poster.addEventListener("click", function () {
          var videoPageUrl = `/incourse.html?title=${encodeURIComponent(
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

//
var timer = 30;
var score = 0;
var interval;
var questionIndex = 0;
var divtimer = document.getElementById("timer");
var practice = document.getElementById("practice-content");
// var bu
function startQuiz() {
  practice.innerHTML = "";
  divtimer.innerHTML = "";
  console.log(count);

  var timerElement = document.createElement("div");
  timerElement.id = "timer";
  timerElement.textContent = `Time left: ${timer} seconds`;
  divtimer.appendChild(timerElement);
  interval = setInterval(() => {
    console.log(timer);

    timer--;
    timerElement.textContent = `Time left: ${timer} seconds`;
    if (timer <= 0) {
      clearInterval(interval);
      endQuiz();
    }
  }, 1000);

  showQuestion();
}

function showQuestion() {
  var v = JsonData[category];
  var quest = v[count] && v[count].quiz;

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
          button.style.background='green';
          button.style.margin='5px';
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
  var v = JsonData[category];
  practice.innerHTML = `Your score: ${score}/${questionIndex} <br> ${
    score >= Math.ceil(questionIndex * 0.6) ? "Congratulations!" : "Try again!"
  }`;
  questionIndex = 0;
  score = 0;
  timer = 30;
}
