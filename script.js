const carouselInner = document.querySelector('.carousel-inner');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const dotsContainer = document.querySelector('.carousel-dots');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const slideWidth = slides[0].offsetWidth;
let currentPosition = 0;
let currentSlide = 0;



// Create dots based on the number of slides
slides.forEach((slide, index) => {
  const dot = document.createElement('span');
  dot.classList.add('carousel-dot');
  if (index === currentSlide) {
    dot.classList.add('active');
  }
  dot.addEventListener('click', () => {
    goToSlide(index);
  });
  dotsContainer.appendChild(dot);
});

// Initial call to updateCarousel()
updateCarousel();

function goToSlide(index) {
  currentSlide = index;
  currentPosition = -index * slideWidth;
  updateCarousel();
}

function carouselNext() {
  activeIndex++;
  if (activeIndex >= totalSlides) {
    activeIndex = 0;
  }
  updateCarousel();
}

function carouselPrev() {
  activeIndex--;
  if (activeIndex < 0) {
    activeIndex = totalSlides - 1;
  }
  updateCarousel();
}

function slideNext() {
  currentSlide = (currentSlide + 1) % slides.length;
  currentPosition -= slideWidth;

  if (currentSlide === 0) {
    // Move to the first slide instantly without transition
    setTimeout(() => {
      carouselInner.style.transition = 'all 0.3s';
      currentPosition = 0;
      updateCarousel();
      setTimeout(() => {
        // Re-enable transition after the position has been updated
        carouselInner.style.transition = '';
      }, 300);
    }, 500); // Adjust the timeout duration to match the transition duration in CSS
  } else {
    updateCarousel();
  }
}

function slidePrev() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  currentPosition += slideWidth;

  if (currentSlide === slides.length - 1) {
    // Move to the last slide instantly without transition
    setTimeout(() => {
      carouselInner.style.transition = 'all 0.3s';
      currentPosition = -currentSlide * slideWidth;
      updateCarousel();
      setTimeout(() => {
        // Re-enable transition after the position has been updated
        carouselInner.style.transition = '';
      }, 300);
    }, 500); // Adjust the timeout duration to match the transition duration in CSS
  } else {
    updateCarousel();
  }
}

function centerActiveSlide() {
  const offset = (carousel.offsetWidth - slideWidth) / 2;
  carouselInner.style.transform = `translateX(${offset - currentSlide * slideWidth}px)`;
}

function updateCarousel() {
  carouselInner.style.transform = `translateX(${currentPosition}px)`;

  // Update active slide and dot
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });
  const dots = Array.from(dotsContainer.children);
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

let autoplayInterval;

function startAutoplay() {
  autoplayInterval = setInterval(slideNext, 4000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

carouselInner.addEventListener('touchstart', handleTouchStart);
carouselInner.addEventListener('touchmove', handleTouchMove);
carouselInner.addEventListener('touchend', handleTouchEnd);
prevButton.addEventListener('click', slidePrev);
nextButton.addEventListener('click', slideNext);
carouselInner.addEventListener('mouseenter', stopAutoplay);
carouselInner.addEventListener('mouseleave', startAutoplay);

let xDown = null;
let yDown = null;

function handleTouchStart(event) {
  xDown = event.touches[0].clientX;
  yDown = event.touches[0].clientY;
}

function handleTouchMove(event) {
  if (!xDown || !yDown) {
    return;
  }

  const xUp = event.touches[0].clientX;
  const yUp = event.touches[0].clientY;

  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      slideNext();
    } else {
      slidePrev();
    }
  }

  xDown = null;
  yDown = null;
}

function handleTouchEnd() {
  xDown = null;
  yDown = null;
}

startAutoplay();

// Smooth scroll function
function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  var targetPosition = targetElement.offsetTop;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var scrollY = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, scrollY);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Easing function
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Attach smooth scroll behavior to navigation links
document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var target = this.getAttribute("href");
      smoothScroll(target, 1000); // Adjust the duration as per your preference
    });
  });
});

function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  var targetPosition = targetElement.offsetTop;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var scrollY = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, scrollY);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Easing function
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Attach smooth scroll behavior to navigation links
document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".wrapper ul li a");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var target = this.getAttribute("href");
      smoothScroll(target, 1000); // Adjust the duration as per your preference

      // Close the burger menu after clicking a link
      var checkbox = document.getElementById("active");
      checkbox.checked = false;
    });
  });
});

// Add an event listener to the burger menu checkbox
document.getElementById('active').addEventListener('change', function () {
  var wrapper = document.querySelector('.wrapper');
  if (this.checked) {
    wrapper.classList.add('active');
  } else {
    wrapper.classList.remove('active');
  }
});


// transition when onscreen
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
      (bottom > 0 && bottom < innerHeight)) &&
    ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= (innerHeight + innerHeight * 0.5) && right <= innerWidth;
};



const animatedRight = document.querySelectorAll(".slide-right");
const animatedLeft = document.querySelectorAll(".slide-left");

// console.log(animatedLeft);
// console.log(animatedRight);

animatedLeft.forEach(element => {
  if (elementIsVisibleInViewport(element) === true) {
    console.dir(element);
    element.style.animation = "slideLeft 1s ease-in-out forwards"
  }
});
animatedRight.forEach(element => {
  if (elementIsVisibleInViewport(element) === true) {
    console.dir(element);
    element.style.animation = "slideRight 1s ease-in-out forwards"
  }
});

document.addEventListener("scroll", (event) => {
  animatedLeft.forEach(element => {
    if (elementIsVisibleInViewport(element) === true) {
      console.dir(element);
      element.style.animation = "slideLeft 1s ease-in-out forwards"
    }
  });
  animatedRight.forEach(element => {
    if (elementIsVisibleInViewport(element) === true) {
      console.dir(element);
      element.style.animation = "slideRight 1s ease-in-out forwards"
    }
  });

});

// stop scrolling

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

const burger = document.querySelector(".menu-btn")
let scrollToggle = 1
burger.addEventListener("click", () => {
  // console.log("aAAAAAAAAAAAA");
  if (scrollToggle == 1) {
    disableScroll();
    scrollToggle = 0;
  }
  else{
    enableScroll();
    scrollToggle = 1;
  }
})