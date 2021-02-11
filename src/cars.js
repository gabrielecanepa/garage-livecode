// 1. Global variables
const API_BASE_URL = 'https://wagon-garage-api.herokuapp.com';
const GARAGE = '560-garage';

// 2. DOM elements selection
const carsList = document.querySelector('.cars-list');

// 3. API calls + DOM manipulation

// Bind the delete action to a car

const bindDeleteAction = (carId) => {
  // Select the car card and the delete button inside
  const carCard = document.querySelector(`#car${carId}`);
  const deleteButton = carCard.querySelector('button');

  // Add a listener on the button
  deleteButton.addEventListener('click', () => {
    // Use the confirm method -> https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
    if (confirm("Are you sure you want to remove this car?")) {
      // If confirmed, send a DELETE request to the endpoint https://wagon-garage-api.herokuapp.com/cars/:id
      fetch(`${API_BASE_URL}/cars/${carId}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(() => {
          // If the request was successful (the car was deleted in the db) remove also the car card from the DOM
          carCard.remove();
        });
    }
  });
};

// Fetch and list all the cars

const displayCarAndBindDelete = (car) => {
  const carElement = `
    <div class="car" id="car${car.id}">
      <div class="car-image">
        <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
      </div>
      <div class="car-info">
        <h4>${car.brand} ${car.model}</h4>
        <p><strong>Owner:</strong> ${car.owner}</p>
        <p><strong>Plate:</strong> ${car.plate}</p>
      </div>
      <div class="car-actions">
        <button class="btn btn-danger">Remove this car</button>
      </div>
    </div>
  `;
  carsList.insertAdjacentHTML('afterbegin', carElement);
  bindDeleteAction(car.id); // call the method and pass the car id
};

const fetchAndDisplayCars = () => {
  fetch(`${API_BASE_URL}/${GARAGE}/cars`)
    .then(response => response.json())
    .then((data) => {
      data.forEach(car => displayCarAndBindDelete(car));
    });
};

// Create and display a new car

const getCarAttributes = (form) => {
  return {
    brand: form.querySelector('#brand').value,
    model: form.querySelector('#model').value,
    plate: form.querySelector('#plate').value,
    owner: form.querySelector('#owner').value
  };
};

const createAndDisplayNewCar = (attributes) => {
  fetch(`${API_BASE_URL}/${GARAGE}/cars`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(attributes)
  })
    .then(response => response.json())
    .then((data) => {
      displayCarAndBindDelete(data);
    });
};

// 4. Exports
export { fetchAndDisplayCars, getCarAttributes, createAndDisplayNewCar };
