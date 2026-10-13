const serviceSelect = document.getElementById("service");
const remarksBox = document.getElementById("remarksBox");
const remarks = document.getElementById("remarks");

// Get service from URL
const params = new URLSearchParams(window.location.search);
const selectedService = params.get("service");

// Automatically select service if coming from Our Services
if (selectedService) {
    serviceSelect.value = selectedService;
}

// Show Remarks only when "Other" is selected
serviceSelect.addEventListener("change", function () {

    if (serviceSelect.value === "Other") {

        remarksBox.style.display = "block";
        remarks.required = true;

    } else {

        remarksBox.style.display = "none";
        remarks.required = false;
        remarks.value = "";

    }

});


// Booking form
document.getElementById("bookingForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = serviceSelect.value;
    const address = document.getElementById("address").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Check service
    if (!service) {
        alert("Please select a service.");
        return;
    }

    // Other service
    let finalService = service;

    if (service === "Other") {

        const otherService = remarks.value.trim();

        if (!otherService) {
            alert("Please write the service you want in Remarks.");
            remarks.focus();
            return;
        }

        finalService = "Other - " + otherService;
    }

    // Create WhatsApp message
    const message =
        "✂️ New Home Salon Booking\n\n" +
        "👤 Name: " + name + "\n" +
        "📞 Phone: " + phone + "\n" +
        "💇 Service: " + finalService + "\n" +
        "📍 Address: " + address + "\n" +
        "📅 Date: " + date + "\n" +
        "⏰ Time: " + time;

    // WhatsApp
    const whatsappURL =
        "https://wa.me/9779815418960?text=" +
        encodeURIComponent(message);

    // Open WhatsApp
    window.location.href = whatsappURL;

});