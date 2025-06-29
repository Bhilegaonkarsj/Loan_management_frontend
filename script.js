document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const userId = parseInt(document.getElementById("userId").value);

  fetch(BASE_URL+"api/user/login", {
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
      localStorage.setItem("userId", userId); // store the userId you sent
      localStorage.setItem("user_name", data.user_name || "User");


      console.log(localStorage.getItem('userId'));

      window.location.href = "dashboard.html";
    })
    .catch((err) => {
      document.getElementById("error").innerText =
        "Login failed: " + err.message;
    });
});
