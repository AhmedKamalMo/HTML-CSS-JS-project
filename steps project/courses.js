// var videoDiv = document.getElementById("showVideo");
var root = document.getElementsByClassName("material")[0];
// get data from json
var JsonData;
var htx = new XMLHttpRequest();
htx.open("GET", "/data.json");
htx.onreadystatechange = function () {
  // console.log("vv");

  if (this.readyState == 4 && this.status == 200) {
    JsonData = JSON.parse(htx.response);
    // console.log(JsonData);
    for (let index of JsonData) {
      // console.log(index.src);

      var div = document.createElement("div");
      div.classList.add("boox");
      root.appendChild(div);
      var video = document.createElement("video");
      
      video.src = index.src;
      video.style.width = 100+'%';
      video.style.height = 100+'%';
      video.controls = true;
      video.poster="./aa.jpg"
      div.appendChild(video);
      // console.log(index);
    }
  }
};
htx.send();
