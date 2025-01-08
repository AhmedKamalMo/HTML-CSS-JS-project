let currentUserData;
let coursesList = document.getElementsByClassName("profile__courses__list")[0];

let getUser = (() => {
    let cUserEmail = localStorage.getItem("currentUser");
    let users = JSON.parse(localStorage.getItem("users"))
    currentUserData = users.find((u) => { return u.email === cUserEmail });
    return currentUserData;
})()


var htx = new XMLHttpRequest();
htx.open("GET", "../data/data.json");

htx.onreadystatechange = function () {
    console.log('lol');
    if (htx.readyState === 4 && htx.status === 200) {
        let JsonData = JSON.parse(htx.response);

        if (currentUserData.courses) {
            currentUserData.courses.forEach(c => {
                console.log(c)
                let cData = JsonData[c];
                let course = document.createElement("div");
                course.className = "profile__courses__list__item";
                course.innerHTML = `
                 <div class="video">
                            <img src="${cData.img}" width=200 height=150 alt="">
                            <img src="../assets/profile/Circled Play.png" class="video-icon">
                        </div>
                        <div>
                            <h3>${cData.id}</h3>
                            <p>${cData.description}</p>
                        </div>
                `
                coursesList.appendChild(course);
                
            });

        }
        else {
            coursesList.innerHTML = `<p>you has not any course</p>`
        }
    }
}
htx.send();

(function showQuizzes() {
    if (currentUserData.quizzes) {
        currentUserData.quizzes.forEach(q => {
            console.log(q)
            let quiz=document.createElement("div");
            quiz.className="progress_list_item";
            quiz.innerHTML=`
                        <div class="info">
                            <h3>${q.lesson}</h3>
                            <p>${q.courseName}</p>
                        </div>
                        <div class="grede">
                            <h3>${q.score}</h3>
                        </div>
            `
           progressList.appendChild(quiz);
        });

    }
    else {
        coursesList.innerHTML = `<p>you has not any quiz</p>`
    }
}
)()