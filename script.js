const video = document.getElementById("promoVideo");
const playOverlay = document.getElementById("playOverlay");
const playBtn = document.getElementById("playBtn");
const liveText = document.getElementById("liveText");

playBtn.addEventListener("click", () => {
    video.play();
    playOverlay.style.display = "none";
});

function startNow(){
    window.location.href="register.html";
}

const activities=[
"🔥 Brian kutoka Nairobi ameanza sasa hivi.",
"🎉 Mary kutoka Kisumu amejiunga sasa hivi.",
"💰 Kevin kutoka Nakuru ameanza safari yake.",
"🚀 Sarah kutoka Eldoret amejiunga leo.",
"⭐ James kutoka Mombasa ameanza sasa hivi.",
"✅ Ruth kutoka Kericho ameendelea na usajili."
];

let i=0;

setInterval(()=>{
    if(!liveText) return;

    i=(i+1)%activities.length;
    liveText.textContent=activities[i];
},4000);
