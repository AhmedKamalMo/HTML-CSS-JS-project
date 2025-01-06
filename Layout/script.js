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


document.addEventListener("DOMContentLoaded", function () {

    // Create and append the link element for the CSS file
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../Layout/style.css';
    document.head.appendChild(link);

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
       
        <div>
          <a href="">Contact With Us</a>
          <a href="">Steps</a>
          <a href="">0128926565</a>
        </div>
      
    `;
    document.body.appendChild(footer);
    let showNavItems = (()=>{
        let nav = document.getElementById('nav-links');
        
        for (let i = 0; i < nav_items.length; i++) {
            let item = document.createElement('p');
            item.innerHTML = nav_items[i].name;
            item.classList.add('item')
            item.addEventListener('click',()=>{
                console.log(nav_items[i].url)

                console.log(window.location.href)
                window.location.href = nav_items[i].url;
            })
            nav.appendChild(item)
        }
    })()
});

