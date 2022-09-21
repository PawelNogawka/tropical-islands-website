const navBtn = document.querySelector(".nav__btn");
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav__link");


navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav").classList.remove("active");
  });
});


navBtn.addEventListener("click", function () {
  document.querySelector(".nav").classList.toggle("active");

});

window.addEventListener("scroll", function () {
  let top = window.scrollY;

  if (top > 0) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

//counter
const tiles = document.querySelectorAll(".about__tile");
const counter = document.querySelector(".about__counter");

let count = true;

window.addEventListener("scroll", startCount);

function startCount(e) {
  if (window.scrollY >= counter.offsetTop - 300) {
    console.log("ok");
    if (count) {
      tiles.forEach((tile) => {
        function upddateCounter() {
          let heading = tile.querySelector(".about__ammount");
          let target = parseInt(heading.getAttribute("data-target"));
          let initialTxt = +heading.innerText;
          let increment = target / 200;
          if (initialTxt < target) {
            heading.innerText = `${Math.ceil(initialTxt + increment)}`;
            setTimeout(upddateCounter, 20);
          } else {
            heading.innerText = target;
          }
        }

        upddateCounter();
      });
    }
    count = false;
  }
}

///tooltip
const shortcut = document.querySelector(".header__logo");
const popup = document.createElement("div");

shortcut.addEventListener("mouseover", function (e) {
  const name = shortcut.getAttribute("data-content");
  popup.classList.add("tooltip");
  popup.innerText = name;
  popup.style.top = e.clientY + "px";
  popup.style.left = e.clientX + "px";
  document.querySelector("body").appendChild(popup);
  setTimeout(function () {
    popup.remove();
  }, 3000);
});

shortcut.addEventListener("mouseout", function () {
  popup.parentElement.removeChild(popup);
});

//home slider
const slides = document.querySelectorAll(".home__slide");
const btns = document.querySelectorAll(".home__arrow");
let current = 0;

let interval;

function playSlider() {
  interval = setInterval(function () {
    current++;
    changeSlide();
  }, 7000);
}

function changeSlide() {
  checkCurrent();
  slides.forEach((slide, index) => {
    if (index === current) {
      slide.style.cssText = "visibility:visible; opacity:1";
    } else {
      slide.style.cssText = "visibility:hidden; opacity:0";
    }
  });
}

function handleArrows(e) {
  clearInterval(interval);
  playSlider();
  if (e.target.classList.contains("home__arrow--left")) {
    current--;
  } else {
    current++;
  }

  checkCurrent();

  changeSlide();
}

function checkCurrent() {
  if (current === -1) {
    current = slides.length;
  } else if (current === slides.length) {
    current = 0;
  }
}

btns.forEach((btn) => {
  btn.addEventListener("click", handleArrows);
});

window.onload = playSlider();

// search input

const loopBtn = document.querySelector(".home__search-btn");

loopBtn.addEventListener("click", function () {
  const input = document.querySelector(".home__input");

  input.classList.toggle("active");
  input.focus();
});

/// about slider:)

const slider = document.querySelector(".about__imgs-box");

const sliderBtns = document.querySelectorAll(".about__btn");

let slideInterval;
let index = 0;

sliderBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (this.classList.contains("about__btn--prev")) {
      index--;
    } else {
      index++;
    }
    changeImg();
    resetInterval();
  });
});

function resetInterval() {
  clearInterval(slideInterval);
  playSlideShow();
}

function playSlideShow() {
  slideInterval = setInterval(function () {
    index++;
    changeImg();
  }, 2000);
}

function changeImg() {
  const imgs = document.querySelectorAll(".about__img");
  if (index === imgs.length) {
    index = 0;
  } else if (index === -1) {
    index = imgs.length - 1;
  }
  const width = slider.getBoundingClientRect().width;
  slider.style.transform = `translateX(${-index * width}px) `;
}

window.onload = playSlideShow();

//// gallery

const galleryImgs = document.querySelectorAll(".gallery__image");
function initGallery() {
  galleryImgs.forEach((img) => {
    img.addEventListener("click", function (e) {
      removeActieClasses();
      e.target.classList.add("active");
    });
  });
}

function removeActieClasses() {
  galleryImgs.forEach((img) => {
    img.classList.remove("active");
  });
}

window.onload = initGallery();

/// countdown

let countDownDate = new Date("Oct 16, 2023 00:00:00").getTime();

let dataInterval = setInterval(function () {
  let now = new Date().getTime();
  let diff = countDownDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerHTML = days;
  document.querySelector("#hours").innerHTML = hours;
  document.querySelector("#minutes").innerHTML = minutes;
  document.querySelector("#seconds").innerHTML = seconds;
}, 1000);
