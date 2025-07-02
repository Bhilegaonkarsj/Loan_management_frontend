function loadAccounts() {

  const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
  if (!userId) {
    document.getElementById("accountsList").innerHTML = "<p>Please sign up to view accounts.</p>";
    return;
  }


  fetch(BASE_URL+"api/user/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "userId": userId,
      "token": token
    
    },
    body: JSON.stringify({ userId: parseInt(userId) })
  })
    .then(res => res.json())
    .then(data => {
      const accountsList = document.getElementById("accountsList");
      accountsList.innerHTML = "";

      const accountNumbers = data.data?.accountsList;

      if (accountNumbers && accountNumbers.length > 0) {
        accountNumbers.forEach(acc => {
          const div = document.createElement("div");
          div.className = "account-item";
          div.innerHTML = `
            <p><strong>Account Number:</strong> ${acc}</p>
            <hr />
          `;
          accountsList.appendChild(div);
        });
      } else {
        accountsList.innerHTML = "<p>No accounts found for this user.</p>";
      }
    })
    .catch(err => {
      document.getElementById("accountsList").innerText = "Failed to load accounts: " + err.message;
    });
}


// 2. Add Account Form Submit
document.getElementById("addAccountForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const userId = localStorage.getItem("newUserId");
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

  fetch(+BASE_URL+"api/user/add/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "userId": userId,
      "token": token
    
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      if (data.data === "User Accounts Created") {
        alert("Account created successfully!");
        document.getElementById("addAccountForm").reset();
        document.getElementById("accountForm").style.display = "none";
        loadAccounts(); // 🔁 Refresh accounts
      } else {
        document.getElementById("error").innerText = data.message || "Unexpected error.";
      }
    })
    .catch(err => {
      document.getElementById("error").innerText = "Account creation failed: " + err.message;
    });
});

// 3. On window load
window.onload = function () {
  loadAccounts();

  document.getElementById("showFormBtn").addEventListener("click", function () {
    const form = document.getElementById("accountForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
  });
};
