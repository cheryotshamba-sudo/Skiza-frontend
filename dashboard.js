// Protect dashboard
if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    if (confirm("Logout from dashboard?")) {
        localStorage.removeItem("adminLoggedIn");
        window.location.href = "admin-login.html";
    }
});

// Refresh
document.getElementById("refreshBtn").addEventListener("click", loadDashboard);

async function loadDashboard() {

    // Statistics
    try {
        const stats = await fetch("https://skiza-backend.onrender.com/stats")
            .then(r => r.json());

        document.getElementById("totalUploads").textContent = stats.totalUploads;
        document.getElementById("todayUploads").textContent = stats.todayUploads || 0;
        document.getElementById("weekUploads").textContent = stats.totalUploads;

    } catch (err) {
        console.error(err);
    }

    // Uploads
    try {

        const uploads = await fetch("https://skiza-backend.onrender.com/uploads")
            .then(r => r.json());

        const gallery = document.getElementById("gallery");

        if (!uploads.length) {
            gallery.innerHTML = "<h3>No screenshots uploaded.</h3>";
            return;
        }

        gallery.innerHTML = "";

        uploads.forEach(upload => {

            const card = document.createElement("div");
            card.className = "upload-card";

            card.innerHTML = `
                <img src="${upload.imageUrl}" alt="Screenshot">

                <div class="upload-info">

                    <strong>${upload.filename}</strong>

                    <p>${new Date(upload.uploadedAt).toLocaleString()}</p>

                    <div class="actions">

                        <button class="view">👁 View</button>

                        <button class="download">⬇ Download</button>

                        <button class="delete">🗑 Delete</button>

                    </div>

                </div>
            `;

            // View
            card.querySelector(".view").onclick = () => {
                window.open(upload.imageUrl, "_blank");
            };

            // Download
            card.querySelector(".download").onclick = () => {
                const a = document.createElement("a");
                a.href = upload.imageUrl;
                a.download = upload.filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
            };

            // Delete
            card.querySelector(".delete").onclick = async () => {

                if (!confirm(`Delete ${upload.filename}?`)) return;

                try {

                    const res = await fetch(
                        `https://skiza-backend.onrender.com/uploads/${upload.id}`,
                        {
                            method: "DELETE"
                        }
                    );

                    if (res.ok) {
                        card.remove();
                        loadDashboard();
                    } else {
                        alert("Delete failed.");
                    }

                } catch (err) {
                    alert("Server error.");
                    console.error(err);
                }

            };

            gallery.appendChild(card);

        });

    } catch (err) {
        console.error(err);
    }
}

loadDashboard();
