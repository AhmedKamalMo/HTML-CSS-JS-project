var root = document.getElementsByClassName("material")[0];
var cardContainer = document.getElementsByClassName("card-container")[0];
var JsonData;
var htx = new XMLHttpRequest();
htx.open("GET", "../data/data.json");

htx.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    JsonData = JSON.parse(htx.response);
    Object.keys(JsonData).forEach(function (category) {
      var dataArray = JsonData[category];
      dataArray.forEach(function (item) {
        card = document.createElement("div");
        card.classList.add("card");

        const imagePlaceholder = document.createElement("div");
        imagePlaceholder.classList.add("image-placeholder");
        card.appendChild(imagePlaceholder);

        var poster = document.createElement("img");
        poster.src = "../assets/courses/" +item.poster;
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
        cardTitle.textContent = item.title;
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
        paragraph.textContent =
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.";
        cardContent.appendChild(paragraph);

        const enrollButton = document.createElement("a");
        enrollButton.href = "#";
        enrollButton.classList.add("enroll");
        enrollButton.textContent = "enroll now";
        cardContent.appendChild(enrollButton);
        cardContainer.appendChild(card);
        enrollButton.addEventListener("click", function () {
          var videoPageUrl = `./incourse.html?title=${encodeURIComponent(
            item.title
          )}&src=${encodeURIComponent(item.src)}&category=${encodeURIComponent(
            category
          )}`;
          window.location.href = videoPageUrl;
        });
      });
    });
  }
};
htx.send();

function selected(index) {
  cardContainer.innerHTML = "";
  var category = Object.keys(JsonData)[index];
  var courses = JsonData[category];
  console.log(courses);

  var buttons = document.querySelectorAll(".categories button");
  buttons.forEach(function (button, idx) {
    button.style.backgroundColor = "";
    button.style.color = "#ac7979";

    if (idx === index) {
      button.style.backgroundColor = "#4CAF50";
      button.style.color = "white";
    }
  });

  courses.forEach(function (item) {
    card = document.createElement("div");
    card.classList.add("card");

    const imagePlaceholder = document.createElement("div");
    imagePlaceholder.classList.add("image-placeholder");
    card.appendChild(imagePlaceholder);

    var poster = document.createElement("img");
    poster.src = "../assets/courses/"+item.poster;
    poster.classList.add("poster");
    poster.style.cursor = "pointer";
    poster.style.width = "100%";
    poster.style.height = "100%";
    poster.style.borderRadius = "10px";
    imagePlaceholder.appendChild(poster);

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    card.appendChild(cardContent);

    const cardHead = document.createElement("div");
    cardHead.classList.add("card-head");
    cardContent.appendChild(cardHead);

    const cardTitle = document.createElement("h5");
    cardTitle.textContent = item.title;
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
    paragraph.textContent =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.";
    cardContent.appendChild(paragraph);

    const enrollButton = document.createElement("a");
    enrollButton.href = "#";
    enrollButton.classList.add("enroll");
    enrollButton.textContent = "enroll now";
    cardContent.appendChild(enrollButton);
    cardContainer.appendChild(card);

    enrollButton.addEventListener("click", function () {
      var videoPageUrl = `./incourse.html?title=${encodeURIComponent(
        item.title
      )}&src=${encodeURIComponent(item.src)}&category=${encodeURIComponent(
        category
      )}`;
      window.location.href = videoPageUrl;
    });
  });
}
