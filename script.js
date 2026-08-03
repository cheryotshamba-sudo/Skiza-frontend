const video = document.getElementById("promoVideo");

// Start muted automatically
video.muted = true;

video.play().catch(err => {
    console.log(err);
});

// First tap anywhere turns on sound
document.addEventListener("click", () => {
    video.muted = false;
    video.volume = 1;
}, { once: true });

function startNow() {
    window.location.href = "register.html";
}
