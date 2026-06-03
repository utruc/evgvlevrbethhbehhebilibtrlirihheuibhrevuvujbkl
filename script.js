// Loader

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").style.display = "none";

    }, 1200);

});

// Gallery

const gallery = document.getElementById("galleryContainer");

const loading = document.getElementById("loadingMore");

const searchInput = document.getElementById("searchInput");

let imageCounter = 1;

let allCards = [];

// ساخت تصویر تصادفی

function createImageCard() {

    const card = document.createElement("div");

    card.className = "gallery-item fade";

    const width = 600;
    const height = 800;

    const imageUrl =
        `https://source.unsplash.com/random/${width}x${height}?sig=${Date.now()}${Math.random()}`;

    card.innerHTML = `
        <img
            loading="lazy"
            src="${imageUrl}"
            alt="تصویر"
        >
        <div class="gallery-caption">
            <h4>تصویر جدید</h4>
        </div>
    `;

    gallery.appendChild(card);

    allCards.push(card);

    observer.observe(card);
}

// بارگذاری دسته‌ای

function loadImages(count = 20) {

    for (let i = 0; i < count; i++) {

        createImageCard();

    }

}

// بارگذاری اولیه

loadImages(40);

// Infinite Scroll

window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const viewport =
        window.innerHeight;

    const height =
        document.body.offsetHeight;

    if (
        scrollTop + viewport >
        height - 1200
    ) {

        loadImages(20);

    }

});

// Search

searchInput.addEventListener("keyup", () => {

    const value =
        searchInput.value
        .toLowerCase()
        .trim();

    allCards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        if (text.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

// Scroll Top

const scrollBtn =
    document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollBtn.style.display = "block";

    } else {

        scrollBtn.style.display = "none";

    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});

// Theme

const themeBtn =
    document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle(
        "light-mode"
    );

    if (
        document.body.classList.contains(
            "light-mode"
        )
    ) {

        themeBtn.innerHTML = "☀️";

    } else {

        themeBtn.innerHTML = "🌙";

    }

});

// Mobile Menu

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});

// Scroll Animation

const observer =
new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "show"
                );

            }

        });

    },

    {
        threshold: 0.1
    }

);

// افکت روی سکشن‌ها

document
.querySelectorAll(
".content-section"
)
.forEach(el => {

    el.classList.add("fade");

    observer.observe(el);

});

// بارگذاری بیشتر در فواصل زمانی

setInterval(() => {

    if (allCards.length < 1000) {

        loadImages(5);

    }

}, 15000);

// تغییر تصویر هدر هنگام رفرش

const heroImages = [

"https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000",

"https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000",

"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000",

"https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=2000",

"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2000"

];

const randomHero =

heroImages[
Math.floor(
Math.random() *
heroImages.length
)
];

document.getElementById(
"hero"
).style.backgroundImage =
`url('${randomHero}')`;

// کنسول خوش‌آمدگویی 😎

console.log(
"🦁 سایت شیر و خورشید آماده است."
);
