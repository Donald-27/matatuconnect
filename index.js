document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        
menuToggle.addEventListener("click", () => {
 navMenu.classList.toggle("active");
 menuToggle.innerHTML = navMenu.classList.contains("active") ? "&times;" : "&#9776;"; // Toggle ☰ and ✖
        });

        // Close menu when clicking any nav link
 document.querySelectorAll("#nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
        navMenu.classList.remove("active");
                menuToggle.innerHTML = "&#9776;";
            });
        });
        window.addEventListener("resize", () => {
            if (window.innerWidth > 800) {
     navMenu.classList.remove("active");
                menuToggle.innerHTML = "&#9776;";
            }
        });
        document.addEventListener("click", (event) => {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove("active");
                menuToggle.innerHTML = "&#9776;";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.querySelector(".about-section");
    function revealAboutSection() {
        const sectionPos = aboutSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;
        if (sectionPos < screenPos) {
            aboutSection.classList.add("visible");
        }
    }
    window.addEventListener("scroll", revealAboutSection);
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("vehicleRegistrationForm");
 form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data

const ownerName = document.getElementById("ownerName").value;
const contactNumber = document.getElementById("contactNumber").value;
const email = document.getElementById("email").value;
const vehicleType = document.getElementById("vehicleType").value;
const vehicleNumber = document.getElementById("vehicleNumber").value;
const seatingCapacity = document.getElementById("seatingCapacity").value;
const vehicleImage = document.getElementById("vehicleImage").files[0]; // Get uploaded file

// Validate form fields
 if (!ownerName || !contactNumber || !email || !vehicleType || !vehicleNumber || !seatingCapacity || !vehicleImage) {
     alert("Please fill in all fields.");
            return;
 }
 // Create an object to store form data (can be sent to a server)
 const vehicleData = { ownerName,
contactNumber,
email,
vehicleType,
vehicleNumber,
seatingCapacity,
vehicleImage: vehicleImage.name,
};

console.log("Vehicle Registered:", vehicleData);

        // success message)

     alert("Submission was successful!We will let you know once we verify the details!");

        
form.reset();// Reset form after submission
    });});








    //seat booking section



document.addEventListener("DOMContentLoaded", function () {
        // references to form elements

const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const priceField = document.getElementById("price");
const seatSelection = document.getElementById("seat-selection");
const confirmButton = document.getElementById("confirm-booking");
const bookingMessage = document.getElementById("booking-message");
const departureTime = document.getElementById("departure-time");
const departureDate = document.getElementById("departure-date");
const bookingForm = document.getElementById("bookingForm");
    
        // Define prices for different routes
 const priceMap = {"Eldoret-Nakuru": 500, "Eldoret-Nairobi": 700,
 "Nairobi-Mombasa": 1000, "Mombasa-Garissa": 900,
"Naivasha-Mombasa": 1500, "Nakuru-Kitale": 800,
 "Mombasa-Kisumu": 1200, "Kisumu-Naivasha": 1100,
 "Nairobi-Eldoret": 1200, "Eldoret-Kitale": 1100,
 "Meru-Thika": 1000, "Eldoret-Iten": 100,
"Iten-Kabarnet": 450, "Nairobi-Nakuru": 500,
"Eldoret-Iten": 500, "Eldoret-Mombasa": 2800,
"Garissa-Kilifi": 900, "Kilifi-Mombasa": 1100,
 "Nakuru-Thika": 500, "Thika-Naivasha": 400,
"Meru-Nairobi": 1200, "Eldoret-Meru": 1500,
 "Naivasha-Nairobi": 450, "Kitale-Nairobi": 1500,
};
     
        //store seat information
let seatData = []; 
function calculatePrice() {
let routeKey = fromSelect.value + "-" + toSelect.value;
     if (priceMap[routeKey]) {
                priceField.value = "Ksh " + priceMap[routeKey];
            } else {
                priceField.value = "Select valid routes";
            } }
       
    
function fetchSeats() {
        fetch("http://localhost:3000/seats")
      .then(response => response.json())
        .then(data => {
seatData = data;
    updateSeatDropdown();
                })
 .catch(error => console.error("Error fetching seat data:", error));
        }
    
function updateSeatDropdown() {
 seatSelection.innerHTML = '<option value="" disabled selected>Select Seat</option>';
 let selectedDate = departureDate.value;
    let selectedTime = departureTime.value;
  let selectedRoute = fromSelect.value + "-" + toSelect.value;
  seatData.forEach(seat => {
let isBooked = seat.bookings?.some(booking => 
booking.date === selectedDate && 
booking.time === selectedTime && 
booking.route === selectedRoute);
if (!isBooked) {
let option = document.createElement("option");
option.value = seat.id;
option.textContent = seat.id;
seatSelection.appendChild(option);
                }
 });      }     
        
 function updateSeatDropdown() {
 seatSelection.innerHTML = '<option value="" disabled selected>Select Seat</option>';
let selectedDate = departureDate.value;
 let selectedTime = departureTime.value;
 let selectedRoute = fromSelect.value + "-" + toSelect.value;

seatData.forEach(seat => {
        let isBooked = seat.bookings?.some(booking => 
    booking.date === selectedDate &&
    booking.time === selectedTime &&
    booking.route === selectedRoute
        );
  if (!isBooked) {
     let option = document.createElement("option");
     option.value = seat.id;
    option.textContent = seat.id;
    seatSelection.appendChild(option);
        }
    });
}

    
bookingForm.addEventListener("submit", function (event) {
 event.preventDefault();
    let selectedSeat = seatSelection.value;
    let selectedTime = departureTime.value;
    let selectedDate = departureDate.value;
    let selectedRoute = fromSelect.value + "-" + toSelect.value;
         if (!selectedSeat || !selectedTime || !selectedDate) {
         bookingMessage.textContent = "Please select a seat, departure date, and departure time.";
         bookingMessage.style.color = "red";
     return;}
    if (priceField.value === "Select valid routes") {
    bookingMessage.textContent = "Error: Select valid routes before booking.";
  bookingMessage.style.color = "red";
                return;   }
            
            
  let seatToUpdate = seatData.find(seat => seat.id === selectedSeat);
if (seatToUpdate) {
 seatToUpdate.bookings = seatToUpdate.bookings || [];
    let alreadyBooked = seatToUpdate.bookings.some(booking => 
                booking.date === selectedDate && 
             booking.time === selectedTime && 
             booking.route === selectedRoute);
                
if (alreadyBooked) {
    bookingMessage.textContent = `Error: Seat ${selectedSeat} is already booked for ${selectedRoute} on ${selectedDate} at ${selectedTime}.`;
    bookingMessage.style.color = "red";
                    return;  }

             //update booked seats from db.json   
                
seatToUpdate.bookings.push({ date: selectedDate, time: selectedTime, route: selectedRoute });
fetch(`http://localhost:3000/seats/${seatToUpdate.id}`, {
      method: "PATCH",
         headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ bookings: seatToUpdate.bookings })
 })
 .then(() => {
 bookingMessage.textContent = `Seat ${selectedSeat} booked successfully for ${selectedRoute} on ${selectedDate} at ${selectedTime}!`;
bookingMessage.style.color = "green";
 fetchSeats();
 bookingForm.reset(); // Auto-refresh the form
                })
 .catch(error => console.error("Error updating seat:", error));
            }});
    fromSelect.addEventListener("change", calculatePrice);
    toSelect.addEventListener("change", calculatePrice);
 departureTime.addEventListener("change", updateSeatDropdown);
departureDate.addEventListener("change", updateSeatDropdown);
        fetchSeats();
});





    // Define prices for different routes
const priceMap = {
"Eldoret-Nakuru": 500, "Eldoret-Nairobi": 700,
 "Nairobi-Mombasa": 1000, "Mombasa-Garissa": 900,
 "Naivasha-Mombasa": 1500, "Nakuru-Kitale": 800,
 "Mombasa-Kisumu": 1200, "Kisumu-Naivasha": 1100,
 "Nairobi-Eldoret": 1200, "Eldoret-Kitale": 1100,
 "Meru-Thika": 1000, "Eldoret-Iten": 100,
"Iten-Kabarnet": 450, "Nairobi-Nakuru": 500,
"Eldoret-Mombasa": 2800, "Garissa-Kilifi": 900,
"Kilifi-Mombasa": 1100, "Nakuru-Thika": 500,
"Thika-Naivasha": 400, "Meru-Nairobi": 1200,
 "Eldoret-Meru": 1500, "Naivasha-Nairobi": 450,
    "Kitale-Nairobi": 1500
};

let seatData = []; // To store seat information




// Calculate and autofill price based on selected route
function calculatePrice() {
    let routeKey = fromSelect.value + "-" + toSelect.value;
    priceField.value = priceMap[routeKey] ? "Ksh " + priceMap[routeKey] : "Select valid routes";
}

// Fetch seat data from JSON server

function fetchSeats() {
    fetch("http://localhost:3000/seats")
.then(response => response.json())
.then(data => {
    seatData = data;
     updateSeatDropdown();
 })
 .catch(error => console.error("Error fetching seat data:", error));
}

// Update seat dropdown based on route, date, and time
function updateSeatDropdown() {
 seatSelection.innerHTML = '<option value="" disabled selected>Select Seat</option>';
 let selectedDate = departureDate.value;
  let selectedTime = departureTime.value;
 let selectedRoute = fromSelect.value + "-" + toSelect.value;

 seatData.forEach(seat => {
let isBooked = seat.bookings?.some(booking =>
booking.date === selectedDate &&
booking.time === selectedTime &&
booking.route === selectedRoute    );
       
  if (!isBooked) {
      let option = document.createElement("option");
     option.value = seat.id;
  option.textContent = seat.id;
   seatSelection.appendChild(option);
        }});}
    



//image carousel section

const images = [
 { name: "Masai Mara", url: "https://plus.unsplash.com/premium_photo-1664302700221-bd1549347986?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFhc2FpJTIwbWFyYXxlbnwwfHwwfHx8MA%3D%3D", lat: -1.4061, lon: 35.0081 },
 { name: "Amboseli National Park", url: "https://i.pinimg.com/736x/3a/03/14/3a03149f5dc2af0beabe930be5a5e5d2.jpg", lat: -2.645, lon: 37.2605 },
  { name: "Tsavo National Park", url: "https://i.pinimg.com/474x/5d/2a/c7/5d2ac7db9090dbc186d5f6d76ae644e2.jpg", lat: -3.1006, lon: 38.4853 },
  { name: "Diani Beach", url: "https://i.pinimg.com/474x/88/44/50/88445081730d2a9f9ba3d56c466e7fed.jpg", lat: -4.2803, lon: 39.5943 },
 { name: "", url: "https://i.pinimg.com/736x/2b/f0/8e/2bf08ef68daa9457e012aceb4989fcd2.jpg", lat: -0.8813, lon: 36.3754 },
{ name: "Serengeti", url: "https://i.pinimg.com/474x/0c/8d/64/0c8d64a053a6795078b613e59001208c.jpg", lat: -2.3333, lon: 34.8333 },
 { name: "Zanzibar", url: "https://i.pinimg.com/474x/fc/b8/34/fcb834aa9eea0ba84c6aeea26553abb4.jpg", lat: -6.1659, lon: 39.2026 },
{ name: "Mount Kilimanjaro", url: "https://i.pinimg.com/474x/03/87/42/038742c321f7df51780d9bf9dc094458.jpg", lat: -3.0758, lon: 37.3533 },
{ name: "Selous Game Reserve", url: "https://i.pinimg.com/474x/88/ca/23/88ca23c9d53a513c24fdb7c82c84205b.jpg", lat: -9.0004, lon: 37.417 },
{ name: "Mafia Island", url: "https://i.pinimg.com/474x/2a/70/77/2a70774dea7967fa56fc54f3d32f2a0a.jpg", lat: -7.8274, lon: 39.7304 },
{ name: "Ruaha National Park", url: "https://i.pinimg.com/474x/f8/3b/d4/f83bd4e5a8f3235abbb82dfbda353296.jpg", lat: -7.5, lon: 34.5 },
{ name: "Queen Elizabeth National Park", url: "queenelizabethpark.jpg", lat: 0.2093, lon: 30.0062 },
{ name: "Murchison Falls National Park", url: "murchison.jpg", lat: 2.2604, lon: 31.8122 },
{ name: "Rwenzori Mountain", url: "ugmountain.jpg", lat: 0.3992, lon: 29.8794 },
{ name: "Jinja Nile", url: "nile.jpg", lat: 0.439, lon: 33.2032 },
{ name: "Volcanoes National Park", url: "ngorongorocrater_.jpg", lat: -1.4839, lon: 29.5564 },
{ name: "Lake Kivu", url: "kivu.jpg", lat: -2.154, lon: 29.2772 },
{ name: "Kigali Genocide Memorial", url: "kigaligenocide.jpg", lat: -1.9441, lon: 30.0619 },
{ name: "Kruger National Park", url: "krugersa.jpg", lat: -23.9884, lon: 31.5547 },
{ name: "Cape Point", url: "capesa.jpg", lat: -33.9628, lon: 18.4098 },
{ name: "Table Mountain", url: "https://i.pinimg.com/474x/f9/81/e6/f981e6a75f3773fbbdc4d0449abec148.jpg", lat: -33.9628, lon: 18.4098 },
{ name: "Karoo & Namaqualand", url: "Namaqualand.jpg", lat: -33.9628, lon: 18.4098 },
];
const carousel = document.querySelector(".carousel");
let currentIndex = 0;

// Insert images with weather info containers
images.forEach(img => {
const item = document.createElement("div");
 item.classList.add("carousel-item");
     const imgElement = document.createElement("img");
   imgElement.src = img.url;
  imgElement.alt = img.name;
 const weatherInfo = document.createElement("div");
  weatherInfo.classList.add("weather-info");
  weatherInfo.id = `temp-${img.name.replace(/\s+/g, "-")}`; // Unique ID for each weather info
    weatherInfo.innerHTML = `<h2>${img.name}</h2><p>Loading...</p>`;
 item.appendChild(imgElement);
 item.appendChild(weatherInfo);
 carousel.appendChild(item);

    // Fetch weather for each image
fetchWeather(img, weatherInfo.id);
});

//fetch weather openmeteo fromAPI
function fetchWeather(location, elementId) {
const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`;
 fetch(url)
 .then(response => {
   if (!response.ok) {
  throw new Error("Failed to fetch weather data");
  }
 return response.json();
  })
   .then(data => {
    const tempElement = document.getElementById(elementId);
   if (tempElement) {
 tempElement.innerHTML = `<h4>${location.name}</h4>
 <p>Temperature: ${data.current_weather.temperature}°C</p>`;
 }
})
 .catch(error => {
 const tempElement = document.getElementById(elementId);
 if (tempElement) {
  tempElement.innerHTML = `
  <h2>${location.name}</h2>
  <p>Weather data not available</p> `;
 }
        });     }


// Smooth scrolling effect of carousel

function smoothScroll() {
let translateX = -(currentIndex * window.innerWidth);
 carousel.style.transform = `translateX(${translateX}px)`;
 carousel.style.transition = `transform 2s ease-in-out`; // Smooth transition
currentIndex++;
  if (currentIndex >= images.length) {
 setTimeout(() => {
     carousel.style.transition = "none"; 
     carousel.style.transform = "translateX(0)";
 currentIndex = 0;
}, 2000); }}

// Moves images every 4 seconds
setInterval(smoothScroll, 4000);


const line1Text = "Book An Adventure Both Within And Beyond the Borders.";
const line2Text = "Explore The Beauty of Your Homeland && Venture Beyond The Borders!";
const line1Element = document.getElementById("line1");
const line2Element = document.getElementById("line2");
let index = 0;

//  line 1
function typeLine1() {
    if (index < line1Text.length) {
line1Element.textContent += line1Text[index];
 index++;
 setTimeout(typeLine1, 100); // text speed
 } else {
setTimeout(typeLine2, 500); // Delay before second line appears
    }
}
//line2
function typeLine2() {
let i = 0;
 function type() {
  if (i < line2Text.length) {
 line2Element.textContent += line2Text[i];
 i++;
  setTimeout(type, 100); // line2 speed
        
  }}
    type();
}
typeLine1();




//Tours and trips booking section


document.addEventListener("DOMContentLoaded", function() {
    const packageSelect = document.getElementById("package");
    const travelersInput = document.getElementById("travelers");
    const travelCostInput = document.getElementById("travelcost");
    const tourDateInput = document.getElementById("tour-date");
  
    // Update Travel Cost when a package is selected
    packageSelect.addEventListener("change", function() {
      const selectedPackage = packageSelect.selectedOptions[0];
      let price = 0;
      let tourDate = "";
  
      if (selectedPackage) {
        price = parseInt(selectedPackage.getAttribute("data-price"));
        tourDate = selectedPackage.getAttribute("data-date");
      }
  
      // Set the tour date and initial travel cost
      tourDateInput.value = tourDate;
      travelCostInput.value = price > 0 ? price.toLocaleString() : '';
  
      // Trigger travel cost update on number of travelers change
      updateTravelCost(price);
    });
  
    // Update Travel Cost when the number of travelers changes

    travelersInput.addEventListener("input", function() {
      const selectedPackage = packageSelect.selectedOptions[0];
      let price = 0;
  
      if (selectedPackage) {
        price = parseInt(selectedPackage.getAttribute("data-price"));
      }
  
      // Call the updateTravelCost function
      updateTravelCost(price);
    });
  
    // Function to update the travel cost based on the number of travelers

    function updateTravelCost(packagePrice) {
      let numberOfTravelers = parseInt(travelersInput.value) || 0;
      let totalCost = 0;
  
      if (numberOfTravelers > 0 && packagePrice > 0) {
        totalCost = packagePrice * numberOfTravelers;
        travelCostInput.value = totalCost.toLocaleString(); 
      } else {
        travelCostInput.value = ''; // Clear the cost if invalid or no travelers
      }
    }
  });
  
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  
  // Use body-parser middleware to handle form data
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  app.post('/seats', (req, res) => {
    const { name, phone, email, package, travelcost, numberOfTravelers } = req.body;
  
    // Here, you can process the data (e.g., save it to a database or log it)
    console.log("Booking Details:", {
      name,
      phone,
      email,
      package,
      travelcost,
      numberOfTravelers,
    });
  
    // Respond with a success message
    res.json({ message: 'Tour booked successfully!' });
  });
  
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  