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

        // Handle window resize: Ensure proper display behavior
        window.addEventListener("resize", () => {
            if (window.innerWidth > 800) {
                navMenu.classList.remove("active");
                menuToggle.innerHTML = "&#9776;";
            }
        });

        // Close menu when clicking outside of the menu or hamburger button
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
        const vehicleData = {
            ownerName,
            contactNumber,
            email,
            vehicleType,
            vehicleNumber,
            seatingCapacity,
            vehicleImage: vehicleImage.name,
        };

        console.log("Vehicle Registered:", vehicleData);

        // Show success message)
        alert("Submission was successful!We will let you know once we verify the details!");

        
        form.reset();// Reset form after submission
    });
});







    //sat booking section
    document.addEventListener("DOMContentLoaded", function () {
        // Get references to form elements
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
        const priceMap = {
            "Eldoret-Nakuru": 500, "Eldoret-Nairobi": 700,
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
        
    
        let seatData = []; // To store seat information
    
        function calculatePrice() {
            let routeKey = fromSelect.value + "-" + toSelect.value;
            if (priceMap[routeKey]) {
                priceField.value = "Ksh " + priceMap[routeKey];
            } else {
                priceField.value = "Select valid routes";
            }
        }
    
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
            });
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
                return;
            }
            
            if (priceField.value === "Select valid routes") {
                bookingMessage.textContent = "Error: Select valid routes before booking.";
                bookingMessage.style.color = "red";
                return;
            }
            
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
                    return;
                }
                
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
            }
        });
    
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








// Calculate and update price based on selected route
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

