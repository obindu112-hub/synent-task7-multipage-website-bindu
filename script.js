// LearnPath - Contact Form Validation

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value.trim();
        const formMessage = document.getElementById("form-message");

        if (!name || !email || !subject || !message) {
            formMessage.textContent = "Please fill in all fields.";
            formMessage.style.color = "#d93025";
            return;
        }

        formMessage.textContent =
            "Thank you, " + name + "! Your form was submitted successfully.";
        formMessage.style.color = "#087f5b";

        contactForm.reset();
    });
}