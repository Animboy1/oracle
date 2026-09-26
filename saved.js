const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
const savedPropertiesContainer = document.querySelector('.saved-properties');
const emptySavedMessage = document.getElementById('saved-empty-message');

if (savedProperties.length) {
    emptySavedMessage.hidden = true;

    savedProperties.forEach((property) => {
        const card = document.createElement('article');
        card.className = 'saved-property-card';

        const image = document.createElement('img');
        image.src = property.image;
        image.alt = property.imageAlt;

        const details = document.createElement('div');
        details.className = 'saved-property-details';

        const type = document.createElement('h4');
        type.textContent = property.type;
        const name = document.createElement('h3');
        name.textContent = property.name;
        const priceLabel = document.createElement('h4');
        priceLabel.textContent = property.priceLabel;
        const price = document.createElement('h3');
        price.textContent = property.price;

        const unsaveButton = document.createElement('button');
        unsaveButton.className = 'saved-love-button';
        unsaveButton.type = 'button';
        unsaveButton.innerHTML = '<span aria-hidden="true">♥</span>';
        unsaveButton.setAttribute('aria-label', `Remove ${property.name} from saved homes`);
        unsaveButton.addEventListener('click', () => {
            const updatedSavedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]')
                .filter((savedProperty) => savedProperty.id !== property.id);
            localStorage.setItem('savedProperties', JSON.stringify(updatedSavedProperties));
            card.remove();

            if (!updatedSavedProperties.length) {
                emptySavedMessage.hidden = false;
            }
        });

        details.append(type, name, priceLabel, price);
        card.append(unsaveButton);
        card.append(image, details);
        savedPropertiesContainer.append(card);
    });
}
