const video = document.getElementById("promoVideo");

document.addEventListener("click", function () {
    video.muted = false;
    video.volume = 1;
    video.play();
}, { once: true });

function startNow() {
    window.location.href = "register.html";
}
