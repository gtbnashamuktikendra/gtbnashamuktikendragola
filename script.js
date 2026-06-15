// DATE & TIME - FULL DETAILED FORMAT IN CENTER
function updateDateTime(){
    const el = document.getElementById('datetime');
    if(!el) return;

    const d = new Date();
    el.textContent = d.toLocaleString('en-IN', {
        weekday: 'long',   // Jaise: Wednesday
        day: '2-digit',    // Jaise: 10
        month: 'long',     // Jaise: June
        year: 'numeric',   // Jaise: 2026
        hour: '2-digit',   // Jaise: 03
        minute: '2-digit', // Jaise: 31
        second: '2-digit', // Jaise: 44
        hour12: true       // AM/PM Format
    });
}
setInterval(updateDateTime, 1000);
updateDateTime();

// MOBILE NAVIGATION TOGGLE
const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

if(btn && nav){
    btn.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    document.querySelectorAll('.nav a').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('show');
        });
    });

    window.addEventListener('resize', () => {
        if(window.innerWidth > 1180){
            nav.classList.remove('show');
        }
    });
}

// ACTIVE NAVIGATION LINK HIGHLIGHT
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach((a) => {
    if(a.getAttribute('href') === page){
        a.classList.add('active');
    }
});

// HERO AUTOMATIC SLIDESHOW
const slides = document.querySelectorAll('.hero-slideshow .slide');
let currentSlide = 0;

function showSlide(index){
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });
    if(slides[index]){
        slides[index].classList.add('active');
    }
}

if(slides.length > 0){
    setInterval(() => {
        currentSlide++;
        if(currentSlide >= slides.length){
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }, 3000);
}

// DYNAMIC INTERACTIVE GALLERY LOOP
const galleryData = {
    activities: [
        { image: "assets/images/activites/finalactivity1.jpg", title: "Nasha Mukti Kendra, Gola" },
        { image: "assets/images/activites/finalactivity2.jpg", title: "Nasha Mukti Kendra, Gola" },
        { image: "assets/images/activites/finalactivity5.jpg", title: "Nasha Mukti Kendra, Gola" },
        { image: "assets/images/activites/finalactivity6.jpg", title: "Nasha Mukti Kendra, Gola" }
    ],
    center: [
        { image: "assets/images/center/finalcenter3.jpg", title: "Nasha Mukti Kendra, Gola" },
        { image: "assets/images/center/finalcenter4.jpg", title: "Nasha Mukti Kendra, Gola" },
        { image: "assets/images/center/finalcenter5.jpg", title: "Nasha Mukti Kendra, Gola" },
        { image: "assets/images/center/finalcenter6.jpg", title: "Nasha Mukti Kendra, Gola" }
    ],
};

const galleryGrid = document.getElementById("galleryGrid");

if(galleryGrid){
    galleryGrid.innerHTML = "";

    Object.values(galleryData).flat().forEach((item) => {
        galleryGrid.innerHTML += `
            <div class="photo photo-gallery">
                <img src="${item.image}" alt="${item.title}" draggable="false" oncontextmenu="return false;">
                <div class="gallery-title">${item.title}</div>
            </div>
        `;
    });
}

// TYPING EFFECT - GURU TEG BAHADUR SOCIETY INTERACTION
const typingText = document.getElementById("typing-text");
if(typingText){
    const words = [
        "New Paths, New Possibilities",
        "नई राहें, नई संभावनाएँ"
    ];

    let wordIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function typingEffect(){
        const currentWord = words[wordIndex];
        typingText.textContent = currentWord.substring(0, letterIndex);

        if(!deleting){
            letterIndex++;
            if(letterIndex > currentWord.length){
                deleting = true;
                setTimeout(typingEffect, 1800);
                return;
            }
        } else {
            letterIndex--;
            if(letterIndex < 0){
                deleting = false;
                wordIndex++;
                if(wordIndex >= words.length){
                    wordIndex = 0;
                }
            }
        }
        setTimeout(typingEffect, deleting ? 40 : 90);
    }
    typingEffect();
}

// LOGO POPUP LOGIC
function openLogoPopup(){
    const popup = document.getElementById("logoPopup");
    if(popup) popup.style.display = "flex";
}
function closeLogoPopup(){
    const popup = document.getElementById("logoPopup");
    if(popup) popup.style.display = "none";
}

// COMPREHENSIVE SECURITY LAYER
(function(){
    'use strict';
    const blockedKeys = new Set(['u','s','p','a','c','x','i','j']);
    const allowTypingArea = function(target){
        if(!target) return false;
        const tag = (target.tagName || '').toLowerCase();
        return tag === 'input' || tag === 'textarea' || target.isContentEditable === true;
    };

    document.addEventListener('contextmenu', e => e.preventDefault(), true);
    document.addEventListener('selectstart', e => { if(!allowTypingArea(e.target)) e.preventDefault(); }, true);
    document.addEventListener('dragstart', e => { if(e.target.tagName === 'IMG') e.preventDefault(); }, true);

    document.addEventListener('keydown', e => {
        const key = (e.key || '').toLowerCase();
        const isCtrlCombo = e.ctrlKey || e.metaKey;
        if(key === 'f12' || (isCtrlCombo && blockedKeys.has(key))){
            if(!allowTypingArea(e.target)){
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }, true);
})();

// HEADER SCROLL MANAGEMENT
(function(){
    'use strict';
    const topbar = document.querySelector('.topbar');
    if(!topbar) return;

    let lastScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if(!ticking){
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
                if(currentScroll <= 20 || currentScroll < lastScroll){
                    topbar.classList.remove('topbar-hide');
                } else if(currentScroll > lastScroll && currentScroll > topbar.offsetHeight){
                    topbar.classList.add('topbar-hide');
                }
                lastScroll = Math.max(currentScroll, 0);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();