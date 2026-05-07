document.getElementById("formlogin").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById('username').value; 
    const password = document.getElementById('password').value;

    const loginAttempt = {
        email: email,
        password: password
    };

    console.log("Login Attempt:", loginAttempt);

    try {
        const res = await fetch("http://localhost:3500/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginAttempt)
        });

        const data = await res.json();

        if (res.ok) {
            // SUCCESS: Store data then redirect
            localStorage.setItem("user", JSON.stringify(data));
            alert("Login successful!");
            window.location.href = "workoutroutine.html"; 
        } else {
            // FAILURE: Stay here and show error
            alert(data.message || "Invalid login credentials");
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Server is not responding.");
    }
    
    
});