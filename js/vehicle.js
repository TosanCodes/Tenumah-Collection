// js/vehicle.js
import { cars } from './cars.js';

const container = document.getElementById('vehicleContainer');
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'), 10);
const car = cars[id];

// Generate image filename from model and year
function getImageFilename(car) {
  const cleanModel = car.model.replace(/\s+/g, '');
  return `images/cars/${cleanModel}${car.year}.jpg`;
}

if (!car) {
  container.innerHTML = "<p>Vehicle not found.</p>";
} else {
  const imgSrc = getImageFilename(car);
  container.innerHTML = `
    <div class="car-detail-card">
      <img src="${imgSrc}" alt="${car.make} ${car.model}" />
      <h1>${car.year} ${car.make} ${car.model}</h1>
      <p class="price">Price: $${car.price.toLocaleString()}</p>
    </div>
  `;
}
