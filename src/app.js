// 1. Imports
import { fetchAndDisplayCars, getCarAttributes, createAndDisplayNewCar } from './cars';

// 2. AJAX calls

fetchAndDisplayCars();

// 3. Events bindings

const form = document.getElementById('new-car');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const carAttributes = getCarAttributes(event.currentTarget);
  createAndDisplayNewCar(carAttributes);
});
