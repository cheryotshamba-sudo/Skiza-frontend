alert("Dashboard JS is working");// Protect dashboard
if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "admin-login.html";
});

// Refresh button
document.getElementById("refreshBtn").addEventListener("click", () => {
    loadDashboard();
});

// Load dashboard
async function loadDashboard() {

    // Load statistics
    try {

        const statsResponse = await fetch("https://skiza-backend.onrender.com/stats");
        const stats = await statsResponse.json();

        document.getElementById("totalUploads").textContent = stats.totalUploads;

        // Temporary values until we build analytics
        document.getElementById("todayUploads").textContent = stats.totalUploads;
        document.getElementById("weekUploads").textContent = stats.totalUploads;

    } catch (error) {
        console.log(error);
    }

    // Load uploads
    try {

        const uploadsResponse = await fetch("https://skiza-backend.onrender.com/uploads");
        const uploads = await uploadsResponse.json();

        const gallery = document.getElementById("gallery");

        if (uploads.length === 0) {
            gallery.innerHTML = `
                <h3 style="text-align:center;color:gray;">
                    No screenshots uploaded yet.
                </h3>
            `;
            return;
        }

        gallery.innerHTML = "";

        uploads.forEach(upload => {

            gallery.innerHTML += `
                <div class="upload-card">

                    <img src="${upload.imageUrl}" alt="Screenshot">

                    <div class="upload-info">

                        <strong>${upload.filename}</strong>

                        <p>
                        ${new Date(upload.uploadedAt).toLocaleString()}
                        </p>

                        <div class="actions">

                            <button class="view"
                            onclick="window.open('${upload.imageUrl}')">
                            View
                            </button>

                            <button class="download"
                            onclick="window.open('${upload.imageUrl}')">
                            Download
                            </button>

                            <button class="delete">
                            Delete
                            </button>

                        </div>

                    </div>

                </div>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

loadDashboard();
