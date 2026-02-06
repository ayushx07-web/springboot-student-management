function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();


    if (!username || !password) {
        alert("Enter username and password");
        return;
    }


    fetch("http://localhost:8080/api/auth/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            password
        })

    })
        .then(res => {

            if (!res.ok) {
                throw new Error("Invalid credentials");
            }

            return res.json();

        })
        .then(data => {

            // Save token
            localStorage.setItem("token", data.token);

            // Go to dashboard
            window.location = "index.html";

        })
        .catch(err => {

            document.getElementById("error").innerText =
                "Invalid username or password";

        });

}
