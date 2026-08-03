const video = document.getElementById("promoVideo");
const playOverlay = document.getElementById("playOverlay");
const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", function () {
    video.muted = false;
    video.volume = 1;
    video.play();

    playOverlay.style.display = "none";
});

function startNow() {
    window.location.href = "register.html";
}
