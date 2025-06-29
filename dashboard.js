document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  console.log(localStorage.getItem('userId'));

  if (!token || !userId) {
    alert("Please log in first.");
    window.location.href = "index.html";
    return;
  }



  fetch(BASE_URL+"api/user/details", {
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


// const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");

  const profileIcon = document.getElementById("profileIcon");
  const profileDropdown = document.getElementById("profileDropdown");

  profileIcon.addEventListener("click", () => {
    profileDropdown.style.display = profileDropdown.style.display === "block" ? "none" : "block";
  });

  // Fetch user details
  fetch(BASE_URL+"api/user/details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "userId": userId,
      "token": token
    },
    body: JSON.stringify({ userId: +userId })
  })
    .then(res => res.json())
    .then(response => {
      const user = response.data;
      document.getElementById("profileName").innerText = `${user.firstName} ${user.lastName}`;
      document.getElementById("profileEmail").innerText = user.emailId;
      document.getElementById("profileMobile").innerText = user.mobileNumber;
      document.getElementById("profileOccupation").innerText = user.occupation;
    })
    .catch(err => {
      console.error("Error fetching profile:", err);
    });

  // Optional: Handle image preview
  document.getElementById("profileUpload").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        profileIcon.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// function showLoanDetails(type) {
//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("user_id");
//   const loanDetails = document.getElementById("loanDetails");

//   if (!token || !userId) {
//     alert("Please login again.");
//     window.location.href = "index.html";
//     return;
//   }

//   fetch("http://localhost:8080/api/loan/check", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "userId": userId,
//       "token": token
//     },
//     body: JSON.stringify({
//       userId: parseInt(userId),
//       loanType: type.toUpperCase()
//     })
//   })
//     .then(res => res.json())
//     .then(resp => {
//       if (resp.exists) {
//         const loan = resp.loan;
//         loanDetails.innerHTML = `
//           <h4>${type.toUpperCase()} Loan Details</h4>
//           <p><strong>Loan Amount:</strong> ₹${loan.amount}</p>
//           <p><strong>Status:</strong> ${loan.status}</p>
//           <p><strong>Interest Rate:</strong> ${loan.interestRate}%</p>
//         `;
//       } else {
//         loanDetails.innerHTML = `
//           <h4>Apply for ${type.toUpperCase()} Loan</h4>
//           <form id="loanForm">
//             <label>Loan Amount (₹):</label><br/>
//             <input type="number" id="amount" required /><br/><br/>
//             <label>Tenure (Years):</label><br/>
//             <input type="number" id="tenure" required /><br/><br/>
//             <button type="submit">Apply</button>
//           </form>
//         `;

//         document.getElementById("loanForm").addEventListener("submit", function (e) {
//           e.preventDefault();
//           const amount = document.getElementById("amount").value;
//           const tenure = document.getElementById("tenure").value;

//           fetch("http://localhost:8080/api/loan/apply", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "userId": userId,
//               "token": token
//             },
//             body: JSON.stringify({
//               userId: parseInt(userId),
//               loanType: type.toUpperCase(),
//               amount: parseFloat(amount),
//               tenure: parseInt(tenure)
//             })
//           })
//             .then(res => res.json())
//             .then(data => {
//               loanDetails.innerHTML = `<p style="color:green;">Loan Applied Successfully!</p>`;
//             })
//             .catch(err => {
//               loanDetails.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
//             });
//         });
//       }
//     })
//     .catch(err => {
//       loanDetails.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
//     });
// }
