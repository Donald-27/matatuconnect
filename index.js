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
