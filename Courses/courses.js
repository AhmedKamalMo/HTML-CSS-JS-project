var root = document.getElementsByClassName("material")[0];
var cardContainer = document.getElementsByClassName("card-container")[0];
var JsonData;
var htx = new XMLHttpRequest();
htx.open("GET", "../data/data.json");

htx.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    JsonData = JSON.parse(htx.response);
    console.log(JsonData);

    Object.keys(JsonData).forEach(function (category) {
      var dataArray = JsonData[category];
      data(dataArray, category);
    });
  }
};
htx.send();

function selected(id, index) {
  cardContainer.innerHTML = "";
  Object.keys(JsonData).forEach(function (category) {
    var dataArray = JsonData[category];
    if (dataArray.id == id) {
      data(dataArray, category);
    }
  });

  var buttons = document.querySelectorAll(".categories button");
  buttons.forEach(function (button, idx) {
    button.style.backgroundColor = "";
    button.style.color = "#ac7979";

    if (idx === index) {
      button.style.backgroundColor = "#4CAF50";
      button.style.color = "white";
    }
  });
}

function data(dataArray, category) {
  card = document.createElement("div");
  card.classList.add("card");
  console.log(dataArray.description);
  console.log(dataArray.img);

  const imagePlaceholder = document.createElement("div");
  imagePlaceholder.classList.add("image-placeholder");
  card.appendChild(imagePlaceholder);

  var poster = document.createElement("img");
  poster.src = dataArray.img;
  poster.classList.add("poster");
  poster.style.cursor = "pointer";
  poster.style.width = "100%";
  poster.style.height = "100%";
  imagePlaceholder.appendChild(poster);

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  card.appendChild(cardContent);

  const cardHead = document.createElement("div");
  cardHead.classList.add("card-head");
  cardContent.appendChild(cardHead);

  const cardTitle = document.createElement("h5");
  cardTitle.textContent = dataArray.id;
  cardHead.appendChild(cardTitle);

  const rating = document.createElement("div");
  rating.classList.add("rating");

  for (let i = 0; i < 5; i++) {
    const star = document.createElement("span");
    star.innerHTML = "&#9733;";
    if (i >= 3) {
      star.classList.add("inactive");
    }
    rating.appendChild(star);
  }
  cardHead.appendChild(rating);

  const paragraph = document.createElement("p");
  paragraph.textContent = dataArray.description;
  cardContent.appendChild(paragraph);

  const enrollButton = document.createElement("a");
  enrollButton.href = "#";
  enrollButton.classList.add("enroll");
  enrollButton.textContent = "enroll now";
  cardContent.appendChild(enrollButton);
  cardContainer.appendChild(card);

  enrollButton.addEventListener("click", function () {
    var videoPageUrl = `../course detail/course-detail.html?&category=${encodeURIComponent(
      category
    )}`;
    window.location.href = videoPageUrl;
  });
}
