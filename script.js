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
    });
            
        });
    });

});
