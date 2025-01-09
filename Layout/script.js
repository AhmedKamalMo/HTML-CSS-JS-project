let nav_items = [
    {
        "name": "Home",
        "url": "/",
    },
    {
        "name": "Courses",
        "url": "/Courses/courses steps.html",
    },
    {
        "name": "My learning",
        "url": "/Profile/index.html",
    },
]

let currentUserData;


document.addEventListener("DOMContentLoaded", function () {

    // Create and append the link element for the CSS file
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../Layout/style.css';
    document.head.appendChild(link);

    // Create and append the link element for the icons file
    const link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
    document.head.appendChild(link2);

    // Create and insert the header element
    const header = document.createElement('header');
    header.innerHTML = `
        <nav>
            <p>Steps</p>
            <div id="nav-links">
                
            </div>
        </nav>
        `;
    document.body.insertBefore(header, document.body.firstChild);

    // Create and insert the footer element
    const footer = document.createElement('footer');
    footer.innerHTML = `
       
       <div class="lets">
        <h1>LETS Learn With <span class="highlight">Steps</span></h1>
        <p>to upgrade your level.</p>
    </div>
    <div class="subscribe">
        <p>write your email to notife you with the new courses </p>
        <form>
            <input type="email" placeholder="YOUR EMAIL" required>
            <button type="submit">SUBSCRIBE</button>
        </form>
    </div>
    <div class="contact-social">
       
        <div class="contact">
            <p>CALL US</p>
            <p><a href="tel:0285419786">02 8541 9786</a></p>
        </div>
    </div>
      
    `;
    document.body.appendChild(footer);
    (() => {
        let nav = document.getElementById('nav-links');
        for (let i = 0; i < nav_items.length; i++) {
            let item = document.createElement('p');
            item.innerHTML = nav_items[i].name;
            item.classList.add('item')

            item.addEventListener('click', () => {
                if (!localStorage.getItem('currentUser') && i == 2) {
                    alert("Please login to access this page");
                } else {
                    window.location.href = nav_items[i].url;
                }
            })
            nav.appendChild(item);
        }
        if (!localStorage.getItem('currentUser')) {
            let login = document.createElement('p');
            login.innerHTML = '<i class="fa-solid fa-right-to-bracket" style="font-size: 20px;"></i>';
            login.classList.add('item')
            login.addEventListener('click', () => {
                window.location.href = '../Login/login.html'
            })
            nav.appendChild(login);
        }
        else {
            let userData = getUser();
            let user = document.createElement('div');
            user.classList.add('userData')
            user.innerHTML = `
            <img src="${userData.img || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}"/>
            <!-- <p>${userData.firstName + " " + userData.lastName}</p> -->
            <div class="logout">
                <p><i class="fa-solid fa-right-from-bracket"></i> Logout</p>
            </div>
        `;
            user.addEventListener('click', () => {
                let logoutBox = document.getElementsByClassName('logout')[0];
                if(logoutBox.style.display == 'flex'){
                    logoutBox.style.display = 'none';
                }
                else{
                    logoutBox.style.display = 'flex';
                }
                logoutBox.addEventListener('click',()=>{
                    localStorage.removeItem('currentUser');
                    window.location.href = '../index.html';
                    
                })
            })
            nav.appendChild(user);
        }
    })()
});

let getUser = () => {
    let cUserEmail = localStorage.getItem("currentUser");
    let users = JSON.parse(localStorage.getItem("users"))
    let currentUserData = users.find((u) => { return u.email === cUserEmail });
    return currentUserData;
}