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
// Dial Now button - maximum 3 clicks
let dialClicks = 0;

const dialBtn = document.getElementById("dialBtn");

if(dialBtn){

    dialBtn.addEventListener("click", () => {

        if(dialClicks < 3){

            dialClicks++;

            window.location.href = "tel:*123#"; // replace with your dial code

        } else {

            alert("Dial step completed. Continue to the next step.");

            dialBtn.disabled = true;
            dialBtn.innerText = "Dial Completed";

        }

    });

}
