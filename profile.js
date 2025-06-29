const profileIcon = document.getElementById("profileIcon");
const profileDropdown = document.getElementById("profileDropdown");
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

profileIcon.addEventListener("click", () => {
  const isVisible = profileDropdown.style.display === "block";

  if (!isVisible) {
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
      profileDropdown.style.display = "block";
    })
    .catch(err => {
      console.error("Error fetching profile:", err);
      alert("Session expired.");
      localStorage.clear();
      window.location.href = "index.html";
    });
  } else {
    profileDropdown.style.display = "none";
  }
});

// Preview image upload
document.getElementById("profileUpload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      profileIcon.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});
