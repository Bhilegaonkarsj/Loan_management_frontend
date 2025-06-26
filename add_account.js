document.getElementById("addAccountForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const userId = localStorage.getItem("newUserId"); // ✅ Retrieve stored userId
    if (!userId) {
      alert("User ID not found. Please sign up again.");
      window.location.href = "signup.html";
      return;
    }
  
    const payload = {
      userId: parseInt(userId),
      accountNumber: document.getElementById("accountNumber").value,
      accountBalance: parseFloat(document.getElementById("initialBalance").value),
      currency: document.getElementById("currency").value,
      bankId: parseInt(document.getElementById("bankId").value)
    };
  
    fetch("http://localhost:8080/api/user/add/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Response from server:", data);  // 👈 debug

        if (data.data === "User Accounts Created") {
          alert("Account created successfully!");
          localStorage.removeItem("newUserId"); // ✅ Clean up
          window.location.href = "index.html";
        } else {
          document.getElementById("error").innerText = data.message;
        }
      })
      .catch(err => {
        document.getElementById("error").innerText = "Account creation failed: " + err.message;
      });
  });
  