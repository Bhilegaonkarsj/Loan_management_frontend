document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  if (!token || !userId) {
    alert("Please log in first.");
    window.location.href = "index.html";
    return;
  }

  fetch("http://localhost:8080/api/user/details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "userId": userId,     // ✅ header 1
      "token": token        // ✅ header 2
    },
    body: JSON.stringify({
      userId: parseInt(userId)  // ✅ request body
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch user details");
      return res.json();
    })
    .then(response => {
      const user = response.data;

      document.getElementById("userName").innerText = user.user_name || user.firstName;

      const profileDiv = document.getElementById("profileInfo");
      if (profileDiv) {
        profileDiv.innerHTML = `
          <h4>Your Profile</h4>
          <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
          <p><strong>Email:</strong> ${user.emailId}</p>
          <p><strong>Occupation:</strong> ${user.occupation || 'N/A'}</p>
          <p><strong>Annual Salary:</strong> ₹${user.annualSalary || 'N/A'}</p>
        `;
      }
    })
    .catch(err => {
      console.error("Error fetching user details:", err);
      alert("Session expired or unauthorized. Please log in again.");
      localStorage.clear();
      window.location.href = "index.html";
    });
});
