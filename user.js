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

const profileTrigger = document.querySelector('.profile-trigger');
const accountMenu = document.getElementById('account-menu');

profileTrigger.addEventListener('click', () => {
    const isOpen = profileTrigger.getAttribute('aria-expanded') === 'true';
    profileTrigger.setAttribute('aria-expanded', String(!isOpen));
    accountMenu.hidden = isOpen;
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.profile-menu')) {
        profileTrigger.setAttribute('aria-expanded', 'false');
        accountMenu.hidden = true;
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        profileTrigger.setAttribute('aria-expanded', 'false');
        accountMenu.hidden = true;
        profileTrigger.focus();
    }
});

const propertyTrack = document.querySelector('.property-carousel-track');
const previousHomesButton = document.querySelector('.carousel-arrow-left');
const nextHomesButton = document.querySelector('.carousel-arrow-right');

if (propertyTrack && previousHomesButton && nextHomesButton) {
    let carouselPosition = 0;

    const getVisibleCards = () => window.matchMedia('(max-width: 560px)').matches ? 1 : 3;
    const getMaximumPosition = () => Math.ceil(propertyTrack.children.length / getVisibleCards()) - 1;

    const updateCarousel = () => {
        const card = propertyTrack.querySelector('.property-card');
        const gap = Number.parseFloat(getComputedStyle(propertyTrack).gap) || 0;
        const step = card.offsetWidth + gap;
        propertyTrack.style.transform = `translateX(${-carouselPosition * step * getVisibleCards()}px)`;
        previousHomesButton.disabled = carouselPosition === 0;
        nextHomesButton.disabled = carouselPosition === getMaximumPosition();
    };

    previousHomesButton.addEventListener('click', () => {
        carouselPosition = Math.max(0, carouselPosition - 1);
        updateCarousel();
    });

    nextHomesButton.addEventListener('click', () => {
        carouselPosition = Math.min(getMaximumPosition(), carouselPosition + 1);
        updateCarousel();
    });

    window.addEventListener('resize', () => {
        carouselPosition = Math.min(carouselPosition, getMaximumPosition());
        updateCarousel();
    });

    updateCarousel();
}

const savedPropertiesKey = 'savedProperties';
const savedPropertyIds = new Set(JSON.parse(localStorage.getItem(savedPropertiesKey) || '[]').map((property) => property.id));

document.querySelectorAll('.property-card').forEach((card) => {
    const saveButton = card.querySelector('.save-property');

    if (savedPropertyIds.has(card.dataset.propertyId)) {
        saveButton.classList.add('is-saved');
        saveButton.querySelector('span').textContent = '♥';
        saveButton.setAttribute('aria-label', `Unsave ${card.querySelector('.property-details h3').textContent}`);
    }

    saveButton.addEventListener('click', () => {
        const savedProperties = JSON.parse(localStorage.getItem(savedPropertiesKey) || '[]');

        if (saveButton.classList.contains('is-saved')) {
            const updatedSavedProperties = savedProperties.filter((property) => property.id !== card.dataset.propertyId);
            localStorage.setItem(savedPropertiesKey, JSON.stringify(updatedSavedProperties));
            savedPropertyIds.delete(card.dataset.propertyId);
            saveButton.classList.remove('is-saved');
            saveButton.querySelector('span').textContent = '♡';
            saveButton.setAttribute('aria-label', `Save ${card.querySelector('.property-details h3').textContent}`);
            return;
        }

        const property = {
            id: card.dataset.propertyId,
            image: card.querySelector('img').getAttribute('src'),
            imageAlt: card.querySelector('img').getAttribute('alt'),
            type: card.querySelector('.property-details h4').textContent,
            name: card.querySelector('.property-details h3').textContent,
            priceLabel: card.querySelector('.property-details h4:last-of-type').textContent,
            price: card.querySelector('.property-details h3:last-of-type').textContent
        };

        if (!savedProperties.some((savedProperty) => savedProperty.id === property.id)) {
            savedProperties.push(property);
            localStorage.setItem(savedPropertiesKey, JSON.stringify(savedProperties));
        }

        savedPropertyIds.add(property.id);
        saveButton.classList.add('is-saved');
        saveButton.querySelector('span').textContent = '♥';
        saveButton.setAttribute('aria-label', `Unsave ${property.name}`);
    });
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
