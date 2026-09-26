const counters = { people: 1, rooms: 1 };

document.querySelectorAll('.counter-button').forEach((button) => {
    button.addEventListener('click', () => {
        const counter = button.dataset.counter;
        const change = Number(button.dataset.change);
        counters[counter] = Math.max(1, counters[counter] + change);

        document.getElementById(`${counter}-count`).textContent = counters[counter];
        document.querySelector(`input[name="${counter}"]`).value = counters[counter];
    });
});

const checkIn = document.getElementById('check-in');
const checkOut = document.getElementById('check-out');

checkIn.addEventListener('change', () => {
    checkOut.min = checkIn.value;
    if (checkOut.value && checkOut.value < checkIn.value) {
        checkOut.value = checkIn.value;
    }
});

const carouselSlides = document.querySelectorAll('.carousel-slide');
let activeSlide = 0;

if (carouselSlides.length > 1) {
    window.setInterval(() => {
        carouselSlides[activeSlide].classList.remove('is-active');
        activeSlide = (activeSlide + 1) % carouselSlides.length;
        carouselSlides[activeSlide].classList.add('is-active');
    }, 4000);
}

document.querySelectorAll(".footer-column a").forEach((link) => {
  link.addEventListener("click", (e) => {
    console.log(`Clicked: ${link.textContent}`);
  });
});
