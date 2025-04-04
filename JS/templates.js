document.addEventListener("DOMContentLoaded", function () {
  console.log("Loading templates...");
  
  // Load navbar
  fetch("templates/shared/navbar.html")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load navbar: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      console.log("Navbar template loaded successfully");
      document.getElementById("navbar-container").innerHTML = html;
    })
    .catch(error => {
      console.error("Error loading navbar:", error);
    });

  // Load footer
  fetch("templates/shared/footer.html")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load footer: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      console.log("Footer template loaded successfully");
      document.getElementById("footer-container").innerHTML = html;
    })
    .catch(error => {
      console.error("Error loading footer:", error);
    });
});