const url = "https://wagon-garage-api.herokuapp.com/lewagon/cars";

// Form with information about the car I want to insert.
const form = document.querySelector(".car-form");
// List used to display the cars.
const list = document.querySelector(".cars-list");

// Use a function if some code is repeated in different parts of your code.
// In this case, this code will run when the page loads and after a car is inserted with a POST request.
const getCars = () => {
  list.innerHTML = "";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach(car => {
        const card = `
          <div class="car">
            <div class="car-image">
              <img src="http://loremflickr.com/280/280/${car.brand}" />
            </div>
            <div class="car-info">
              <h4>${car.brand} ${car.model}</h4>
              <p><strong>Owner:</strong> ${car.owner}</p>
              <p><strong>Plate:</strong> ${car.plate}</p>
            </div>
          </div>
        `;
        list.insertAdjacentHTML("beforeend", card);
      });
    });
}

// Call the function to run the code when the page loads.
getCars()

// Add a submit event that:
// 1. Gets the content of the inputs
// 2. Sends a POST request to with this content
// 3. Sends a GET request to retrieve the cars again (including the one just inserted)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const T = [];

  const inputs = document.querySelectorAll(".form-control");

  inputs.forEach(element => {
    T.push(element.value);
  });

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      brand: T[0],
      model: T[1],
      plate: T[2],
      owner: T[3],
    })
  }).then(res => res.json())
    .then((data) => {
      // Get the cars again to display the one just created!
      getCars();
    });
});
