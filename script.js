document.addEventListener("DOMContentLoaded", function () {

    // 1. Dark and Light Mode
    const themeButton = document.getElementById("theme-toggle");

    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeButton.textContent = "Light Mode";
        } else {
            themeButton.textContent = "Dark Mode";
        }
    });

         // 2. Up and Down Arrow Button
    const topButton = document.getElementById("back-to-top");

    function updateArrow() {
        const atBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 5;

        if (atBottom) {
            topButton.textContent = "↑";
            topButton.setAttribute("aria-label", "Scroll to top");
        } else {
            topButton.textContent = "↓";
            topButton.setAttribute("aria-label", "Scroll down");
        }
    }

    topButton.addEventListener("click", function () {
        const atBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 5;

        if (atBottom) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        } else {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth"
            });
        }
    });

    window.addEventListener("scroll", updateArrow);
    window.addEventListener("resize", updateArrow);
    updateArrow();

    // 3. Navigation Menu
    const menuButton = document.getElementById("menu-toggle");
    const nav = document.getElementById("main-nav");

    menuButton.addEventListener("click", function () {
        nav.classList.toggle("show-menu");

        const isOpen = nav.classList.contains("show-menu");
        menuButton.setAttribute("aria-expanded", isOpen);
    });

    // Close the menu after selecting a navigation link
    nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            nav.classList.remove("show-menu");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });

    // 4. Scroll Progress Bar
    const progressBar = document.getElementById("scroll-progress");

    window.addEventListener("scroll", function () {
        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress = pageHeight > 0
            ? (window.scrollY / pageHeight) * 100
            : 0;

        progressBar.style.width = progress + "%";
    });


    // 5. Project Filter
    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedCategory = button.dataset.filter;

            projectCards.forEach(function (card) {
                const category = card.dataset.category;

                if (
                    selectedCategory === "all" ||
                    category === selectedCategory
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
            
        });
    });

          // 6. Time-Based Greeting
    const greeting = document.getElementById("greeting");

    if (greeting) {
        const currentHour = new Date().getHours();
        let message;

        if (currentHour < 12) {
            message = "Good morning! Welcome to my portfolio.";
        } else if (currentHour < 18) {
            message = "Good afternoon! Welcome to my portfolio.";
        } else {
            message = "Good evening! Welcome to my portfolio.";
        }

        greeting.textContent = message;
    }

        // 7. Live Date and Clock
    const liveClock = document.getElementById("live-clock");

    function updateClock() {
        if (!liveClock) {
            return;
        }

        const now = new Date();

        const date = now.toLocaleDateString("en-MY", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        const time = now.toLocaleTimeString("en-MY", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });

        liveClock.textContent = date + " | " + time;
    }

    if (liveClock) {
        updateClock();
        setInterval(updateClock, 1000);
    }

     // 8. Contact Form Validation
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");

    if (contactForm && formFeedback) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("visitor-name");
            const email = document.getElementById("visitor-email");
            const message = document.getElementById("visitor-message");

            if (!name || !email || !message) {
                formFeedback.textContent =
                    "Sorry, the form could not be checked. Please try again.";
                return;
            }

            if (
                name.value.trim() === "" ||
                email.value.trim() === "" ||
                message.value.trim() === ""
            ) {
                formFeedback.textContent =
                    "Please fill in all fields.";
                return;
            }

            if (!email.validity.valid) {
                formFeedback.textContent =
                    "Please enter a valid email address.";
                return;
            }

            formFeedback.textContent =
                "Thank you, " + name.value.trim() +
                "! The form passed validation.";

            contactForm.reset();
        });
    }

    // 9. Copy Email Button
    const copyButton = document.getElementById("copy-email");
    const emailAddress = document.getElementById("email-address");
    const copyFeedback = document.getElementById("copy-feedback");

    if (copyButton && emailAddress && copyFeedback) {
        copyButton.addEventListener("click", async function () {
            const email = emailAddress.textContent.trim();

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                } else {
                    throw new Error("Clipboard unavailable");
                }

                copyFeedback.textContent = "Email copied successfully!";
            } catch (error) {
                copyFeedback.textContent =
                    "Unable to copy automatically. Please copy: " + email;
            }
        });
    }

    // 10. Show and Hide Contact Form
    const toggleFormButton = document.getElementById("toggle-form");

    if (toggleFormButton && contactForm) {
        toggleFormButton.addEventListener("click", function () {
            const isHidden = contactForm.hidden;

            contactForm.hidden = !isHidden;

            toggleFormButton.textContent = isHidden
                ? "Hide Contact Form"
                : "Show Contact Form";

            toggleFormButton.setAttribute("aria-expanded", isHidden);

            // Clear the previous message when hiding the form
            if (formFeedback && !isHidden) {
                formFeedback.textContent = "";
            }
        });
    }
});

