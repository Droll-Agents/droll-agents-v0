document.addEventListener("DOMContentLoaded", function () {
  console.log("Loading agent templates...");
  
  // Load navbar - using path relative to agent directory
  fetch("../../templates/shared/navbar.html")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load navbar: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      console.log("Navbar template loaded successfully");
      document.getElementById("navbar-container").innerHTML = html;
      
      // Fix navbar links to point to parent directory
      document.querySelectorAll('.nav-link, .nav-brand').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('/')) {
          link.setAttribute('href', '../../' + href);
        }
      });
      
      // Fix login button
      const loginBtn = document.querySelector('.login-button');
      if (loginBtn) {
        const loginLink = loginBtn.closest('a');
        if (loginLink) {
          loginLink.setAttribute('href', '../../login.html');
        }
      }
    })
    .catch(error => {
      console.error("Error loading navbar:", error);
    });

  // Load footer - using path relative to agent directory
  fetch("../../templates/shared/footer.html")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load footer: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      console.log("Footer template loaded successfully");
      document.getElementById("footer-container").innerHTML = html;
      
      // Fix footer links
      document.querySelectorAll('#footer-container a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) return;
        if (href && !href.startsWith('http') && !href.startsWith('/')) {
          link.setAttribute('href', '../../' + href);
        }
      });
    })
    .catch(error => {
      console.error("Error loading footer:", error);
    });
});