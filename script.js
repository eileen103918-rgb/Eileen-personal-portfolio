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

     // 2. Back-to-Top Button
        const topButton = document.getElementById("back-to-top");

        topButton.addEventListener("click", function () {
                window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });
