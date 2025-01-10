let currentUserData;
let coursesList = document.getElementsByClassName("profile__courses__list")[0];
let progressList = document.getElementsByClassName("progress_list")[0];
let username = document.getElementById("username");
let userImg = document.getElementById("userimg");

let getUser = (() => {
    let cUserEmail = localStorage.getItem("currentUser");
    let users = JSON.parse(localStorage.getItem("users"))
    currentUserData = users.find((u) => { return u.email === cUserEmail });
    return currentUserData;
})()

let showUserData = (() => {
    username.innerText = `${currentUserData.firstName} ${currentUserData.lastName}`;
    userImg.src = currentUserData.img || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

})()
let edituserdata = (newImg) => {
    currentUserData.img = newImg;
    let users = JSON.parse(localStorage.getItem("users"))
    users.map((u) => {
        if (u.email == currentUserData.email) {
            u.img = newImg;
        }
        return u;
    });
    localStorage.setItem("users", JSON.stringify(users));
}

let editUserImg = (() => {
    document.getElementById("userimg").addEventListener("click", function () {
        // Create a hidden file input dynamically
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*"; // Accept only image files

        // Trigger the file input click
        fileInput.click();

        // Handle the file selection
        fileInput.addEventListener("change", function () {
            const file = fileInput.files[0];
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const userImage = document.getElementById("userimg");
                    userImage.src = e.target.result; // Update the user image preview
                    edituserdata(e.target.result);
                };
                reader.readAsDataURL(file); // Read the file as a data URL
            } else {
                alert("Please select a valid image file.");
            }
        });
    });
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
                course.addEventListener('click', () => {
                    var videoPageUrl = `../course detail/course-detail.html?&category=${encodeURIComponent(c)}`;
                    window.location.href = videoPageUrl;

                })
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
            let quiz = document.createElement("div");
            quiz.className = "progress_list_item";
            quiz.innerHTML = `
                        <div class="info">
                            <h3>${q.lesson}</h3>
                            <p>${q.courseName}</p>
                        </div>
                        <div class="grede">
                            <h3>${q.score}/${q.questionIndex}</h3>
                        </div>
            `
            progressList.appendChild(quiz);
        });
    }
    else {
        progressList.innerHTML = `<p>you has not any quiz</p>`
        console.log('lollll')
    }
}
)()