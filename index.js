function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}








let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove("active"));
    
    // Handle wrap-around
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Add active class to current slide
    slides[currentSlide].classList.add("active");
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Auto-play the carousel every 3 seconds
setInterval(() => {
    changeSlide(1);
}, 3000);