AOS.init();

// Adjust Content height when Toggle State is On
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".navbar-toggler");
    const infoCards = document.querySelector(".info-cards");
    let isExpanded = false;
    toggleButton.addEventListener("click", function () {
        if (!isExpanded) {
            infoCards.style.marginTop = "400px";
        } else {
            infoCards.style.marginTop = "0";
        }
        isExpanded = !isExpanded;
    });
});


// Close dropdown when clicking outside (for mobile)
document.addEventListener("click", function (event) {
    let dropdowns = document.querySelectorAll(".nav-item.dropdown");
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.querySelector(".dropdown-menu").classList.remove("show");
        }
    });
});

// Count in About_Us section
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        const speed = target / 100;
        let count = 0;

        const updateCount = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );
    counters.forEach((counter) => observer.observe(counter));
});
const counters = document.querySelectorAll(".counter");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
counters.forEach(counter => observer.observe(counter));

// Carousel Cursor Swiping
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#carouselExampleDark");
    let isDown = false, startX, scrollLeft;
    carousel.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX;
    });
    carousel.addEventListener("mouseleave", () => {
        isDown = false;
    });
    carousel.addEventListener("mouseup", () => {
        isDown = false;
    });
    carousel.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - startX;
        if (x > 100) {
            new bootstrap.Carousel(carousel).prev();
            isDown = false;
        } else if (x < -100) {
            new bootstrap.Carousel(carousel).next();
            isDown = false;
        }
    });
});

// Up Arrow
window.addEventListener("scroll", function () {
    let firstSectionHeight = document.querySelector("#banner").offsetHeight;
    let upArrow = document.querySelector(".up-arrow");
    if (window.scrollY > firstSectionHeight-300) {
        upArrow.style.display = "flex";
    } else {
        upArrow.style.display = "none";
    }
});

// Form Interaction - Mail & Whatsapp
const scriptURL = "https://script.google.com/macros/s/AKfycbzXYnC0D5Rul3jlZfVdu5Ou3qB7oCz7I7dLFTLpalqrWFyOiVeMh91V-rfVFxT--UtqdA/exec";
const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    var formData = new FormData(form);

    fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => {
            if (response.ok) {
                showAlert("Appreciate Your Interest.. We Will Contact You Soon!", true);
                form.reset();
            } else {
                showAlert("Error submitting form. Please try again.", false);
            }
        })
        .catch(() => showAlert("Something went wrong. Please try again!", false));
});
function showAlert(message, success) {
    const alertBox = document.getElementById("custom-alert");
    const alertMessage = document.getElementById("alert-message");

    alertMessage.textContent = message;
    alertMessage.style.color = success ? "green" : "red";
    alertBox.style.display = "flex";
}
function closeAlert() {
    document.getElementById("custom-alert").style.display = "none";
}