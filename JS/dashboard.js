// Array of external sports image URLs
const sportsImages = [
    "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520975695911-1a0a0a0a0a0a?auto=format&fit=crop&w=800&q=80"
];

const slider = document.querySelector('.slider');
let currentIndex = 0;
let slideInterval;

// Initialize slider by adding images
function initSlider() {
    sportsImages.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Sports Image";
        slider.appendChild(img);
    });
    updateSliderPosition();
    startAutoSlide();
}

// Update slider position based on currentIndex
function updateSliderPosition() {
    const offset = -currentIndex * 800; // image width
    slider.style.transform = `translateX(${offset}px)`;
}

// Show next image
function nextSlide() {
    currentIndex = (currentIndex + 1) % sportsImages.length;
    updateSliderPosition();
}

// Show previous image
function prevSlide() {
    currentIndex = (currentIndex - 1 + sportsImages.length) % sportsImages.length;
    updateSliderPosition();
}

// Start automatic sliding every 4 seconds
function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000);
}

// Stop automatic sliding
function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Add event listeners to buttons
document.querySelector('.next').addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

// Initialize slider on DOM content loaded
document.addEventListener('DOMContentLoaded', initSlider);

// Navbar resize on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-small');
    } else {
        navbar.classList.remove('navbar-small');
    }
});

// Navbar toggle for gallery page
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('navbar-toggle');
    const links = document.getElementById('navbar-links');

    if (toggle && links) {
        toggle.addEventListener('click', function () {
            links.classList.toggle('active');
        });
    }
});
