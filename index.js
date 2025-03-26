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
// Reset form after submission
        // Reset form after submission
        form.reset();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".image-gallery");
    const items = document.querySelectorAll(".image-item");
    let index = 0;

    function showImage(i) {
        gallery.style.transform = `translateX(-${i * 100}%)`;
    }

    function nextImage() {
        index = (index + 1) % items.length; // Loop back to first image
        showImage(index);
    }

    function prevImage() {
        index = (index - 1 + items.length) % items.length; // Loop back to last image
        showImage(index);
    }

    document.querySelector(".next-btn").addEventListener("click", nextImage);
    document.querySelector(".prev-btn").addEventListener("click", prevImage);

    // Auto-slide every 4 seconds
    setInterval(nextImage, 4000);
});




document.addEventListener("DOMContentLoaded", function () {
    const packageSelect = document.getElementById("package");
    const tourDateInput = document.getElementById("tourDate");
    const priceInput = document.getElementById("price");

    packageSelect.addEventListener("change", function () {
        let selectedOption = packageSelect.options[packageSelect.selectedIndex];

        let tourDate = selectedOption.getAttribute("data-date");
        let price = selectedOption.getAttribute("data-price");

        if (tourDate) {
            tourDateInput.value = tourDate;
        } else {
            tourDateInput.value = "";
        }

        if (price) {
            priceInput.value = `Ksh ${price}`;
        } else {
            priceInput.value = "";
        }
    });
});
