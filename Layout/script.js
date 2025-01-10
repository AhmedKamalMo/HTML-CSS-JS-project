

let nav_items = [
    {
        "name": "Home",
        "url": "/",
    },
    {
        "name": "Courses",
        "url": "/Courses/courses-steps.html",
    },
    {
        "name": "My learning",
        "url": "/Profile/index.html",
    },
];



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
    //create and append the link element for the font file
    const link3 = document.createElement('link');
    link3.rel = 'stylesheet';
    link3.href = "https://fonts.googleapis.com/css2?family=Mansalva&family=Marcellus+SC&family=Margarine&display=swap";
    document.head.appendChild(link3);



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

    // Create the modal for login alert
    const modal = document.createElement('div');
    modal.id = "popup-box";
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.inset = "0";
    modal.style.background = "rgba(0, 0, 0, 0.76)";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";

    modal.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 5px; position: relative; text-align: center;">
            <button id="close-modal" style="position: absolute; top: 10px; right: 10px; background: transparent; border: none; font-size: 18px; color:red; cursor: pointer;">&times;</button>
            <h1 style="color: #7e1818;">Please login to access this page</h1>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = document.getElementById('close-modal');
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });

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
            item.classList.add('item');
            if (window.location.pathname == nav_items[i].url) {
                item.classList.add('activeLink');
            }
            item.addEventListener('click', () => {
                if (!localStorage.getItem('currentUser') && i == 2) {
                    modal.style.display = "flex"; // Show modal instead of alert
                } else {
                    window.location.href = nav_items[i].url;
                }
            });
            nav.appendChild(item);
        }
        if (!localStorage.getItem('currentUser')) {
            let login = document.createElement('p');
            login.innerHTML = '<i class="fa-solid fa-right-to-bracket" style="font-size: 20px;"></i>';
            login.classList.add('item');
            login.addEventListener('click', () => {
                window.location.href = '../Login/login.html';
            });
            nav.appendChild(login);
        }
        else {
            let userData = getUserData();
            let user = document.createElement('div');
            user.classList.add('userData');
            user.innerHTML = `
            <img src="${userData.img || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}"/>
            <div class="logout">
                <p><i class="fa-solid fa-right-from-bracket"></i> Logout</p>
            </div>
        `;
            user.addEventListener('click', () => {
                let logoutBox = document.getElementsByClassName('logout')[0];
                if (logoutBox.style.display == 'flex') {
                    logoutBox.style.display = 'none';
                }
                else {
                    logoutBox.style.display = 'flex';
                }
                logoutBox.addEventListener('click', () => {
                    localStorage.removeItem('currentUser');
                    window.location.href = '../index.html';

                });
            });
            nav.appendChild(user);
        }
    })();
   
    
});

let getUserData = () => {
    let cUserEmail = localStorage.getItem("currentUser");
    let users = JSON.parse(localStorage.getItem("users"))
    return users.find((u) => { return u.email === cUserEmail });
}
