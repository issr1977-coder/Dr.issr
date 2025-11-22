async function loadContent() {
  let content = JSON.parse(localStorage.getItem("issr_site")) ||
                await (await fetch("content.json")).json();

  document.getElementById("name").textContent = content.name;
  document.getElementById("footerName").textContent = content.name;
  document.getElementById("title").textContent = content.title;
  document.getElementById("bio").textContent = content.bio;
  document.getElementById("location").textContent = content.location;

  document.getElementById("email").textContent = content.email;
  document.getElementById("email").href = `mailto:${content.email}`;

  document.getElementById("website").textContent = content.website;
  document.getElementById("website").href = content.website;
  
  document.getElementById("resume").href = content.resume;

  document.getElementById("profileImage").src = content.profileImage;

  document.getElementById("skills").innerHTML =
    content.skills.map(s => `<li>${s}</li>`).join("");

  document.getElementById("publications").innerHTML =
    content.publications.map(p => `<li>${p}</li>`).join("");

  document.getElementById("year").textContent = new Date().getFullYear();
}

// Dark Mode
document.getElementById("toggleTheme").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
};

if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark");
}

// Admin Edit
document.getElementById("editBtn").onclick = () => {
  let pwd = prompt("Enter admin password:");
  if (pwd === "admin") {
    let current = JSON.parse(localStorage.getItem("issr_site")) || {};
    let updated = prompt("Edit JSON:", JSON.stringify(current, null, 2));
    if (updated) {
      localStorage.setItem("issr_site", updated);
      alert("Updated! Refresh page.");
    }
  } else alert("Incorrect Password");
};

loadContent();
