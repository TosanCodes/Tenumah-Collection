// js/main.js
import { cars } from './cars.js';

// DOM Elements
const inventoryGrid = document.getElementById('inventoryGrid');
const yearSelect = document.getElementById('yearSelect');
const makeSelect = document.getElementById('makeSelect');
const modelSelect = document.getElementById('modelSelect');
const searchResults = document.getElementById('searchResults');
const searchForm = document.getElementById('searchForm');

// Generate image filename from model and year
function getImageFilename(car) {
  const cleanModel = car.model.replace(/\s+/g, '');
  return `images/cars/${cleanModel}${car.year}.jpg`;
}

// Display cars
function displayCars(container, carList) {
  container.innerHTML = '';
  carList.forEach((car, index) => {
    const imgSrc = getImageFilename(car);
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <img src="${imgSrc}" alt="${car.make} ${car.model}" />
      <h3><a href="vehicle.html?id=${index}">${car.year} ${car.make} ${car.model}</a></h3>
      <p class="price">$${car.price.toLocaleString()}</p>
    `;
    container.appendChild(card);
  });
}

// Populate dropdowns
function populateDropdowns() {
  const years = [...new Set(cars.map(car => car.year))].sort((a, b) => b - a);
  const makes = [...new Set(cars.map(car => car.make))].sort();
  const models = [...new Set(cars.map(car => car.model))].sort();

  years.forEach(year => yearSelect.innerHTML += `<option value="${year}">${year}</option>`);
  makes.forEach(make => makeSelect.innerHTML += `<option value="${make}">${make}</option>`);
  models.forEach(model => modelSelect.innerHTML += `<option value="${model}">${model}</option>`);
}

// Search filter
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const year = yearSelect.value;
  const make = makeSelect.value;
  const model = modelSelect.value;

  const filtered = cars.filter(car =>
    (!year || car.year === year) &&
    (!make || car.make === make) &&
    (!model || car.model === model)
  );

  displayCars(searchResults, filtered);
});

// Init
populateDropdowns();
displayCars(inventoryGrid, cars);
