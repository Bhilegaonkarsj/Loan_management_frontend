document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const newUser = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      mobileNumber: document.getElementById("mobileNo").value,
      userName: document.getElementById("user_name").value,
      emailId: document.getElementById("emailId").value,
      age: parseInt(document.getElementById("age").value),
      annualSalary: parseFloat(document.getElementById("annualSalary").value),
      occupation: document.getElementById("occupation").value
    };
  
    fetch(BASE_URL+"api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => {
        if (!res.ok) throw new Error("Signup failed");
        return res.json();
      })
      .then(data => {
        const userId = data.data?.userId || data.userId;
        if (userId) {
          localStorage.setItem("newUserId", userId); // ✅ Store temporarily
          alert(`Signup successful! Your User ID is ${userId}. Please add account details.`);
          window.location.href = "add_account.html";
        } else {
          alert("Signup successful, but userId not found in response.");
        }
      })
      .catch(err => {
        document.getElementById("error").innerText = "Signup failed: " + err.message;
      });
  });
  