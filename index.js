document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".header-nav");

    if (menuToggle && navMenu) {
        // Toggle menu on click
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        // Close menu when clicking any nav link
        document.querySelectorAll(".header-nav a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });

        // Handle window resize: Ensure proper display behavior
        window.addEventListener("resize", () => {
            if (window.innerWidth > 800) {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const seats = document.querySelectorAll(".seat");
    const selectedSeatInput = document.getElementById("selected-seat");

    seats.forEach(seat => {
        seat.addEventListener("click", function() {
            // Deselect previous selection
            seats.forEach(s => s.classList.remove("selected"));
            // Mark selected seat
            this.classList.add("selected");
            // Store seat number
            selectedSeatInput.value = this.dataset.seat;
        });
    });
});
