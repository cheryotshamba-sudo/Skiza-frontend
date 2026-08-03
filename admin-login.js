const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://skiza-backend.onrender.com/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("adminLoggedIn", "true");
            window.location.href = "admin.html";
        } else {
            message.textContent = data.message;
        }

    } catch (error) {
        message.textContent = "Server connection failed.";
    }
});
