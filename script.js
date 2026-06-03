const API_KEY = "LBX1wKWqpXvrZQLXA6xbDaZ376NBhcDZmPAAgBeKyFNF5FtYlpYRBeXw";

const gallery =
document.getElementById("galleryContainer");

const searchInput =
document.getElementById("searchInput");

let page = 1;
let loadingImages = false;

// Loader

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader =
        document.getElementById("loader");

        if(loader){
            loader.style.display = "none";
        }

    }, 1000);

});

// Intersection Observer

const observer =
new IntersectionObserver(

(entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},

{
    threshold:0.1
}

);

// دریافت تصاویر از Pexels

async function loadImages(){

    if(loadingImages) return;

    loadingImages = true;

    try{

        const response =
        await fetch(

        `https://api.pexels.com/v1/search?query=persian history&per_page=20&page=${page}`,

        {
            headers:{
                Authorization:API_KEY
            }
        }

        );

        const data =
        await response.json();

        if(data.photos){

            data.photos.forEach(photo=>{

                const card =
                document.createElement("div");

                card.className =
                "gallery-item fade";

                card.innerHTML = `

                    <img
                    src="${photo.src.large}"
                    alt="${photo.alt || 'Persian Image'}"
                    loading="lazy">

                    <div class="gallery-caption">

                        <h4>
                        ${photo.alt || "Persian Image"}
                        </h4>

                    </div>

                `;

                gallery.appendChild(card);

                observer.observe(card);

            });

            page++;

        }

    }catch(error){

        console.error(
        "Pexels Error:",
        error
        );

    }

    loadingImages = false;

}

// بارگذاری اولیه

loadImages();

// Infinite Scroll

window.addEventListener("scroll",()=>{

    if(

        window.innerHeight +
        window.scrollY

        >=

        document.body.offsetHeight - 1200

    ){

        loadImages();

    }

});

// Search

searchInput.addEventListener("keyup",()=>{

    const value =
    searchInput.value
    .toLowerCase()
    .trim();

    const cards =
    document.querySelectorAll(
    ".gallery-item"
    );

    cards.forEach(card=>{

        const text =
        card.innerText
        .toLowerCase();

        if(text.includes(value)){

            card.style.display =
            "block";

        }else{

            card.style.display =
            "none";

        }

    });

});

// Scroll Top

const scrollBtn =
document.getElementById(
"scrollTop"
);

window.addEventListener(
"scroll",
()=>{

    if(window.scrollY > 500){

        scrollBtn.style.display =
        "block";

    }else{

        scrollBtn.style.display =
        "none";

    }

});

scrollBtn.addEventListener(
"click",
()=>{

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

});

// Theme

const themeBtn =
document.getElementById(
"themeBtn"
);

themeBtn.addEventListener(
"click",
()=>{

    document.body.classList.toggle(
    "light-mode"
    );

    if(
    document.body.classList.contains(
    "light-mode"
    )
    ){

        themeBtn.innerHTML =
        "☀️";

    }else{

        themeBtn.innerHTML =
        "🌙";

    }

});

// Mobile Menu

const menuBtn =
document.getElementById(
"menuBtn"
);

const navMenu =
document.getElementById(
"navMenu"
);

menuBtn.addEventListener(
"click",
()=>{

    navMenu.classList.toggle(
    "active"
    );

});

// Animation Sections

document
.querySelectorAll(
".content-section"
)
.forEach(el=>{

    el.classList.add("fade");

    observer.observe(el);

});

console.log(
"🦁 Pexels Gallery Loaded"
);
