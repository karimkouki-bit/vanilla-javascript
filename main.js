// check if there's local storage color option

let mainColor = localStorage.getItem('color-option');
if(mainColor !== null){
    // console.log('local storage is not empty');
   // console.log(localStorage.getItem('color-option'));

   document.documentElement.style.setProperty('--main-color', localStorage.getItem('color-option'))

   // remove active class from all colors list item

   document.querySelectorAll('.colors-list li').forEach(element => {
    element.classList.remove("active")

    // add active class on elemnt with data color === local storage item

    if(element.dataset.color === mainColor){
        // add active class
        element.classList.add("active")
    }
});
}

// random background option
let backgroundOption = true;

// variable to control the background interval

let backgroundInterval;

// check if there"s local storage background item

let backgroundlocalItem = localStorage.getItem('background_option');

// check if random background local storage is not empty
if(backgroundlocalItem !== null) {
    if(backgroundlocalItem === 'true') {
        backgroundOption = true
    } else {
        backgroundOption = false
    }
    // remove class active from all spans
    document.querySelectorAll('.random-background span').forEach(element =>{
        element.classList.remove('active')
    })

    if(backgroundlocalItem === 'true') {
        document.querySelector('.random-background .yes').classList.add('active');
    } else {
        document.querySelector('.random-background .no').classList.add('active');

    }
}

// toggle spin class on icon

document.querySelector('.toggle-setting .fa-cog').onclick = function() {

    // toggle cla fa-spin for rotation on self
    this.classList.toggle('fa-spin')

    // toggle class open on main setting box
    document.querySelector('.setting-box').classList.toggle('open')
}

// switch colors

const colorList = document.querySelectorAll('.colors-list li')
 // loop on all span
colorList.forEach(li => {
    li.addEventListener('click', (e) =>{
        // set color on root

        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)

        // set color on localstorage
        localStorage.setItem('color-option', e.target.dataset.color);

        // remove active class from all childrens

        e.target.parentElement.querySelectorAll('.active').forEach(element => {
            element.classList.remove("active")
        });

        // add active class on self
        e.target.classList.add('active')

    })
})
 
// switch random background option

const randomBackEl = document.querySelectorAll('.random-background span')
 // loop on all span
 randomBackEl.forEach(span => {

    // click on every span
    span.addEventListener('click', (e) =>{

        // remove active class from all childrens

        e.target.parentElement.querySelectorAll('.active').forEach(element => {
            element.classList.remove("active")
        });

        // add active class on self
        e.target.classList.add('active')

        if(e.target.dataset.background === 'yes') {
            backgroundOption = true;

            randomizeImg()

            localStorage.setItem('background_option', true)


        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval)
            localStorage.setItem('background_option', false)
        }

    })
})

// select landing page element
let landingPage = document.querySelector('.landing-page');

// get array of image
let imgArray = ['img1.jfif', 'img2.jpg', 'img3.jpg', 'img4.jfif'];


// function to randomize option

function randomizeImg() {
    
if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
    
        // get random number
            let randomNumber = Math.floor(Math.random() * imgArray.length);
        
            // change background image url
        landingPage.style.backgroundImage = 'url("' + imgArray[randomNumber] + '")';
        
            console.log(randomNumber)
        
        }, 3000)
}

}

randomizeImg()

// select skills selector

let ourSkills = document.querySelector('.skills');

window.onscroll = function() {

    // skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    // skills Outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // window height
    let windowHeight = this.innerHeight;

    // window scrollTop 
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop < (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allkills = document.querySelectorAll('.skill-box .skill-progress span');

        allkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })
    }

}

// create popup with the image
let ourGallery = document.querySelectorAll('.gallery img');

ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        // create overlay element 
        let overlay = document.createElement('div')

        // add class to overlay
        overlay.className = 'popup-overlay';

        // append overlay to the body
        document.body.appendChild(overlay);

        // create the popup box
        let popupBox = document.createElement('div');

        // add class to the popup box
        popupBox.className = 'popup-box';

        if(img.alt !== null) {
            // create heading
            let imgHeading = document.createElement("h3");

            // creat text for heading
            let imgText = document.createTextNode(img.alt);

            // append the text to the heading
            imgHeading.appendChild(imgText);

            // append the heading to the popup box
            popupBox.appendChild(imgHeading)
        }

        // create the image
        let popupImage = document.createElement("img");

        // set image source
        popupImage.src = img.src

        // add image to popup box
        popupBox.appendChild(popupImage)

        // append the popup box to body
        document.body.appendChild(popupBox)


        // create the close span
        let closeButton = document.createElement('span');

        // create the close button text
        let closeButtonText = document.createTextNode('X');

        // Append text to close button
        closeButton.appendChild(closeButtonText);

        // add class to close button
        closeButton.className = 'close-button';

        // add close button to the popup box
        popupBox.appendChild(closeButton)
        
    })
})

// close the popup

document.addEventListener('click', function(e) {
    if(e.target.className == 'close-button') {
        e.target.parentNode.remove()

        // remove overlay

        document.querySelector('.popup-overlay').remove()
    }
})

// select all bullets

const allBullets =  document.querySelectorAll('.nav-bullets .bullets');

allBullets.forEach(bullet => {
    bullet.addEventListener('click', (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior : 'smooth'
        })
    })
})
/*
let bulletsSpan = document.querySelectorAll('.bullets-option span');

let bulletsContainer = document.querySelector('.nav-bullets');

let bulletLocalItem = localStorage.getItem('bullets_option')

if(bulletLocalItem !== null) {
    console.log('jhbjhdbj')
}

bulletsSpan.forEach(span => {
    span.addEventListener('click', (e) => {
        if(span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';

            localStorage.setItem('bullets_option', 'block')
        } else {
            bulletsContainer.style.display = 'none'

            localStorage.setItem('bullets_option', 'none')
        }
    })
})
*/

// toggle menu

let toggleMenu = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleMenu.onclick = function (e) {

    // Stop propagation
    e.stopPropagation();
    this.classList.toggle('menu-active');
    tLinks.classList.toggle('open');
}

document.addEventListener('click', (e) => {
    if(e.target !== toggleMenu && e.target !== tLinks) {
        // check if menu is open

        if(tLinks.classList.contains('open')) {
            toggleMenu.classList.toggle('menu-active');
            tLinks.classList.toggle('open');
        }
    }
})

// Stop propagation on menu
 
tLinks.onclick = function () {
    e.stopPropagation();
}