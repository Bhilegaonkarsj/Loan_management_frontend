document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const userId = parseInt(document.getElementById("userId").value);
  
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Login failed");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        window.location.href = "profile.html";
      })
      .catch((err) => {
        document.getElementById("error").innerText =
          "Login failed: " + err.message;
      });
  });
  