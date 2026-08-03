// Redirect to login if not logged in
if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}


// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("adminLoggedIn");

    window.location.href = "admin-login.html";

});



// Load total uploads
async function loadStats() {

    try {

        const response = await fetch(
            "https://skiza-backend.onrender.com/stats"
        );

        const data = await response.json();

        document.getElementById("totalUploads").textContent =
        data.totalUploads;


    } catch (error) {

        document.getElementById("totalUploads").textContent =
        "Error";

    }

}



// Load today and this week uploads
async function loadDetailedStats() {

    try {

        const response = await fetch(
            "https://skiza-backend.onrender.com/stats-details"
        );

        const data = await response.json();


        document.getElementById("todayUploads").textContent =
        data.todayUploads;


        document.getElementById("weekUploads").textContent =
        data.weekUploads;


    } catch(error) {


        document.getElementById("todayUploads").textContent = "0";

        document.getElementById("weekUploads").textContent = "0";


    }

}




// Load uploaded screenshots
async function loadUploads() {

    try {

        const response = await fetch(
            "https://skiza-backend.onrender.com/uploads"
        );

        const uploads = await response.json();

        const gallery = document.getElementById("gallery");


        if (!uploads.length) {

            gallery.innerHTML = `
            <div class="empty-box">
                📂 No screenshots uploaded yet.
            </div>
            `;

            return;

        }



        gallery.innerHTML = uploads.map(upload => `

        <div class="card">

            <img src="${upload.imageUrl}" alt="Screenshot">


            <div class="card-info">

                <p>
                📅 ${new Date(upload.uploadedAt).toLocaleString()}
                </p>


                <button class="view-btn"
                onclick="window.open('${upload.imageUrl}','_blank')">
                View
                </button>


            </div>


        </div>


        `).join("");


    } catch(error) {

        document.getElementById("gallery").innerHTML =
        "<p>Failed to load screenshots.</p>";

    }

}




// Start dashboard

loadStats();

loadDetailedStats();

loadUploads();
